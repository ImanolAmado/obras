import PerfilUsuario from "../components/PerfilUsuario";
import { Link } from "react-router-dom";


export default function Perfil(){

let perfil = PerfilUsuario();

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


}