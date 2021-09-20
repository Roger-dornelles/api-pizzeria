const express = require('express');
const router = express.Router();

// middlewares
const Auth = require('./src/middlewares/Auth');

//controllers
const UserController = require('./src/controllers/UserController');
const ProductController = require('./src/controllers/ProductController');

//validators
const AuthValidator = require('./src/validators/AuthValidator');
const ProductValidator = require('./src/validators/ProductValidator');

//USUARIOS
//cadastro
router.post('/user/signup',AuthValidator.signup,UserController.signup);

//login
router.post('/user/signin',AuthValidator.signin,UserController.signin);

//pegar informações do usuario
router.get('/user/info',Auth.private,UserController.userInfo);

//editar informações do usuario
router.put('/user/editAction',Auth.private,AuthValidator.editAction,UserController.editAction);

//PIZZAS
//adicionar pizza
router.post('/pizzas/add', Auth.private, ProductController.addPizza);

//mostrar pizzas
router.get('/pizzas/search',ProductController.searchPizza);

//editar pizzas
router.put('/pizza/edit',Auth.private,ProductValidator.editActionPizza, ProductController.editActionPizza);

//deletar uma pizza
router.delete('/pizza/delete', Auth.private, ProductController.deleteActionPizza)

//BEBIDAS
//adicionar bebidas
router.post('/drinks/add',Auth.private, ProductController.addDrinks);

//mostrar bebidas
router.get('/drinks/search', ProductController.searchDrinks);

//editar bebida
router.put('/drinks/adit', Auth.private,ProductValidator.editActionDrinks, ProductController.editActionDrink);

//deletar uma bebida
router.delete('/drinks/delete', Auth.private, ProductController.delete);

module.exports = router;