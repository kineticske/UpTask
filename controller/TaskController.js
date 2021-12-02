const Proyectos= require('../models/Proyectos') //import model
const Tareas= require('../models/Tareas') //import tasks

exports.addTask = async (req, res, next) => {
    // console.log(req.params.url)

    //first: get the project where we are working on
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}} )

    // console.log(proyecto)
    // console.log(req.body) //recomended because is the data sent from the frontend side
    const {tarea} =req.body;

    console.log(tarea)

    const estado=0; //by default

    const proyectoId= proyecto.id; //project ID

    const result= await Tareas.create({tarea, estado, proyectoId}); //same order from database

    if(!result) { return next(); }

    res.redirect(`/proyectos/${req.params.url}`); //is equivalent to refresh the same page
}