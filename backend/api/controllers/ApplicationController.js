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

//DTI Ratio is the maximum % that the client can comprise in mortgage from their incomes
// Usually dtiRatio is around 30%
const dtiRatio = 0.3
// We will calculate monthly mortgage payment assuming a 30-year loan at 4% interest
const interestPerYear = 0.04
const mortgageDurationInYears = 30

async function add(req, res){
    try{
        saveClient(req.body.clientInfo);

        let application = new Application ({
            clientId: req.body.clientId,
            lastModified: new Date().toISOString().split('T')[0],
            status: status.simulation,
            totalValue: calculateMaxMortgage(req.body.assets, req.body.incomes, req.body.downPaymentValue),
            address: getAddress(req.body.address),
            assets: [],
            incomes: [],
            properties: [],
            professionals: []
        });

        req.body.assets.forEach(asset => {
            application.assets.push(getAsset(asset));
        });

        req.body.incomes.forEach(income => {
            application.incomes.push(getIncome(income));
        });

        req.body.properties.forEach(property => {
            application.properties.push(getProperty(property));
        });

        req.body.professionals.forEach(professional => {
            application.professionals.push(getProfessional(professional));
        });
        
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
                                .populate("address");

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
        let applications = await Application.find({clientId: req.params.clientId.toString().trim()}).sort({lastModified: 'desc'})

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
        let applications = await Application.find({brokerId: req.params.brokerId.toString().trim()}).sort({lastModified: 'desc'})

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

function calculateMaxMortgage(assets, incomes, downPayment) {
    // Calculate the total assets and incomes
    const totalAssets = assets.reduce((acc, asset) => acc + parseFloat(asset.value), 0);
    const totalIncomes = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    
    // Calculate the maximum loan amount based on debt-to-income ratio
    const monthlyDebtPayments = totalAssets * 0.01 + downPayment * (interestPerYear / 1200) / (1 - Math.pow(1 + interestPerYear / 1200, -mortgageDurationInYears * 12));
    const monthlyIncome = totalIncomes / 12;
    const maxMonthlyDebtPayments = monthlyIncome * dtiRatio;
    const maxLoanAmount = (maxMonthlyDebtPayments - totalAssets * 0.01) / (interestPerYear / 1200 / (1 - Math.pow(1 + interestPerYear / 1200, -mortgageDurationInYears * 12)));
  
    // Return the maximum mortgage value
    const maxMortgage = maxLoanAmount + downPayment;
    return Math.round(maxMortgage);
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

function getListOfAddresses(adresses) {
    let addressList = []
    adresses.forEach(address => {
        addressList.concat(getAddress(address));
    });

    return addressList;
}

function getListOfAssets(assets) {
    let assetsList = []
    assets.forEach(asset => {
        assetsList.concat(getAsset(asset));
    });

    return assetsList;
}

function getListOfIncomes(incomes) {
    let incomesList = []
    incomes.forEach(income => {
        incomesList.concat(getIncome(income));
    });

    return incomesList;
}

function getListOfProperties(properties) {
    let propertiesList = []
    properties.forEach(property => {
        propertiesList.concat(getProperty(property));
    });

    return propertiesList;
}

function getListOfProfessionals(professionals) {
    let professionalsList = []
    professionals.forEach(professional => {
        professionalsList.concat(getProfessional(professional));
    });

    return professionalsList;
}

function getAddress(addressObj){
    console.log("addressObj", addressObj);
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
    console.log("assetObj", assetObj);
    return new Asset({
        type: assetObj.type,
        description: assetObj.description,
        value: assetObj.value,
        includedInDownPayment: assetObj.includedInDownPayment
    });
}

function getIncome(incomeObj){
    console.log("incomeObj", incomeObj);

    let address = getAddress(incomeObj.businessAddress);

    return new Income({
        type: incomeObj.type,
        description: incomeObj.description,
        businessType: incomeObj.businessType,
        businessName: incomeObj.businessName,
        businessAddress: address,
        jobTitle: incomeObj.jobTitle,
        employmentType: incomeObj.employmentType,
        paymentType: incomeObj.paymentType,
        amount: incomeObj.amount,
        startDate: incomeObj.startDate
    })
}

function getProperty(propertyObj){
    console.log("propertyObj", propertyObj);

    let address = getAddress(propertyObj.address);

    return new Properties({
        address: address,
        value: propertyObj.value,
        annualPropertyTaxes: propertyObj.annualPropertyTaxes,
        condoFees: propertyObj.condoFees,
        monthlyPayment: propertyObj.monthlyPayment
    })
}

function getProfessional(professionalObj){
    console.log("professionalObj", professionalObj);

    return new Professionals({
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

    let client = new Client({
        userId: user,
        firstTimeBuyer: request.firstTimeBuyer,
        maritalStatus: request.maritalStatus,
        numberOfDependents: request.numberOfDependents,
        currentAddress: getAddress(request.currentAddress),
        passedAddresses: []
    });

    request.passedAddresses.forEach(address => {
        client.passedAddresses.push(getAddress(address));
    });

    client.save().then(result => {
        console.log("client saved: ", result)
        return result
    }).catch(err => {
        console.log("Error saving client!")
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