const Proyectos= require('../models/Proyectos') //import model

exports.ProyectHome= async (req, res)=>{

    const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos
    res.render('index',{ //(name_view, params) =>
        nombrePagina:"Proyectos",
        proyectos
    })
};

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
    const {nombre}= await req.body; //destrucring this name of variable of reponse

    let errores=[];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre al proyecto'})
    }

    if(errores.length>0){
        res.render('nuevoProyectoVista', {
            nombrePagina:"Nuevo Proyecto",
            errores
        })
    }else{
        //BD INSERT
        await Proyectos.create({nombre, url});
        res.redirect('/')
        
    }
}

exports.proyectosporURL= async (req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    if(!proyecto) return next(); //validation

    const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos

    //render view 
    res.render('tareas', {
        nombrePagina:"Tareas del Proyecto",
        proyecto,
        proyectos
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

    [proyectos, proyecto]= await Promise.all([proyectosPromise, proyectoPromise]);//other option because they are independent 

    res.render('nuevoProyectoVista', {
        nombrePagina:"Editar Proyecto",
        proyectos,
        proyecto
    })
}


exports.actualizarProyecto= async (req, res)=>{
    //input is fullfilled
    const proyectos= await Proyectos.findAll();
    const {nombre}= await req.body; //destrucring this name of variable of reponse

    let errores=[];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre al proyecto'})
    }

    if(errores.length>0){
        res.render('nuevoProyectoVista', {
            nombrePagina:"Nuevo Proyecto",
            errores
        })
    }else{
        //BD INSERT
        await Proyectos.update({nombre:nombre},
            {where: {id:req.params.id}});
        res.redirect('/')
        
    }
}


exports.eliminarProyecto = async (req, res, next) => { //capture the request that was sent on that route 

    // req, query or params
    const {urlProyecto}=req.query

    const result = await Proyectos.destroy({ where: {url : urlProyecto}}) //DELETE FROM table WHERE id = '',
} /* url on the db is equal to urlProyecto that catch the url that was sent in the request*/
