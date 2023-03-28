const Application = require('../models/applications');
const Users = require('../models/users');
const Address = require('../models/address');
const Asset = require('../models/assets');
const Income = require('../models/incomes');
const Professionals = require('../models/professionals');
const Properties = require('../models/properties');
const Client = require('../models/clients');

const status = {
    simulation: "SIMULATION",
	open: "OPEN",
	approved: "APPROVED",
	rejected: "REJECTED"
}

async function add(req, res){
    try{
        saveClient(req.body.clientInfo);

        let totalMortgage = calculateMortgage(req.body.assets, req.body.incomes);
        let downPaymentValue = totalMortgage * 0.1;

        let application = new Application ({
            clientId: req.body.clientId,
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

        console.log("Tst");

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
        
        application.save().then(result => {
            let response = {
                applicationId: result._id,
                housePhoto: decideHousePhoto(result.totalValue),
                totalValue: result.totalValue
            }
            console.log("tests")
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
                                .populate("address")
                                .populate("assets")
                                .populate("incomes")
                                .populate("properties")
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
        let applications = await Application.find({clientId: req.params.clientId.toString().trim()})
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
        let applications = await Application.find({brokerId: req.params.brokerId.toString().trim()})
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

async function updateVisualized(req, res){
    try{
        let user = await Users.findOne({_id: req.body.userId.toString().trim()})
        
        if(user && req.body.applicationId){ 
            if(req.body.visualized == "Yes"){
                let applicationVisualized = await Application.updateOne(
                    {_id: req.body.applicationId.toString().trim()}, 
                    {$push: { visualizedBy: req.body.userId } }
                    );
                    return res.status(200).json(applicationVisualized);
            }else{
                let applicationNotVisualized = await Application.updateOne(
                    {_id: req.body.applicationId.toString().trim()}, 
                    {$pullAll: { visualizedBy: [req.body.userId] } }
                );
                return res.status(200).json(applicationNotVisualized);
            }
        }

        return res.status(200).json("nothing updated");

    }catch(err){
        res.status(400).json({error: err});
    }
}

async function markAllAsVisualizedByUserId(req, res){
    try{
        let user = await Users.findOne({_id: req.params.userId.toString().trim()})

        if(user){ 
            if(user.type == "Broker"){
                let brokerApplications = await Application.updateMany({
                    $and: [
                        {brokerId: req.params.userId.toString().trim()},
                        {visualizedBy: { $ne: req.params.userId.toString().trim() } }
                    ]}, 
                    {$push: { visualizedBy: req.params.userId } }
                );
        
                return res.status(200).json(brokerApplications)
            }else{
                let clientApplications = await Application.updateMany({
                    $and: [
                        {clientId: req.params.userId.toString().trim()},
                        {visualizedBy: { $ne: req.params.userId.toString().trim() } }
                    ]},
                    { $push: { visualizedBy: req.params.userId } }
                );
        
                return res.status(200).json(clientApplications)
            }
        }

        return res.status(200).json(application)

    }catch(err){
        res.status(400).json({error: err});
    }
}

async function getAllNotVisualizedByUserType(req, res){
    try{
        let applications = await Application.find({
            $and: [
                {$or: [
                    {clientId: req.params.userId.toString().trim()}, 
                    {brokerId: req.params.userId.toString().trim()}]
                }, 
                { visualizedBy: { $ne: req.params.userId.toString().trim() } }
            ]});
        return res.status(200).json({applications})

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
        }

        if(req.body.totalValue){
            application.totalValue = req.body.totalValue;
        }

        if(req.body.brokerId){
            //let broker = await Users.findOne({_id: req.body.brokerId.toString().trim()})
            let broker = await Users.findOne({$and:[{_id: req.body.brokerId.toString().trim()}, {type: "Broker"}]})
            if (!broker){
                return res.status(400).json({error: "Broker doesn't exist."})
            }
            application.brokerId = req.body.brokerId
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

async function saveClient(request){
    let user = await Users.findOne({$and:[{_id: request.userId.toString().trim()}, {type: "Client"}]})

    if (!user){
        return "Client doesn't exist."
    }

    let address = await getAddress(request.currentAddress).save();

    let client = new Client({
        userId: user,
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

    client.save().then(result => {
        return result
    }).catch(err => {
        console.log("Error saving client! -> ", err)
        return null
    });
}
  
exports.add = add;
exports.getById = getById;
exports.getByBrokerId = getByBrokerId;
exports.getByClientId = getByClientId;
exports.edit = edit; 
exports.markAllAsVisualizedByUserId = markAllAsVisualizedByUserId;
exports.getAllNotVisualizedByUserType = getAllNotVisualizedByUserType;
exports.updateVisualized = updateVisualized;