const Broker = require('../models/brokers');
const User = require('../models/users');
const province = require('./ProvinceController');
const user = require('./UserController');

async function add(req, res){
    try{
        let user = await User.findOne({_id: req.body.userId})

        if (!user){
            return res.status(400).json({error: "User doesn't exist."})
        }

        let existingBroker = await Broker.findOne({userId: req.body.userId})

        if (existingBroker) {
            return res.status(400).json({error: "Broker already registered."})
        }

        let broker = new Broker ({
            userId: req.body.userId,
            companyName: req.body.companyName,
            percentageFee: req.body.percentageFee,
            province: req.body.province
        })
        
        broker.save().then(result => {
            return res.status(201).json(result)
        }).catch(err => {
            return res.status(400).json(err)
        })

    }catch(err){
        res.status(400).json(err);
    }
}

async function getByProvince(req, res){
    try{
        if(!province.isValid(req.params.province)){
            return res.status(404).json({message: "Province not found."});
        }
        let broker = await Broker.find({province: req.params.province})

        if(!broker){
            return res.status(404).json({message: "Broker not found."});
        }

        return res.status(200).json({broker})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function getByUserId(req, res){
    try{
        let broker = await Broker.findOne({userId: req.params.userId})

        if(!broker){
            return res.status(404).json({message: "Broker not found."});
        }

        return res.status(200).json({broker})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function remove(req, res){
    try{
        let broker = await Broker.findOne({userId: req.params.userId})

        if(!broker){
            return res.status(404).json({message: "Broker not found."});
        }

        let result = await Broker.deleteOne({userId: req.params.userId})
        return res.status(200).json({message: "Broker deleted.", result})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

async function edit(req, res){
    try{
        let broker = await Broker.findOne({userId: req.params.userId})

        if(!broker){
            return res.status(404).json({message: "Broker not found."});
        }
    
        if(req.body.companyName){
            broker.companyName = req.body.companyName;
        }

        if(req.body.percentageFee){
            broker.percentageFee = req.body.percentageFee;
        }

        if(req.body.province){
            if (!province.isValid(req.body.province)){
                return res.status(404).json({message: "Province is not valid."}); 
            }
            broker.province = req.body.province;
        }

        broker.save().then(result => {
            return res.status(200).json(result)
        }).catch(err => {
            return res.status(400).json(err)
        });

    }catch(err){
        res.status(400).json({error: err});
    }
}

exports.add = add;
exports.getByProvince = getByProvince;
exports.getByUserId = getByUserId;
exports.remove = remove;
exports.edit = edit; 