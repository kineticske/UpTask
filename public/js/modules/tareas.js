import axios from 'axios';

const tareas=document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', (e)=>{
        if(e.target.classList.contains('fa-check-circle')){
            console.log('Actualizando')
            const icon = e.target;
            const idTarea=icon.parentElement.parentElement.dataset.tarea;
            console.log(idTarea)

            //request to /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then(function (response) {
                    if(response.status===200){
                        icon.classList.toggle('completo')
                    }
                }
                )
            }
            if(e.target.classList.contains('fa-trash')){
                //first: obtain HTML element
                const tareaHTML= e.target.parentElement.parentElement,
                    idTarea= tareaHTML.dataset.tarea;
            }
        }
    )}

module.exports=tareas;