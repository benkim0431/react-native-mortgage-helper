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
        let client = await Client.findOne({clientId: req.body.clientId})

        if (!client){
            return res.status(400).json({error: "Client doesn't exist."})
        }

        if(req.body.brokerId){
            let broker = await Broker.findOne({brokerId: req.body.brokerId})
    
            if (!broker){
                return res.status(400).json({error: "Broker doesn't exist."})
            }
        }

        let application = new Application ({
            clientId: req.body.clientId,
            brokerId: req.body.brokerId,
            lastModified: new Date().toISOString().split('T')[0],
            status: status.open,
            totalValue: req.body.totalValue
        });
        
        application.save().then(result => {
            return res.status(201).json(result)
        }).catch(err => {
            return res.status(400).json(err)
        })

    }catch(err){
        res.status(400).json(err);
    }
}

async function getByClientId(req, res){
    try{
        let applications = await Application.find({clientId: req.params.clientId})

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
        let applications = await Application.find({brokerId: req.params.brokerId})

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
        let application = await Application.findOne({_id: req.params.applicationId})
        
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