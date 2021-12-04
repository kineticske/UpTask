import Swal from 'sweetalert2';

export const actualizarAvance = () => {
    //select tasks 
    const tareas = document.querySelectorAll('li.tarea');
    if (tareas.length ){
        //select complete tasks
        const tareasCompletas = document.querySelectorAll('i.completo');
        //calculate the progress
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
        console.log(avance)
        //show the progress bar
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%'; // n% width

        if(avance === 100) {
            Swal.fire(
                'Completaste el Proyecto',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
    }
    
}

