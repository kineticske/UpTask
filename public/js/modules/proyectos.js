import Swal from "sweetalert2";
import axios from "axios";

const btnDelete= document.querySelector('#eliminar-proyecto');

if(btnDelete){ //it is always good to check if the elements exist
    btnDelete.addEventListener('click', (e) =>{ //use sweetalert2
        const proyectosUrl=e.target.dataset.proyectoUrl; //read data-proyecto-url
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
            if (result.isConfirmed) {
                //sending request to axios 
                const url=`${location.origin}/proyectos/${proyectosUrl}`;
                axios.delete(url, {params: {urlProyecto}})
                    .then(response => response)

                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
                setTimeout(() =>{
                    window.location.href="/" //window.location set the location to go
                }, 3000); //redirect to initial page
            }
        })
    })
}

export default btnDelete;