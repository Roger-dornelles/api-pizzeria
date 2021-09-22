//const { validationResult, matchedData } = require('express-validator');
const jimp = require('jimp');
const { v4:uuid } = require('uuid');

//models
const Pizzas = require('../models/Pizzas');
const User = require('../models/User');
const Drinks = require('../models/Drinks');

// criar um nome a imagem e salvar (./public/media)
const addImage = async(buffer)=>{
    let newName = `${uuid()}.jpg`;
    let imgTemp = await jimp.read(buffer);
    imgTemp.cover(500,500).quality(80).write(`./public/media/${newName}`);
    return newName;
}
module.exports = {
    //adicionar pizza
    addPizza: async (req,res)=>{
        let { name, description, price, token } = req.body;

        const user = await User.findOne({token})
        if(!user){

            res.json({error: 'Usuario não autorizado.'});
            return;
        }
        
        let pizza = new Pizzas();

        if(!name || !description || !price ){
            res.json({ error:'Preencha todos os campos.'});
            return;
        }

        if(name){
        pizza.name = name;
        };

        if(description){
            pizza.description = description;
        };

        if(price){
        price = price.replace(',','.');
        pizza.price = parseFloat(price);
        };

        if(req.files && req.files.image){
            
            if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.image.mimetype)){
                let url = await addImage(req.files.image.data);
                    pizza.image.push(`${process.env.BASE}/media/${url}`);
            }
            
        };


        const add = await pizza.save();
        res.json({add});
    },
    // mostrar pizzas
    searchPizza: async (req,res) => {
        let pizzas = await Pizzas.find();

        res.json({pizzas});
    },

    //editar pizza
    editActionPizza: async (req, res) => {
        let id = req.body.id;
        let {name,price,description } = req.body;
        await Pizzas.findById(id);

        let updates = {};
        if(name){
            updates.name = name;
        };

        if(description){
            updates.description = description;
        };

        if(price){
            price = price.replace(',','.');
            updates.price = parseFloat(price);
        };

        if(req.files && req.files.image){
            if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.image.mimetype)){
                let url = await addImage(req.files.image.data);
                updates.image = `${process.env.BASE}/media/${url}`;
            };
        }
        await Pizzas.findByIdAndUpdate(id,{$set:updates});
        res.json('Atualizado com sucesso')

    },
    //deletar uma pizza
    deleteActionPizza: async (req,res)=>{
        const token = req.query.token;
        const user = await User.findOne({token});
        if(!user){
            res.json({error:'Usuario não autorizado.'});
            return;
        };

        const _id = req.query._id;
        await Pizzas.findByIdAndDelete({_id});
        await res.json('Deletado com sucesso.')
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    // BEBIDAS
    // adicionar bebidas
    addDrinks: async (req,res)=>{
        let token = req.body.token;

        let user = await User.findOne({token});

        if(!user){
            res.json({error:'Usuario não autorizado'});
            return;
        };
        let {name,price} = req.body;
        let drink = new Drinks();

        if(!name || !price){
            res.json({error:'Preencha todos os campos!!'});
            return;
        }

        if(name){
            drink.name = name;
        }

        if(price){
            price = price.replace(',','.');
            drink.price = parseFloat(price);
        }

        if(req.files && req.files.image){
            
            if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.image.mimetype)){
                let url = await addImage(req.files.image.data);
                drink.image.push(`${process.env.BASE}/media/${url}`);
            }
            
        };

        let add = await drink.save();
        
        res.json({add});
    },
    // mostrar bebidas
    searchDrinks: async (req,res)=>{
        let drinks = await Drinks.find();
        res.json({drinks});
    },
    // editar bebidas
    editActionDrink: async(req,res)=>{
        const token = req.body.token;
        const user = await User.findOne({token});
        if(!user){
            res.json({error:'Usuario não autorizado'});
            return;
        };

        const id = req.body.id;
        await Drinks.findById(id)
        let {name,price}= req.body;
        let updates= {};

        if(name != ''){
            updates.name = name;
        }

        if(price != ''){
            price = price.replace(',','.');
            updates.price = parseFloat(price);
        }

        if(req.files && req.files.image){
            let url = await addImage(req.files.image.data);
            updates.image = `${process.env.BASE}/media/${url}`;
        };

        await Drinks.findByIdAndUpdate(id,{$set:updates});
        res.json('Atualizado com sucesso');


    },
    // excluir uma bebida.
    delete:async (req,res)=>{
        let token = req.query.token;
        const user = await User.findOne({token});
        if(!user){
            res.json({error:'Usuario não autorizado.'});
            return;
        }

        const _id = req.query._id;
        await Drinks.findByIdAndDelete({_id});
        await res.json('Deletado com sucesso.')
    }
}