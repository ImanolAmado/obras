import PerfilUsuario from "../components/PerfilUsuario";
import { Link } from "react-router-dom";


export default function Perfil(){

let perfil = PerfilUsuario();


// Si existen datos en localStorage, el usuario está
// autenticado
if (localStorage.getItem("miToken")){

return (
<div>
<br></br>
<h4>Nombre:{" " + perfil.name}</h4>
<h4>Email:{" " + perfil.email}</h4>
<h4>Miembro desde: {" " + perfil.created_at }</h4>
<br></br><br></br>
<h3><Link to="/logout">Logout</Link></h3>
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