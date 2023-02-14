const Client = require('../models/clients');
const User = require('../models/users');

async function add(req, res){
    try{
        let user = await User.findOne({_id: req.body.userId})
        
        if (!user){
            return res.status(400).json({error: "User doesn't exist."})
        }
        
        let existingClient = await Client.findOne({userId: req.body.userId})
        
        if (existingClient) {
            return res.status(400).json({error: "Client already registered."})
        }

        let client = new Client ({
            userId: req.body.userId,
            firstTimeBuyer: req.body.firstTimeBuyer,
            maritalStatus: req.body.maritalStatus,
            numberOfDependents: req.body.numberOfDependents
        })
        
        client.save().then(result => {
            return res.status(201).json(result)
        }).catch(err => {
            return res.status(400).json(err)
        })

    }catch(err){
        res.status(400).json(err);
    }
}

async function getByUserId(req, res){
    try{
        let client = await Client.findOne({userId: req.params.userId})

        if(!client){
            return res.status(404).json({message: "Client not found."});
        }

        return res.status(200).json({client})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function remove(req, res){
    try{
        let client = await Client.findOne({userId: req.params.userId})

        if(!client){
            return res.status(404).json({message: "Client not found."});
        }

        let result = await Client.deleteOne({userId: req.params.userId})
        return res.status(200).json({message: "Client deleted.", result})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function edit(req, res){
    try{
        let client = await Client.findOne({userId: req.params.userId})

        if(!client){
            return res.status(404).json({message: "Client not found."});
        }
    
        if(req.body.firstTimeBuyer){
            client.firstTimeBuyer = req.body.firstTimeBuyer;
        }

        if(req.body.maritalStatus){
            client.maritalStatus = req.body.maritalStatus;
        }

        if(req.body.numberOfDependents){
            client.numberOfDependents = req.body.numberOfDependents;
        }

        client.save().then(result => {
            return res.status(200).json(result)
        }).catch(err => {
            return res.status(400).json(err)
        });

    }catch(err){
        res.status(400).json({error: err});
    }
}

exports.add = add;
exports.getByUserId = getByUserId;
exports.remove = remove;
exports.edit = edit; 