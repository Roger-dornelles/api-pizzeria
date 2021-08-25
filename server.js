require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const routes = require('./routes');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error',(error)=>{
    console.log('ERROR: ',error.message);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(fileupload())
server.use(express.static(__dirname+'/public'));
server.use('/',routes);

server.listen(process.env.PORT,()=>{
    console.log('funcionando: ',process.env.BASE);
})