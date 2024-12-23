import { useState } from "react";


export default function Registro(){

const [formulario, setFormulario] = useState(
    {
     name: "",
     email: "",
     password: ""
    }

);


function handleOnChange(event){

    const { value, name } = event.target;

    console.log("El evento viene de " + event.target.name);

    setFormulario({...formulario,
        [name]:value });


}



return(

<div className="row">
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
    <form>
    <div className="form-group">
        <br></br>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" 
            className="form-control" 
            id="nombre" 
            name="nombre" 
            placeholder="name"
            onChange = {handleOnChange}
            value={formulario.name}>
            
        </input>
    </div>
    <div className="form-row">   
    <br></br>
      <label htmlFor="email">Email</label>
      <input type="email" 
        className="form-control" 
        id="email" 
        name="email" 
        placeholder="Email"
        onChange = {handleOnChange}
        value={formulario.email}>

        </input>
    </div>
    <div className="form-row">
    <br></br>
      <label htmlFor="password">Password</label>
      <input type="password" 
        className="form-control" 
        id="password"
        name="password" 
        placeholder="Password"
        onChange = {handleOnChange}
        value={formulario.password}>

      </input>
    </div> 
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6"></div>
    </form>
    </div>

</div>
);


}