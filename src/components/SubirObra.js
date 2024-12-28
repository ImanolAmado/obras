import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



export default function SubirObra(){

const navigate = useNavigate();
const [errorTitulo, setErrorTitulo] = useState("");
const [errorDescripcion, setErrorDescripcion] = useState("");
const [errorImagen, setErrorImagen] = useState("");
const [correcto, setCorrecto ] = useState(false);
const [formularioObra, setFormularioObra] = useState(
    {
        titulo:"",
        descripcion:"",
        categoria:"igualdad sexos",
        estado: "aprobada",
        imagen: ""
    }
);

const miToken = localStorage.getItem("miToken");

useEffect(() => {

    // Evitar que se ejecute continuamente al renderizar
    if(correcto==false){
      return;
    }
  
      axios.post("http://127.0.0.1:8000/api/obras", formularioObra,
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
      )   

      .then((response) => {        
          console.log(response.data); 
          window.alert("Obra subida correctamente");
          navigate(0);         
      })
      .catch((error) => {           
          console.log(error);                   
      })
  
      .finally(() => {
        setCorrecto(false);
      });
  
  },[correcto, formularioObra]);
  



function handleOnChange(event){

    const { name, value } = event.target;
    setFormularioObra({...formularioObra,
        [name] : value }  );
}



function handleOnClick(event){
    event.preventDefault();
    
    let tituloValido = true;
    let descripcionValido = true;
    let imagenValido = true;        

  // valida nombre
  tituloValido=validarTitulo(formularioObra.titulo);
  // valida descripción
  descripcionValido=validarDescripcion(formularioObra.descripcion);
  // valida url imagen
  imagenValido=validarImagen(formularioObra.imagen);

  
    if(tituloValido && descripcionValido && imagenValido){
        setCorrecto(true);
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


// Si existen datos en localStorage, el usuario está
// autenticado
if (localStorage.getItem("miToken")){
return (
<div>
    <br></br>
<div className="row">
    <div className="col-12">
        <h5>Formulario obra</h5>
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
                value={formularioObra.titulo}>
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
                value={formularioObra.descripcion}>
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
                value={formularioObra.imagen}
                onChange={handleOnChange}>
            </input>
            <p className="textoError">{errorImagen}</p>
            <div id="vistaPrevia">
                <img id="imagenPrevia"
                width={640}
                height={480}                
                src={formularioObra.imagen}>                    
                </img>
            </div>
            </div>
            <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
            <button type="submit" className="btn btn-primary mt-5" onClick={handleOnClick}>Subir</button>
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Link to={"/"}>
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
<div className="altura2"></div>
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