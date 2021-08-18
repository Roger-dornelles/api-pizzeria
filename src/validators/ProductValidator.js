const { checkSchema } = require('express-validator');

module.exports = {
    
    editActionPizza:checkSchema({
        name:{
            optional:true,
            trim:true,
            errorMessage: 'Informe o nome do produto.'
        },
        description:{
            optional:true,
            trim:true,
            errorMessage: 'Informe a descrição do produto.'
        },
        price: {
            optional:true,
            trim:true,
            errorMessage:'Informe o valor do produto.'
        },
        image: {
            optional:true,
            errorMessage: 'Adicione uma imagem do produto.'
        }
    }),

    editActionDrinks: checkSchema({
        name:{
            optional:true,
            trim:true,
            errorMessage:'Informe o nome do produto.'
        },
        price:{
            optional:true,
            trim:true,
            errorMessage:'Adicione um valor ao produto.'
        },
        image: {
            optional:true,
            errorMessage:'Adicione uma imagem do produto.'
        }
    })
}