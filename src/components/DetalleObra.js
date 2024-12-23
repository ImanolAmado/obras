import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export function DetalleObra(){

    const uri = "http://127.0.0.1:8000/api";
    const { id } = useParams();
    const [obra, setObra] = useState("");


    useEffect(() => {
        axios 
          .get(uri + "/obras/todos/" + id)
          .then((response) => {            
            console.log(response.data);
            setObra(response.data);       

          })
          .catch((error) => {
            console.error("Error: " + error.message);
          });
        
        }, []); 



return(

    <div>
        <h3>Obra con Id:{id}</h3>
        <h5>Categoria:{" " + obra.categoria}</h5>
        <p>Descripción: {" " + obra.descripcion}</p>
        <img src={obra.imagen} alt="foto obra"></img>
    </div>
);


}