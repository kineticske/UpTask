alert('heeey')

export const actualizarAvance = () => {
    //select tasks 
    const tasks = document.querySelectorAll('li.tarea');

    if (tasks.length){
        //select complete tasks
        const completeTasks = document.querySelectorAll('i.completo');
        //calculate the progress
        const avance= Math.round((completeTasks.length/tasks.length)*100)
        console.log(avance)
        //show the progress bar
        const porcentaje=document.querySelector('#porcentaje');
        porcentaje.style.width= avance+'%'; //67% of width
    }
    
}