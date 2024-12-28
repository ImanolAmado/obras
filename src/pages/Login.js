import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function Login(){

const navigate = useNavigate();
const [errorLogin, setErrorLogin] = useState("");
const [hacerLogin, setHacerLogin] = useState(false);
const [formularioLogin, setFormularioLogin] = useState(
    {     
     email: "",
     password: ""
    }
);

let logueado = false;

if (localStorage.getItem("miToken")){   
    logueado = true;
}

useEffect(() => {

    // Para evitar que se ejecute al renderizar la página
    if (hacerLogin== false) return;

    axios.post("http://127.0.0.1:8000/api/login", formularioLogin)
    .then((response) => {        
        console.log(response.data.token);
        localStorage.setItem("miToken", response.data.token);         
        navigate(0);   
    })
    .catch((error) => {             
        if (error != "AxiosError: Request failed with status code 422")
        {  
        setErrorLogin("Email o password incorrectos"); 
        }          
    })   

    // reseteamos a "false" 
    .finally(() => {
        setHacerLogin(false);
    });

},[hacerLogin, formularioLogin]);



    function handleOnChange(event){
        const { value, name } = event.target;    
        setFormularioLogin({...formularioLogin,
        [name]:value });
    }


    function handleOnClick(event){
        event.preventDefault();        
        setHacerLogin(true);
    }


    if (!logueado) {

    return(

    <div>
    <br></br><br></br>
    <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
        <h4>Introduce datos de Login</h4>
    </div><br></br>

    <div className="row">
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
    <form>
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
        value={formularioLogin.email}>
        </input>        
    </div><br></br>   
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
        value={formularioLogin.password}>
      </input>
    </div> 
    <p className="textoError">{errorLogin}</p>
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6"></div>

    <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
            <button type="submit" className="btn btn-primary mt-5" onClick={handleOnClick}>Entrar</button>
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

    } else {
    
    return (
    <div>
        <br></br>
        <h5>La sesión se ha iniciado correctamente</h5>
    </div>    
    );

    }

}