const express=require('express');
const router=express.Router();
const {body}=require('express-validator/check')


const ControllerUpTask= require('../controller/ControllerUpTask'); //import controller

module.exports=function(){
    router.get('/', ControllerUpTask.ProyectHome )
    router.get('/nuevoProyecto', ControllerUpTask.FormularioProyecto )
    router.post('/nuevoProyecto', 
                body('nombre').not().isEmpty().trim().escape(),
                ControllerUpTask.nuevoProyecto)
    return router
}


