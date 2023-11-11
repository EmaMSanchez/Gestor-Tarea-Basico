const Tarea = ({tarea,deleteTarea,updateTareas}) =>{ //La propiedad recivida debe llamarse igual que el atributo enviado por medio de la etiqueta
    
    const{id, titulo, descripcion, estado, prioridad} = tarea //Se desestructura el objeto para ingresar directamente a el atributo
    
    return <li className="list-group-item">{
       <div className="d-flex justify-content-between align-items-start"> {/*flexbos POSICIONA los elementos que contiene UNO AL LADO DEL OTRO, por defecto deja los objetos en strech(ocupan todo el box), pero se soluciona con start */}
        <div>
            <h5 className={`${estado &&  "text-decoration-line-through"}`}>{titulo}</h5> {/*Dentro de la clase en la etiqueta de H5 se EVALUA por medio de interpolacion el ESTADO, si cumple la condicion (TRUE = COMPLETADO), APLICA LA CLASE DE CSS(boostrap), en este caso un texto tachado, tambien se podria modificar con text decoration de CSS */}
            <p className={`${estado && "text-decoration-line-through"}`}>{descripcion}</p>
            <div className="d-flex gap-2"> {/*AL activar flexbox se puede utilizar GAP, esta es una SEPARACION entre elementos(tambien puede utilizarse con GIRD) */}
                <button onClick={()=>deleteTarea(id)} className="btn btn-sm btn-danger">Eliminar</button> {/*btn-sm es el tamaño, nos llega el metodo eliminar, se le envia el id al hacer click(id desestructurado del objeto tarea), se utiliza una funcion flecha para que no se ejecute hasta dar el click */}
                <button onClick={()=>updateTareas(id)} className={`${estado?"btn btn-sm btn-warning" : "btn btn-sm btn-success"}`}>{estado? "Deshacer":"Realizado"}</button> {/*Nos llega el metodo actualizar, se le envia el id al hacer click(id desestructurado del objeto tarea), se utiliza una funcion flecha para que no se ejecute hasta dar el click */}
                {/*Usamos las {} para utilizar los operadores ternarios y comprobar si devuelve un booleano de como es el estado (si true o false) */}
            </div>
        </div>
        {/*Badge Es una mini etiqueta para mostrar estados o resaltar cosas*/}
        <span className="badge text-bg-primary ">{prioridad && "Prioritario"}</span> {/* Dentro de las {} de la iteracion se evalia en cada caso si prioridad es true, por eso luego de prioridad se ponen los &&(SE EVALUA si es TRUE), si es TRUE CONTINUA mostrando el texto, si es FALSO sale */}
       </div>
        }</li> //Las listas iteradas simpre debe pasarsele una key o index del objeto del arreglo como atributo(en este caso viene indirectamente desde la etiqueta en el componente padre), llega por canda iteracion del map 1 titulo

}

export default Tarea;


