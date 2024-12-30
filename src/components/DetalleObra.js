import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormularioVotacion from "./FormularioVotacion";


export function DetalleObra(){

    const uri = "http://127.0.0.1:8000/api";
    const { id } = useParams();
    const [obra, setObra] = useState("");
    let existeToken = false;
    

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

    
        if(localStorage.getItem("miToken")){
          existeToken=true;
        }
    
return(
<>
  <div className="altura"></div>
  <div className="row">
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">      
        <h5>Obra Id:{" " + id}</h5>
        <h5>Titulo: {" " + obra.titulo}</h5>
        <h5>Categoria:{" " + obra.categoria}</h5>
        <p>Descripción: {" " + obra.descripcion}</p>
        <img src={obra.imagen} width="400px" alt="foto obra"></img>
    </div>
  </div>
  <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Link to={"/galeria"}>
            <button className="btn btn-secondary mt-5">Volver</button>
            </Link>
  </div><br></br>  
  {existeToken ? <FormularioVotacion id={id}/> : <p>Regístrate para poder votar</p>}
</>
);


}