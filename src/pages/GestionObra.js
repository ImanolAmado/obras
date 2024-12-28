import SubirObra from "../components/SubirObra";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


export default function GestionObra(){


let miToken = "";

if(localStorage.getItem('miToken')){
    miToken = localStorage.getItem('miToken');    
}

const navigate = useNavigate();
const [obra, setObra] = useState({});
const [llamadaRealizada, setLlamadaRealizada] = useState(false);
const [existeObra, setExisteObra] = useState(false);


useEffect(() => {   

    if(llamadaRealizada){
        return;
    }
  
    axios.get("http://127.0.0.1:8000/api/userObra" ,
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
      )   

      .then((response) => {    
         
          if (response.data.length > 0){
            setExisteObra(true);
          } else {
            setExisteObra(false);
           
          }
          setLlamadaRealizada(true);
          setObra(response.data[0]); 
          
      })
      .catch((error) => {           
          console.log(error);                   
      });      
       
  },[]);  
 

// Si existen datos en localStorage, el usuario está
// autenticado
if (localStorage.getItem("miToken")){

if(existeObra) {



// Función para eliminar una obra
function EliminarObra(id){    
        axios.delete("http://127.0.0.1:8000/api/deleteObras/" + id ,
          {
              headers: {
                Authorization: `Bearer ${miToken}`,
              },
          }
        )     
        .then((response) => {        
            console.log(response.data);    
            window.alert("Obra eliminada correctamente");
            navigate(0);      
        })
        .catch((error) => {           
            console.log(error);                   
        });        
}



function handleOnClick(){
    window.alert("¿Deseas eliminar obra?");
    EliminarObra(obra.id);      
}

 
return (
<div>
    <div className="altura"></div>
    <h4>Este usuario tiene una obra y lo mostraré aquí</h4>
    <h5>Obra con Id:{obra.id}</h5>
        <h5>Título: {" " + obra.titulo}</h5>
        <h5>Categoria:{" " + obra.categoria}</h5>
        <p>Descripción: {" " + obra.descripcion}</p>
        <img src={obra.imagen} width="300px" alt="foto obra"></img>
    <div className="altura"></div>
  
    <button className="btn btn-primary" onClick={handleOnClick}>Eliminar</button>
</div>
);

} else {

return (
<div>
    <div className="altura"></div>
    <p>Por favor, completa el siguiente formulario para subir una obra</p>
    <SubirObra></SubirObra>
</div>
);

}

} else {

    // El usuario no está autenticado
return (
    <div>
        <br></br>
       <h5>No tienes autorización para visualizar esta página</h5>
    </div>
    );
    
    } 

}