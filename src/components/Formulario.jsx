import Swal from 'sweetalert2'
import { useState } from "react";

const Formulario = ({addTareaa}) =>{ //Recive el atributo addTarea (funcion de el formulario padre) siempre con {} es una prop

 

 const [tarea, setTarea] = useState({ //-->Arreglo de objetos

    titulo: "" ,
    descripcion: "",
    estado: "completado",
    prioridad: false

 })
  
 const {titulo, descripcion, estado, prioridad} = tarea; 
  
  const handleEnviarDatos = (evento) =>{ 
        evento.preventDefault(); 
       
       
        
        if (!titulo.trim()  || !descripcion.trim()) { //trim() limpia los caracteres vacios, se valida que no esten vacios los campos luego de limpiar los caracteres(si devuelve true uno de los campos esta vacio entrando a la condicion !atributo es que es falso, si es verdad que es falso(esta vacio), devuelve un true)
            return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Complete la tarea!',
                    
                  });
                  
        }
             //Si no estan los campos vacios se setea con el nuevo valor, enviando el nuevo objeto a App, para que lo guarde en el nuevo formulario
            //Se construye el objeto a enviar, adecuando el objeto a la BD
            //Date.now() genera un numero aleatorio de id, se le agrega el id a el objeto
            //Se setean todos los datos que son iguales, exepto estado que es booleano en el arreglo de objetos
            //Se pasa el estado a booleano, si es igual a completado devuelve true, si no falso
              addTareaa({ 
             id: Date.now(), 
            ...tarea, 
           estado: estado === "completado" 
              })
                          Swal.fire({
                            position: 'center',
                         icon: 'success',
                         title: 'Tarea Agregada!',
                         showConfirmButton: false,
                         timer: 1500
  })
        
          
    };

    const handleProcesarDatos = (evento) =>{ 
        
        const {name, type, checked, value } = evento.target; 
     
      setTarea({...tarea,[name]:  type === "checkbox"? checked : value});
    }
   
    return(


<form onSubmit={handleEnviarDatos}> 
<input type="text" placeholder="Ingrese titulo" name="titulo" className="form-control mb-2" value={titulo} onChange={handleProcesarDatos}/> 
<textarea name="descripcion" className="form-control mb-2" placeholder="Ingrese Texto" value={descripcion} onChange={handleProcesarDatos}/> 
<select name="estado" className="form-select mb-2" value={estado} onChange={handleProcesarDatos}> 
    <option value="pendiente">Pendiente</option>    
    <option value="completado">Completado</option>  
</select> <br />
<div className="form-check mb-2">
<input type="checkbox" name="prioridad" className="form-check-input" id="inputCheck" checked={prioridad} onChange={handleProcesarDatos}/>  
<label htmlFor="inputCheck">Dar prioridad</label> 
</div>

<button type="submit" className="btn btn-primary mb-2">Agregar Tarea</button><br />
</form>
    )
}



export default Formulario;