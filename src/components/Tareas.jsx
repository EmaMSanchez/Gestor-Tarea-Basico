import Tarea from "./Tarea";

const Tareas = ({tareas, deleteTarea,updateTareas}) =>{ //Tareas al ser un objeto es decir JS se recive entre {}, para desetructurarlo del atributo pasado por html por prop

return(
<div className="mt-5">
    <h2 className="text-center">Tareas</h2>
    <ul className="list-group">
    {tareas.map((tarea) => (
        <Tarea key={tarea.id} tarea ={tarea} deleteTarea={deleteTarea} updateTareas={updateTareas}/> //Si se itera debe enviarse por cada iteracion el ID, por eso en las listas (LI) es necesario la key, en este caso se itera un componente, al igual que las LI debiendo tener una key que contenga el ID, a su vez se le envia la tarea en especifico para que el omponente la pueda dprocesar
       //Se le envia los metodos a el componente para poder aplicarlos en los eventos onCLick()
       ))}
       {
        tareas.length === 0 && (<li className="list-group-item text-center">No hay Tareas</li> //Si la extencion del arreglo es === 0 muestra el mensaje
       )}
    </ul>
</div>
);
};

export default Tareas;