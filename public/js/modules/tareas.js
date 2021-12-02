const tareas=document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', (e)=>{
        if(e.target.classList.contains('fa-check-circle')){
            console.log('Actualizando')
            const icon = e.target,
            idTarea=icon.parentElement.parentElement.dataset.tarea;
            console.log(idTarea)
        }
    })
}

module.exports=tareas;