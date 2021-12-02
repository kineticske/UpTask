const express=require('express');
const router=express.Router();
const {body}=require('express-validator')


const ControllerUpTask= require('../controller/ControllerUpTask'); //import controller general proyects
const TaskController= require('../controller/TaskController'); //import task controller

module.exports=function(){
    //PROYECTS
    router.get('/', ControllerUpTask.ProyectHome )
    router.get('/nuevoProyecto', ControllerUpTask.FormularioProyecto )
    router.post('/nuevoProyecto', 
                body('nombre').not().isEmpty().trim().escape(),
                ControllerUpTask.nuevoProyecto) //from validator
    //it's always good to place the used links from pug or view to the routes
    router.get('/proyectos/:url', ControllerUpTask.proyectosporURL)
    //create and update especific proyect
    router.get('/proyectos/editar/:id', ControllerUpTask.formularioEditar) //update because the function to do it is called from the controller
    router.post('/nuevoProyecto/:id',  //post 
                body('nombre').not().isEmpty().trim().escape(),
                ControllerUpTask.actualizarProyecto)
    //delete especific proyect
    router.delete('/proyectos/:url', ControllerUpTask.eliminarProyecto) 

    //TASKS - PROYECTS
    router.post('/proyectos/:url',  //post 
                TaskController.addTask)

    return router
} // router --> all routes


