const Application = require('../models/applications');
const Broker = require('../models/brokers');
const Client = require('../models/clients');

const status = {
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
        let client = await Client.findOne({clientId: req.body.clientId.toString().trim()})

        if (!client){
            return res.status(400).json({error: "Client doesn't exist."})
        }
        
        //perform the calculation here
        let totalValue = calculateMaxMortgage(req.body.assets, req.body.incomes, req.body.downPaymentValue)
        let housePhoto = decideHousePhoto(totalValue)

        let application = new Application ({
            clientId: req.body.clientId,
            lastModified: new Date().toISOString().split('T')[0],
            status: status.open,
            totalValue: totalValue
        });
        
        application.save().then(result => {
            let response = {
                applicationId: result._id,
                housePhoto: housePhoto,
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
        let application = await Application.findOne({ _id: req.params.applicationId.toString().trim() });

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

        if(!applications){
            return res.status(404).json({message: "No applications found."});
        }

        return res.status(200).json({applications})
    }catch(err){
        return res.status(400).json({error: err})
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
  
exports.add = add;
exports.getById = getById;
exports.getByBrokerId = getByBrokerId;
exports.getByClientId = getByClientId;
exports.edit = edit; 