import Swal from "sweetalert2";
import axios from "axios";

const btnDelete= document.querySelector('#eliminar-proyecto');

if(btnDelete){ //it is always good to check if the elements exist
    btnDelete.addEventListener('click', (e) =>{ //use sweetalert2
        const urlProyecto=e.target.dataset.proyectoUrl; //read data-proyecto-url
        console.log(urlProyecto);
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
            if (result.value) {
                //sending request from axios 
                const url=`${location.origin}/proyectos/${urlProyecto}`;
                console.log(url)
                axios.delete(url, {params: {urlProyecto}}).then((response) => {
                        console.log(response);
                    // return;
                        Swal.fire(
                            'Deleted!',
                            response.data,
                            'success'
                    );
                        setTimeout(() =>{
                            window.location.href="/" //window.location set the location to go
                            }, 3000); //redirect to initial page
                        })
                    .catch(() =>{
                        Swal.fire(
                            {
                                // type : 'error',
                                title : 'Hubo un error',
                                text:'no se cargó'
                                    }
                                );
                            });
            }
        });
    });
}


export default btnDelete;