import { useState, useEffect } from "react";
import axios from "axios";
import { GaleriaObra } from "../components/GaleriaObra";


export default function Inicio(){        
  
    const [obras, setObras] = useState([]);      
            
    useEffect(() => {
        axios 
          .get("http://127.0.0.1:8000/api/masVotadas")
          .then((response) => {            
            console.log(response.data);
            setObras(response.data);
          })
          .catch((error) => {
            console.error("Error: " + error.message);
          });
        
        }, []);     

    return (

<div>
    <div className="altura"></div>
    <div className="row">
        <div className="col-12">        
            <h4>Caminos hacia la inclusión</h4>
            <p>Regístrate y participa en nuestro concurso público "Caminos hacia
            la inclusión". Invitamos a artistas de todas las edades a presentar obras 
            que promuevan la inclusión en sus múltiples formas. Desde la integración de
            personas con discapacidades, la aceptación de la diversidad cultural, étnica
            y lingüística, hasta la representación de comunidades marginadas. Las obras
            deben transmitir un mensaje positivo sobre cómo construir una sociedad más
            inclusiva y respetuosa.</p>
            <h6>¡Regístrate y participa!</h6>
        </div>
        <div className="altura"></div>
        <div><h5>Obras más votadas:</h5></div>
    </div>
    <div className="row">
        <div className="col-12 d-flex">            
            {obras.map((obra) => ( <GaleriaObra key={obra.id} obra={obra}></GaleriaObra>))}
        </div>
    </div>
</div>
    );
}