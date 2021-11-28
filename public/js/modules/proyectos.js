import Swal from "sweetalert2";
import axios from "axios";

const btnDelete= document.querySelector('#eliminar-proyecto');

btnDelete.addEventListener('click', () =>{ //use sweetalert2
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