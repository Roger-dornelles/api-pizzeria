const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({ 
        name:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{min:2}
            },
            errorMessage:'Nome precisa ter no minimo 2 caracteres',
        },
        email:{
            isEmail:true,
            normalizeEmail:true,
            errorMessage: 'E-mail obrigatorio'
        },
        address:{
            trim:true,
            notEmpty:true,
            errorMessage:'Endereço obrigatorio'
        },
        district:{
            trim:true,
            notEmpty:true,
            errorMessage:'Bairro obrigatorio'
        },
        telephone:{
            trim:true,
            notEmpty:true,
            errorMessage:'Telefone obrigatorio'
        },
        password:{
            trim:true,
            notEmpty:true,
            isLength:{
                options:{min:6}
            },
            errorMessage:'Senha precisa ter mais de 6 digitos.'
        }
    }),
    signin:checkSchema({
        email:{
            trim:true,
            isEmail:true,
            normalizeEmail:true,
            notEmpty:true,
            errorMessage:'Email Obrigatorio' 
        },
        password:{
            trim:true,
            notEmpty:true,
            errorMessage:'Senha Obrigatorio'
        }
    }),
    editAction:checkSchema({
        name:{
            optional:true,
            trim:true,
            isLength:{
                options:{min:2}
            },
            errorMessage:"Nome precisa ter 2 caracteres ou mais."
        },
        email:{
            optional:true,
            trim:true,
            isEmail:true,
            normalizeEmail:true,
            errorMessage:"E-mail invalido"
        },
        password:{
            optional:true,
            trim:true,
            isLength:{
                options:{min:6}
            },
            errorMessage:'Senha precisa ter 6 caracteres ou mais.'
        },
        district:{
            optional:true,
            trim:true,
            errorMessage:'Bairro obrigatorio'
        },
        address:{
            optional:true,
            trim:true,
            errorMessage:'Endereço obrigatorio.'
        },
        telephone:{
            optional:true,
            trim:true,
            notEmpty:true,
            errorMessage:'Numero de telefone Obrigatorio'
        },
        token:{
            notEmpty:true
        }
    }),
    
}