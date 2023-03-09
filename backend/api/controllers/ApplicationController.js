const Application = require('../models/applications');
const Broker = require('../models/brokers');
const Client = require('../models/clients');

const status = {
	open: "OPEN",
	approved: "APPROVED",
	rejected: "REJECTED"
}

async function add(req, res){
    try{
        let client = await Client.findOne({clientId: req.body.clientId.toString().trim()})

        if (!client){
            return res.status(400).json({error: "Client doesn't exist."})
        }
        
        //perform the calculation here
        let totalValue = 350000
        let housePhoto = "House1"

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

exports.add = add;
exports.getByBrokerId = getByBrokerId;
exports.getByClientId = getByClientId;
exports.edit = edit; 