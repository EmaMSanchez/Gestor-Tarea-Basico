import { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import Tareas from './components/Tareas'
import Swal from 'sweetalert2'

const estadoInicialTareas =JSON.parse(localStorage.getItem("tareas")) || []; //-> Arreglo de tareas(arreglo de objetos), este se guarda en LOCAL STORAGE(BD local de buscador)
//Al iniciar se traen los datos existentes en el local storage para llenar nuestro arreglo de datos con getItem y el nombre de la llave de los datos,luego se transforma el JSON con parse, para que el objeto lo transforme JS, si esta vacio, se inicializa como arreglo vacio



 function App() {
  
  const[tareas,setTareas] = useState(estadoInicialTareas) //Tareas contiene un arreglo de objetos
 
 useEffect(()=>{ //Use efect es un Hook que se renderiza al inicio, sin embargo se le puede determinar que renderice cada vez que sucede algo(sirve para traer informacion de las BD)
  localStorage.setItem("tareas", JSON.stringify(tareas)) //Con local storage se le dice que guarde la informacion en la BD local del buscador, usando el metodo setItem(guardar item con un nombre), luego el nombre de lo almacenado en este caso tareas(es un nombre key ,puede ser otro) y por ultimo el objeto, arreglo o dato a GUARDAR
 //Local Storage SOLO GUARDA STRINGS, por eso se lo pasa a un objeto JSON con el metodo STRINGIFY, que transforma el OBJETO, ARREGLO, ETC en JSON
},[tareas]) // En los [] se le puede determinar que renderice cada vez que se ACTUALICEN las TAREAS(sirve para traer informacion de las BD)
 
  //Es mejor para comunicar el formulario con los datos trabajarlo (procesarlos) en el componente que envuelve y comunicar a travez de props ambos componentes(ingresar datos, guardar datos), 

  //Agregar Tarea
  const addTarea = (tarea) =>{ //Nos llega la tarea del Formulario
    setTareas([...tareas, tarea]); //Se setea las el arreglo de tareas proveniente de la base de datos(estadoInicial en este caso) y se le agrega ademas la nueva tarea a el arreglo(es un arreglo de objetos por eso el [])
  };

  //Eliminar Tarea
  
  const deleteTarea = (id) =>{ //Nos llega  el id para eliminar el elemento
    const newAreggloDeTareas = tareas.filter(tarea => tarea.id !== id) //El nuevo arreglo es el arreglo normal con el FILTER aplicado, este itera(recorre) igual que el map(separa por componente y guarda en el arreglo exeptuando aquel que coincida con el id a travez de una funcion flecha)
    Swal.fire({ //Agregar alerta, en caso afirmativo se elimina y actualiza BD
      title: 'Quieres eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Tarea Borrada!',
          'Lista de tareas actualizada.',
          'success'
        )
        setTareas(newAreggloDeTareas); //Se setea el arreglo de objetos tarea con la tarea filtrada
      }
      return
    })
  
  
  }

  const ordenarTareas = (arregloDeTareas) =>{ //.sort es un ordenador a travez de un booleano, con el recuperaremos unarreglo de tareas
    return arregloDeTareas.sort((tarea1,tarea2) =>{ //sort compara 2 variables, conteniendo una funcion flecha
      if(tarea1.prioridad === tarea2.prioridad) return 0 //Si la prioridad de la tarea es true = que la segunda, deja la posicion igual
      if(tarea1.prioridad) return -1 //Si tarea1 tiene prioridad en la comparacion la posiciona mas ARRIBA(antes) en el arreglo
      if(!tarea1.prioridad) return 1 //Si tarea1 NO tiene prioridad en la comparacion la posiciona mas ABAJO(despues) en el arreglo
    })
  } 

//Actualizar Tarea
const updateTareas = (id) =>{ //Nos llega el id
  const newAreggloDeTareas = tareas.map(tarea =>{ //Se mapea las tareas y se itera cada tarea
    if (tarea.id=== id) { //Si el id coincide con el id que nos llega
      tarea.estado = !tarea.estado
    }
    return tarea //Se retorrna la tarea si no encuentra el id
  })
  setTareas(newAreggloDeTareas) //Se setea tareas con el nuevo arreglo
}

  return (
   
    <div className='container mb-2'>
    <h1 className="my-5">Formulario</h1>
     <Formulario addTareaa={addTarea} /> {/*Le enviamos la funcion a el formulario para capturar los datos y devolverlo(llamar a la funcion dentro del componente) */}
     <Tareas tareas={ordenarTareas(tareas)} deleteTarea={deleteTarea} updateTareas={updateTareas}/> {/*Se le manda como propiedad a el componente tareas el arreglo de objetos, para mostrarlos en una lista, tambien se envian los metodos que aplique*/}
    {/*Al actualizar las tareas en el REnderizado se le pasa las tareas ordenadas(se ejecuta al inicio y a tareas le llega ya ordenadas por eso no se pone en una funcion flecha) */}
    </div>

  );
}

export default App
