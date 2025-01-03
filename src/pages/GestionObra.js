import SubirObra from "../components/SubirObra";
import { useNavigate, Link } from "react-router-dom";
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
    let respuesta=window.confirm("¿Deseas eliminar obra?");
    if(respuesta){
    EliminarObra(obra.id); 
    }    
}


return (
<div>
    <div className="altura"></div>
    <h4>Obra vinculada a la cuenta:</h4>    
        <h5>Título: {" " + obra.titulo}</h5>
        <h5>Categoria:{" " + obra.categoria}</h5>
        <p>Descripción: {" " + obra.descripcion}</p>
        <img src={obra.imagen} width="300px" alt="foto obra"></img>
    <div className="altura"></div>
  
    <button className="btn btn-danger" onClick={handleOnClick}>Eliminar</button>

    <Link to={"/modificarObra"}>
    <button className="btn btn-secondary mx-4" >Modificar</button>
    </Link>          
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