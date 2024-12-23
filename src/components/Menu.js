import { Link } from 'react-router-dom';


export default function Menu(){

return (

<div className="row mx-4 mt-3">           
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
            </ul>  
        </div>       
        </nav>
    </div>                 
</div>       

);

}