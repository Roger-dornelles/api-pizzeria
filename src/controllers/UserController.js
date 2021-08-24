const {validationResult,matchedData} = require('express-validator');
const bcrypt = require('bcryptjs');

//models
const User = require('../models/User');

module.exports = {
    //cadastro do usuario
    signup: async (req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error:errors.mapped()});
            return;
        };

        let data = matchedData(req);


        const user = await User.findOne({email:data.email});
        if(user){
            res.json({error:{email:{msg:'E-mail já cadastrado!'}}});
            return;
        };

        const password = await bcrypt.hash(data.password,10);
        const payload = (Date.now()+Math.random()).toString();
        const token = await bcrypt.hash(payload,10);

        const newUser = await new User({
            name:data.name,
            email:data.email,
            address: data.address,
            district:data.district,
            telephone:data.telephone,
            password,
            token
        });

        await newUser.save();
        res.json({token});

    },
    //login de usuario
    signin: async(req,res)=>{

        const errors = await validationResult(req);
        if(!errors.isEmpty()){
            res.json({error:errors.mapped()});
            return;
        }

        let data = await matchedData(req);

        let user = await User.findOne({email:data.email});
        if(!user){
            res.json({error:{email:{msg:'E-mail invalido'}}});
            return;
        }

        const userPass = await bcrypt.compare(data.password,user.password);
        if(!userPass){
            res.json({error:{password:{msg:'Senha invalida'}}});
            return;
        };

        

        const payload = await (Date.now()+Math.random).toString();
        const token = await bcrypt.hash(payload,10);

        user.token = token;
        await user.save()
        res.json({token});

    },
    //editar informações
    editAction: async (req,res)=>{
        const errors =  validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);

        let updates = {};

        if(data.name){
            updates.name = data.name;
        };

        if(data.address){
            updates.address = data.address;
        };

        if(data.district){
            updates.district = data.district;
        };

        if(data.email){
            const emailCheck = await User.findOne({email:data.email});
            if(emailCheck){
                res.json({error:{msg:'E-mail já existe'}});
                return;
            }

            updates.email = data.email;
        }

        if(data.password){
            const password = await bcrypt.hash(data.password,10);
            updates.password = password;
        }
        
        await User.findOneAndUpdate({token:data.token},{$set:updates});
        console.log(updates)
        res.json({updates});

    },
    userInfo: async (req,res)=>{
        let token = req.query.token
        
        const user = await User.findOne({token});
        res.json({user});
    }
}