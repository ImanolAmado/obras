import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Registro(){

const navigate = useNavigate();
const [errorEmail, setErrorEmail] = useState("");
const [errorPassword, setErrorPassword] = useState("");
const [errorNombre, setErrorNombre] = useState("");
const [correcto, setCorrecto] = useState(false);

const [formulario, setFormulario] = useState(
    {
     name: "",
     email: "",
     password: ""
    }
);



useEffect(() => {

  // Evitar que se ejecute al renderizar
  if(correcto==false){
    return;
  }

    axios.post("http://127.0.0.1:8000/api/register", formulario)
    .then((response) => {     
      window.alert('Registro correcto. Bienvenid@ a "Personas con arte"');
      navigate("/login");   
                
    })
    .catch((error) => {                
        setErrorEmail("Email ya existe en la base de datos");                  
    })

    .finally(() => {
      setCorrecto(false);
    });

},[correcto, formulario]);


function handleOnChange(event){

    const { value, name } = event.target;    
    setFormulario({...formulario,
        [name]:value });

}


function handleOnClick(event){
    event.preventDefault();
    
    let nombreValido = true;
    let emailValido = true;
    let passwordValido = true;
        

  // valida nombre
  nombreValido=validarNombre(formulario.name);
  
  // valida email
  emailValido=validarEmail(formulario.email);
  
  // valida password
  passwordValido=validarPassword(formulario.password);

  if(nombreValido && emailValido && passwordValido) {
  setCorrecto(true);   
  }
}


// Función para validar nombre del formulario
function validarNombre(nombre){
    if(nombre.length < 3 || nombre.length > 100){
      setErrorNombre("El nombre debe tener entre 3 y 100 caracteres");
    return false;
    } else {
      setErrorNombre("");
      return true;
    }   
  }


// función para validar email
function validarEmail(email){
    if(!email.includes('@')){
      setErrorEmail('El formato de email es incorrecto');
    return false;
    } else {
        if(email.length < 5 || email.length > 100){
            setErrorEmail("El email debe tener entre 5 y 100 caracteres");
          return false;
        } 
        else {
        setErrorEmail("");      
        return true;
        } 
    }
}


  // Función para validar nombre del formulario
function validarPassword(password){
    if(password.length < 6 || password.length > 10){
      setErrorPassword("El password debe tener entre 6 y 10 caracteres");
    return false;
    } else {
      setErrorPassword("");
      return true;
    }   
  }


// Si existen datos en localStorage, el usuario está
// autenticado
if (localStorage.getItem("miToken")){

return (
  <div>
      <br></br>
       <h5>Usuario ya registrado</h5>
  </div>
  );

} else {

return(

  <div>
  <br></br><br></br>
  <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
      <h4>Introduce datos de registro</h4>
  </div>

<div className="row">
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
    <form>
    <div className="form-group">
        <br></br>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            placeholder="name"
            required
            minLength={3}
            maxLength={100}
            onChange = {handleOnChange}
            value={formulario.name}>            
        </input>
    </div>
    <p className="textoError">{errorNombre}</p>
    <div className="form-row">       
      <label htmlFor="email">Email</label>
      <input type="email" 
        className="form-control" 
        id="email" 
        name="email" 
        required
        minLength={5}
        maxLength={100}
        placeholder="Email"
        onChange = {handleOnChange}
        value={formulario.email}>
        </input>        
    </div>
    <p className="textoError">{errorEmail}</p>
    <div className="form-row"> 
      <label htmlFor="password">Password</label>
      <input type="password" 
        className="form-control" 
        id="password"
        name="password" 
        required
        minLength={6}
        maxLength={10}
        placeholder="Password"
        onChange = {handleOnChange}
        value={formulario.password}>
      </input>
    </div> 
    <p className="textoError">{errorPassword}</p>
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6"></div>

    <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
            <button type="submit" className="btn btn-primary mt-5" onClick={handleOnClick}>Registrar</button>
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
</div>
</div>
);
}

}