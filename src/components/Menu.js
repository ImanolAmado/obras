import { Link } from 'react-router-dom';


export default function Menu(){

let miToken = "";
let logueado = false;

if (localStorage.getItem("miToken")){
    miToken = localStorage.getItem("miToken");
    logueado = true;
}
    

// Si el usuario está logueado, devuelve un menú y si no lo
// está, devuelve otro menú
if(!logueado) {
return (
<div id="menu" className="row mx-4 mt-3">        
    <div className="col-12">             
        <nav className="navbar navbar-expand-lg navbar-light bg-tertiary"> 
        <div>
            <button id="ham" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#miMenu" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>                    
        <div className="collapse navbar-collapse" id="miMenu" data-bs-theme="light">                        
            <ul className="navbar-nav"> 
            <li className="nav-item mx-2"><Link to="/" className="nav-link">Inicio</Link></li>
            <li className="nav-item mx-2"><Link to="/galeria" className="nav-link">Galería</Link></li>           
            <li className="nav-item mx-2"><Link to="/login" className="nav-link">Login</Link></li>
            <li className="nav-item mx-2"><Link to="/registro" className="nav-link">Registro</Link></li>                        
            </ul>  
        </div>       
        </nav>
    </div>   
    <div className='row'>
        <div className='col-12'>
        </div>        
    </div>           
</div>     

);

} else {

    // Menú para usuarios logueados
    return (
        <div id="menuLog" className="row mx-4 mt-3">        
            <div className="col-12">             
                <nav className="navbar navbar-expand-lg navbar-light bg-tertiary"> 
                <div>
                    <button id="ham" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#miMenu" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>                    
                <div className="collapse navbar-collapse" id="miMenu" data-bs-theme="light">                        
                    <ul className="navbar-nav"> 
                    <li className="nav-item mx-2"><Link to="/" className="nav-link">Inicio</Link></li>
                    <li className="nav-item mx-2"><Link to="/galeria" className="nav-link">Galería</Link></li> 
                    <li className="nav-item mx-2"><Link to="/galeria" className="nav-link">Subir obra</Link></li>
                    <li className="nav-item mx-2"><Link to="/logout" className="nav-link">Logout</Link></li>                       
                    </ul>  
                </div>       
                </nav>
            </div>   
            <div className='row'>
                <div className='col-12'>
                </div>        
            </div>           
        </div> 
    );

}



}