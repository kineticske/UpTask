const Proyectos= require('../models/Proyectos')
exports.ProyectHome=(req, res)=>{
    res.render('index',{
        nombrePagina:"Proyectos"
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