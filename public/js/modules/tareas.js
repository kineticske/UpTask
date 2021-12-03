import axios from 'axios';
import Swal from 'sweetalert2';

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
                //first: obtain HTML element and ID
                const tareaHTML= e.target.parentElement.parentElement,
                    idTarea= tareaHTML.dataset.tarea;
                    const url = `${location.origin}/tareas/${idTarea}`;
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'No, dont delete it!',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if(result){
                            //send delete from axios to back
                            axios.delete(url, {params: {idTarea}})
                                .then((response) => {
                                    console.log(response)
                                    if(response.status===200) {
                                        //delete node element
                                        tareaHTML.parentElement.removeChild(tareaHTML);
                                        //alert optional
                                    }
                                })
                        }
                    })
            }
        }
    )}

module.exports=tareas;

//params print id router
//query print variable