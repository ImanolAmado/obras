import { useState, useEffect} from "react";
import axios from "axios";
import { GaleriaObra } from "../components/GaleriaObra";


export default function Galeria(){

    const url = "http://127.0.0.1:8000/api";

    
    const [seleccion, setSeleccion] = useState("todos");
    const [obras, setObras] = useState([]);
            
    useEffect(() => {
        axios 
          .get(url + "/obras/" + seleccion)
          .then((response) => {            
            console.log(response.data);
            setObras(response.data);
          })
          .catch((error) => {
            console.error("Error: " + error.message);
          });
        
        }, [seleccion]); 
               
        
        function handleOnChange(event){           
            setSeleccion(event.target.value);               
        }

    return (

<div>
    <div className="altura"></div> 
    <div className="row mt-2">
    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">      
        <select id="selectorFiltro" 
                name="selectorFiltro"
                className="form-select"                 
                aria-label="Default select example"
                onChange={handleOnChange}>
            <option value="todos">Todos</option>
            <option value="igualdad sexos">Igualdad sexos</option>
            <option value="diversidad cultural">Diversidad cultural</option>
            <option value="integración personas con discapacidad intelectual">Integración personas con discapacidad intelectual</option>
            <option value="integración personas con discapacidad física">Integración personas con discapacidad física</option>
            <option value="comunidad LGTBI">Comunidad LGTBI</option>            
        </select>
    </div>
    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
    </div>
    </div>
    <div className="row d-flex">       
        {obras.map((obra) => ( <GaleriaObra key={obra.id} obra={obra}></GaleriaObra>))}   
    </div>
    <div className="altura2"></div>
</div>
    );
}