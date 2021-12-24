const Proyectos= require('../models/Proyectos') //import model
const Tareas= require('../models/Tareas') //import model
// const Usuarios= require('../models/Usuarios') //import model


exports.ProyectHome= async (req, res)=>{
    try{
        const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos
        res.render('index',{ 
            nombrePagina:"Proyectos",
            proyectos
        })
    }catch(e){
        console.log(e)
    } //h
}


exports.FormularioProyecto =async (req, res)=>{
    const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos
    res.render('nuevoProyectoVista', {
        nombrePagina:"Nuevo Proyecto",
        proyectos
    })
}
// exports.nuevoProyecto=(req, res)=>{
//     //input is fullfilled
//     const {nombre}=req.body; //destrucring this name of variable of reponse

//     let errores=[];

//     if(!nombre){
//         errores.push({'texto': 'Agregar un nombre al proyecto'})
//     }

//     if(errores.length>0){
//         res.render('nuevoProyectoVista', {
//             nombrePagina:"Nuevo Proyecto",
//             errores
//         })
//     }else{
//         //BD INSERT
//         Proyectos.create({nombre})
//             .then(()=>{console.log('insertado')})
//             .catch((err)=>{console.log(err)})
//     }
// }

//with async await
exports.nuevoProyecto= async (req, res)=>{
    //input is fullfilled
    const proyectos= await Proyectos.findAll();
    // const {nombre}= await req.body; //destrucring this name of variable of reponse
    const nombre= await req.body.nombre; 
    let errores=[];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre al proyecto'})
    }

    if(errores.length>0){
        res.render('nuevoProyectoVista', {
            nombrePagina:"Nuevo Proyecto",
            errores,
            proyectos
        })
    }else{
        //BD INSERT
        await Proyectos.create({nombre});
        res.redirect('/')
        
    }
}

exports.proyectosporURL= async (req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        },
        // include: [
        //         { model: Proyectos } //see the associated Project
        //     ]
    });
    if(!proyecto) return next(); //validation

    const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos

    //see all the tasks 
    const tareas= await Tareas.findAll({where: {
        proyectoId: proyecto.id //proyect was found in this function on the line 72
    }})

    console.log(tareas)
    //render view 
    res.render('tareas', {
        nombrePagina:"Tareas del Proyecto",
        proyecto,
        proyectos,
        tareas
    })
    
}

//edit proyects

exports.formularioEditar=async (req, res) => {
    // const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos

    // const proyecto = await Proyectos.findOne({ //individual search
    //     where: {
    //         url: req.params.id
    //     }
    // });

    const proyectosPromise= Proyectos.findAll(); 

    const proyectoPromise = Proyectos.findOne({ 
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto]= await Promise.all([proyectosPromise, proyectoPromise]);//other option because they are independent 

    res.render('nuevoProyectoVista', {
        nombrePagina:"Editar Proyecto",
        proyectos,
        proyecto
    })
}


exports.actualizarProyecto= async (req, res)=>{
    //input is fullfilled
    const proyectos= await Proyectos.findAll();
    const {nombre}= req.body; //destrucring this name of variable of reponse

    let errores=[];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre al proyecto'})
    }

    if(errores.length>0){
        res.render('nuevoProyectoVista', {
            nombrePagina:"Nuevo Proyecto",
            errores,
            proyectos
        })
    }else{
        //BD INSERT
        await Proyectos.update(
            {nombre:nombre},
            {where: {id:req.params.id}}
            );
        res.redirect('/')
        
    }
}


exports.eliminarProyecto = async (req, res, next) => { //capture the request that was sent on that route 
    console.log(req)
    console.log(req.params)
    console.log(req.query)
    // req, query or params
    const {urlProyecto}=req.query;

    const result = await Proyectos.destroy({ where: {url : urlProyecto}}); //DELETE FROM table WHERE id = '',
    /* url on the db is equal to urlProyecto that catch the url that was sent in the request*/

    if (!result){
        return next(); //return to the next step of response, next middleware
    }
    
    res.status(200).send('Eliminado');


} 
