const Application = require('../models/applications');
const Users = require('../models/users');
const Address = require('../models/address');
const Asset = require('../models/assets');
const Income = require('../models/incomes');
const Professionals = require('../models/professionals');
const Properties = require('../models/properties');
const Client = require('../models/clients');
const User = require('../models/users');

const status = {
    simulation: "SIMULATION",
	open: "OPEN",
	approved: "APPROVED",
	rejected: "REJECTED"
}

async function add(req, res){
    try{
        let clientObj = await getClient(req.body.clientInfo);
        let client = await clientObj.save();

        let totalMortgage = calculateMortgage(req.body.assets, req.body.incomes);
        let downPaymentValue = totalMortgage * 0.1;

        let application = new Application ({
            client: null,
            lastModified: new Date().toISOString().split('T')[0],
            status: status.simulation,
            totalValue: totalMortgage,
            downPaymentValue: downPaymentValue,
            address: null,
            assets: [],
            incomes: [],
            properties: [],
            professionals: []
        });

        application.client = client._id;

        let mortgageAddress = await getAddress(req.body.address).save();
        application.address = mortgageAddress._id;

        for(const asset of req.body.assets){
            let as = await getAsset(asset).save();
            application.assets.push(as._id);
        }

        for(const incomes of req.body.incomes){
            let incomeObj = await getIncome(incomes);
            let inc = await incomeObj.save();
            application.incomes.push(inc._id);
        }

        for(const property of req.body.properties){
            let propertyObj = await getProperty(property);
            let prop = await propertyObj.save();
            application.properties.push(prop._id);
        }

        for(const professional of req.body.professionals){
            let prof = await getProfessional(professional).save();
            application.professionals.push(prof._id);
        }

        application.notifyBroker = "False";
        application.notifyClient = "False";
        
        application.save().then(result => {
            let response = {
                applicationId: result._id,
                housePhoto: decideHousePhoto(result.totalValue),
                totalValue: result.totalValue
            }
            return res.status(201).json(response)
        }).catch(err => {
            return res.status(400).json(err)
        })

    }catch(err){
        res.status(400).json(err);
    }
}

