const express=require('express');
const router=express.Router();
const {body}=require('express-validator')


const ControllerUpTask= require('../controller/ControllerUpTask'); //import controller general proyects
const TaskController= require('../controller/TaskController'); //import task controller
const UserController= require('../controller/UserController'); //import User Controller
const oauthController= require('../controller/oauthController') // import oauth controller0

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
    //adding one task
    router.post('/proyectos/:url',  //post 
                TaskController.addTask)
    //update tasks 
    router.patch('/tareas/:id', TaskController.patchStateTask) //update an especific part of the object, not all object
    // delete tasks
    router.delete('/tareas/:id', TaskController.deleteTask) //update an especific part of the object, not all object

    //USERS

    // create a new account
    router.get('/crear-cuenta', UserController.formcreateAccount)
    router.post('/crear-cuenta', UserController.createAccount)
    //signin 
    router.get('/iniciar-sesion', UserController.formOpenSession)
    router.post('/iniciar-sesion', oauthController.authUser
    )
    return router
} // router --> all routes


