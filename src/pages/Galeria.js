import { ObrasContext } from "../components/ObrasProvider.js";
import { useState, useContext} from "react";




export default function Galeria(){

    const { obras, setObras } = useContext(ObrasContext);
    const { endpoint, setEndPoint } = useContext(ObrasContext);


    function handleOnChange(){

    }


    function handleOnClick(){
       setEndPoint("obras/1");
      

    }



    return (

    <div>
       
    <div className="row">
    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">      
        <select id="selectorFiltro" 
                className="form-select"                 
                aria-label="Default select example"
                onChange={handleOnChange}>
            <option value="todos">Todos</option>
            <option value="realismo">Realismo</option>
            <option value="abstrato">Abstrato</option>
            <option value="pop">Pop</option>
            <option value="surrealista">Surrealista</option>
            <option value="impresionismo">Impresionismo</option>
            <option value="expresionismo">Expresionismo</option>
        </select>
    </div>
    <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10">
        <button onClick={handleOnClick} className="boton btn btn-primary" >Filtrar</button>
    </div>
    </div>
    
        <ul>
        {obras.map((obra) => ( 
            <li key={obra.id}>{obra.titulo}</li>))}
        </ul>
    </div>

    );
}