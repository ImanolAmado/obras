import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



export default function ModificarObra(){
 
    const navigate = useNavigate();
    const [errorTitulo, setErrorTitulo] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");
    const [errorImagen, setErrorImagen] = useState("");    
    const [obra, setObra] = useState({});
    const [llamadaRealizada, setLlamadaRealizada] = useState(false);
    let miToken = "";
   
      
    // Llamada Api para descargar Obra
        
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
              
              setLlamadaRealizada(true);             
              setObra(response.data[0]); 
              
          })
          .catch((error) => {           
              console.log(error);                   
          });      
           
      },[llamadaRealizada]);  

    
    
 
// Si el usuario está autenticado...
if(localStorage.getItem('miToken')){

miToken = localStorage.getItem('miToken');


function handleOnChange(event){
    const { name, value } = event.target;
    setObra({...obra,
        [name] : value }  );
}



    function handleOnClick(event){
        event.preventDefault();
        
        let tituloValido = true;
        let descripcionValido = true;
        let imagenValido = true;        
    
      // valida nombre
      tituloValido=validarTitulo(obra.titulo);
      // valida descripción
      descripcionValido=validarDescripcion(obra.descripcion);
      // valida url imagen
      imagenValido=validarImagen(obra.imagen);    
      
        if(tituloValido && descripcionValido && imagenValido){
           envioObra();
        }
    }
    
    // Función para validar el título del formulario
    function validarTitulo(titulo){
        if(titulo.length < 5 || titulo.length > 50){
          setErrorTitulo("El título debe tener entre 5 y 50 caracteres");
        return false;
        } else {
          setErrorTitulo("");
          return true;
        }   
    }
    
    // función para validar descripción del formulario
    function validarDescripcion(descripcion){
        if(descripcion.length < 10 || descripcion.length > 200){
            setErrorDescripcion("La descripción debe tener entre 10 y 200 caracteres");
          return false;
        } else {
            setErrorDescripcion("");
            return true;
        }   
    }
    
    // función para validar el el enlace de la imagen del formulario
    function validarImagen(imagen){
        if(!imagen.includes("https://")){
          setErrorImagen('El enlace debe de contener "https://"');
        return false;
        } else {
          setErrorImagen("");
          return true;
        } 
    }


// Función que envía la obra ya con las modificaciones a la API
    function envioObra(){
        axios.put("http://127.0.0.1:8000/api/updateObras/", obra,
            {
                headers: {
                  Authorization: `Bearer ${miToken}`,
                },
            }
          )     
          .then((response) => {                        
              window.alert("La obra se ha actualizado correctamente");
              navigate("/gestionObra");      
          })
          .catch((error) => {           
              console.log(error);                   
          });        

    }
   
// Pintamos en pantalla los datos de las obras
return (
<div>   
    <div className="altura"></div>
    <div className="row">
    <div className="col-12">
        <h5>Modificar obra</h5>
    </div>
</div>
<div className="row">
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
        <form>
            <div className="form-row">
            <label htmlFor="titulo">Título</label>
            <input className="form-control"
                type="text" 
                name="titulo" 
                id="titulo"
                required
                minLength={5}
                maxLength={50}                
                onChange={handleOnChange}
                value={obra.titulo}>
            </input>
            <p className="textoError">{errorTitulo}</p>
            <label htmlFor="decripcion">Descripcion</label>
            <textarea className="form-control"                
                name="descripcion"
                id="descripcion"
                rows={4}
                cols={10}
                required
                minLength={10}
                maxLength={200}
                onChange={handleOnChange}
                value={obra.descripcion}>
            </textarea>
            <p className="textoError">{errorDescripcion}</p>
            <label htmlFor="categoria">Categoría</label>
            <select className="form-select"
                id="categoria" 
                name="categoria"     
                required                            
                aria-label="Default select example"
                onChange={handleOnChange}>            
            <option value="igualdad sexos">Igualdad sexos</option>
            <option value="diversidad cultural">Diversidad cultural</option>
            <option value="integración personas con discapacidad intelectual">Integración personas con discapacidad intelectual</option>
            <option value="integración personas con discapacidad física">Integración personas con discapacidad física</option>
            <option value="comunidad LGTBI">Comunidad LGTBI</option>            
            </select>
            <label htmlFor="imagen">Imagen</label>
            <input className="form-control"
                type="text"
                id="imagen"
                name="imagen"
                required
                value={obra.imagen}
                onChange={handleOnChange}>
            </input>
            <p className="textoError">{errorImagen}</p>
            <div id="vistaPrevia">
                <img id="imagenPrevia"
                width={640}
                height={480}                
                src={obra.imagen}>                    
                </img>
            </div>
            </div>
            <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
            <button type="submit" className="btn btn-primary mt-5" onClick={handleOnClick}>Modificar</button>
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Link to={"/gestionObra"}>
            <button className="btn btn-secondary mt-5">Volver</button>
            </Link>
        </div>
        <div className="col-sm-12 col-md-7 col-lg-8 col-xl-8">   
        </div>
    </div>
        </form>        
    </div>
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">        
    </div>
</div>
</div>
);

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