async function getById(req, res){
    try{
        let application = await Application
                                .find({ _id: req.params.applicationId.toString().trim() })
                                .populate({
                                    path:     "client",			
                                    populate: ([{ path:  "currentAddress",
                                                model: "Address" },
                                                { path:  "passedAddresses",
                                                  model: "Address" }])
                                })
                                .populate("broker")
                                .populate("address")
                                .populate("assets")
                                .populate({
                                    path:     "incomes",			
                                    populate: { path:  "businessAddress",
                                                model: "Address" }
                                  })
                                .populate({
                                    path:     "properties",			
                                    populate: { path:  "address",
                                                model: "Address" }
                                })
                                .populate("professionals");

        if(!application){
            return res.status(404).json({message: "No applications found."});
        }

        return res.status(200).json({application})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function getByClientId(req, res){
    try{
        let clients = await Client.find({userId: req.params.userId.toString().trim()}).select("_id");

        let applications = await Application.find({client: { $in : clients }})
                                .populate("client")
                                .populate("broker")
                                .populate("address")
                                .populate("assets")
                                .populate("incomes")
                                .populate("properties")
                                .populate("professionals")
                                .sort({lastModified: 'desc'})

        if(!applications){
            return res.status(404).json({message: "No applications found."});
        }

        return res.status(200).json({applications})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function getByBrokerId(req, res){
    try{
        let applications = await Application.find({broker: req.params.userId.toString().trim()})
                                .populate("client")
                                .populate("broker")            
                                .populate("address")
                                .populate("assets")
                                .populate("incomes")
                                .populate("properties")
                                .populate("professionals")
                                .sort({lastModified: 'desc'})

        if(!applications){
            return res.status(404).json({message: "No applications found."});
        }

        return res.status(200).json({applications})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function getNotification(req, res){
    try{
        let user = await User.findOne({_id: req.params.userId.toString().trim()});
        let applications = [];
        
        if(!user){
            return res.status(404).json("User not found!");
        }
        
        if(!user.type){
            return res.status(404).json("User has not defined type.");
        }
        
        if(user.type == "Client"){
            let clients = await Client.find({userId: req.params.userId.toString().trim()});
            
            if(!clients){
                return res.status(404).json("Client not found.");
            }

            //applications = await Application.find({ notifyClient: "True" });
            
            applications = await Application.find({
                $and: [
                    { client: { $in: clients } },
                    { notifyClient: "True" }
                ]
            });

            for(const application of applications){
                if(application?.status == status.approved){
                    let notification = {
                        applicationId: application._id,
                        broker: application.broker,
                        status: application.status,
                        totalValue: application.totalValue,
                        message: "Your application has been approved! Congratulations! Click here to check."
                    }
                    return res.status(200).json({notification})
                }else if(application?.status == status.rejected){
                    let notification = {
                        applicationId: application._id,
                        broker: application.broker,
                        status: application.status,
                        totalValue: application.totalValue,
                        message: "You have an application that requires attention. Click here to check."
                    }
                    return res.status(200).json({notification})
                }
            }
        } else {
            applications = await Application.find({
                $and: [
                    {broker: user._id},
                    {notifyBroker: "True" }
                ]});

            for(const application of applications){
                if(application){
                    let notification = {
                        applicationId: application._id,
                        broker: application.broker,
                        status: application.status,
                        totalValue: application.totalValue,
                        message: "You have a new application to review. Click here to check."
                    }
                    return res.status(200).json({notification})
                }
            }
        }
        return res.status(404).json("Notification not found.");
    }catch(err){
        res.status(400).json({error: err});
    }
}

async function edit(req, res){
    try{
        let application = await Application.findOne({_id: req.params.applicationId.toString().trim()})
        
        if(!application){
            return res.status(404).json({message: "Application not found."});
        }
        
        if(req.body.status){
            const existingStatus = Object.keys(status).filter((key) => status[key] === req.body.status);
            if(existingStatus.length <= 0){
                return res.status(404).json({message: "Invalid Status."});
            }
            application.status = req.body.status;
            application.notifyClient = "True";
            application.notifyBroker = "False";
        }

        if(req.body.totalValue){
            application.totalValue = req.body.totalValue;
        }

        if(req.body.broker){
            let broker = await Users.findOne({$and:[{_id: req.body.broker.toString().trim()}, {type: "Broker"}]})
            if (!broker){
                return res.status(400).json({error: "Broker doesn't exist."})
            }
            application.broker = broker._id
            application.status = "OPEN";
            application.notifyClient = "False";
            application.notifyBroker = "True";
        }

        if(req.body.notifyBroker){
            application.notifyBroker = req.body.notifyBroker;
        }

        if(req.body.notifyClient){
            application.notifyClient = req.body.notifyClient;
        }

        application.lastModified = new Date().toISOString().split('T')[0];

        application.save().then(result => {
            return res.status(200).json(result)
        }).catch(err => {
            return res.status(400).json(err)
        });

    }catch(err){
        res.status(400).json({error: err});
    }
}

function calculateMortgage(assets, incomes) {
    const totalAssets = assets.reduce((acc, asset) => acc + parseFloat(asset.value), 0);
    const totalIncomes = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);

    const otherDebts = 500; // in dollars per month
    const propertyTaxes = 300; // in dollars per month
    const heatingCosts = 150; // in dollars per month
    const mortgageInterestRate = 0.03; // 3%
    const mortgageAmortizationPeriod = 25; // in years
  
    // Calculate the maximum monthly payment based on the borrower's income and debt obligations
    const grossIncome = totalIncomes / 12; // convert yearly income to monthly income
    const gdsRatioLimit = 0.32;
    const tdsRatioLimit = 0.40;
    const gdsMaxPayment = grossIncome * gdsRatioLimit;
    const tdsMaxPayment = grossIncome * tdsRatioLimit - otherDebts;
    const maxPayment = Math.min(gdsMaxPayment, tdsMaxPayment) - propertyTaxes - heatingCosts;
  
    // Calculate the maximum mortgage amount based on the monthly payment and interest rate
    const monthlyInterestRate = mortgageInterestRate / 12;
    const mortgageTermInMonths = mortgageAmortizationPeriod * 12;
    const mortgageAmount = (maxPayment / monthlyInterestRate) * (1 - Math.pow(1 + monthlyInterestRate, -mortgageTermInMonths));
  
    return Math.round(mortgageAmount + totalAssets);
}

function decideHousePhoto(maxMortgage) {
    if (maxMortgage <= 300000){
        return "House1"
    } else if (maxMortgage <= 500000){
        return "House2"
    } else if (maxMortgage <= 700000){
        return "House3"
    } else if (maxMortgage <= 900000){
        return "House4"
    } else {
        return "House5"
    }
}

function getAddress(addressObj){
    return new Address({
          streetNumber: addressObj.streetNumber,
          streetName: addressObj.streetName,
          unit: addressObj.unit,
          city: addressObj.city,
          province: addressObj.province,
          country: addressObj.country,
          postalCode: addressObj.postalCode,
          rentValue: addressObj.rentValue,
          moveInDate: addressObj.moveInDate
    });
}

function getAsset(assetObj){
    return new Asset({
        type: assetObj.type,
        description: assetObj.description,
        value: assetObj.value,
        includedInDownPayment: assetObj.includedInDownPayment
    });
}

async function getIncome(incomeObj){
    let address = await getAddress(incomeObj.businessAddress).save();

    return new Income({
        type: incomeObj.type,
        description: incomeObj.description,
        businessType: incomeObj.businessType,
        businessName: incomeObj.businessName,
        businessAddress: address._id,
        jobTitle: incomeObj.jobTitle,
        employmentType: incomeObj.employmentType,
        paymentType: incomeObj.paymentType,
        amount: incomeObj.amount,
        startDate: incomeObj.startDate
    });
}

async function getProperty(propertyObj){
    let address = await getAddress(propertyObj.address).save();

    return new Properties({
        address: address._id,
        value: propertyObj.value,
        annualPropertyTaxes: propertyObj.annualPropertyTaxes,
        condoFees: propertyObj.condoFees,
        monthlyPayment: propertyObj.monthlyPayment
    });
}

function getProfessional(professionalObj){
    return new Professionals ({
        type: professionalObj.type,
        fullName: professionalObj.fullName,
        email: professionalObj.email,
        workNumber: professionalObj.workNumber,
        cost: professionalObj.cost
    });
}

async function getClient(request){
    let user = await Users.findOne({$and:[{_id: request.userId.toString().trim()}, {type: "Client"}]})
    
    if (!user){
        return "Client doesn't exist."
    }

    let address = await getAddress(request.currentAddress).save();

    let client = new Client({
        userId: request.userId,
        firstTimeBuyer: request.firstTimeBuyer,
        maritalStatus: request.maritalStatus,
        numberOfDependents: request.numberOfDependents,
        currentAddress: address._id,
        passedAddresses: []
    });
    
    for(const address of request.passedAddresses){
        let ad = await getAddress(address).save();
        client.passedAddresses.push(ad._id);
    }

    return client;
}
  
exports.add = add;
exports.getById = getById;
exports.getByBrokerId = getByBrokerId;
exports.getByClientId = getByClientId;
exports.edit = edit; 
exports.getNotification = getNotification;