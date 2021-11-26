const Proyectos= require('../models/Proyectos') //import model
exports.ProyectHome= async (req, res)=>{

    const proyectos= await Proyectos.findAll(); //sequelize method to get all proyectos
    res.render('index',{ //(name_view, params) =>
        nombrePagina:"Proyectos",
        proyectos
    })
};

exports.FormularioProyecto =(req, res)=>{
    res.render('nuevoProyectoVista', {
        nombrePagina:"Nuevo Proyecto"
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
        const proyectos = await Proyectos.create({nombre, url});
        res.redirect('/')
        
    }
}