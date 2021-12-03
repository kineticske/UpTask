const Proyectos= require('../models/Proyectos') //import model
const Tareas= require('../models/Tareas') //import tasks

exports.addTask = async (req, res, next) => {
    // console.log(req.params.url)

    //first: get the project where we are working on
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}} )

    // console.log(proyecto)
    // console.log(req.body) //recomended because is the data sent from the frontend side
    const {tareas} =req.body;

    console.log(tareas)

    const estado=0; //by default

    const proyectoId= proyecto.id; //project ID

    const result= await Tareas.create({ tareas, estado, proyectoId}); //same order from database
    console.log(result)

    if(!result) { return next(); }

    res.redirect(`/proyectos/${req.params.url}`); //is equivalent to refresh the same page
}

exports.patchStateTask= async (req, res, next) => {
    const {id} = req.params;
    const tarea= await Tareas.findOne({where: {id}})

    let estado= 0;
    if(tarea.estado==estado) {
        estado=1;
    } 
    tarea.estado=estado

    const result= await tarea.save();

    if(!result) {return next();}

    res.status(200).send('Actualizando')
}

exports.deleteTask= async (req, res, next) => {
    res.send('eliminando')
}