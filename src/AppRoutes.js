import { Routes, Route } from 'react-router-dom';
import Inicio from '../src/pages/Inicio';
import Galeria from '../src/pages/Galeria';
import { DetalleObra } from './components/DetalleObra';
import Registro from './pages/Registro';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';



export default function AppRoutes() {

    return (
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/galeria" element={<Galeria/>}/>  
        <Route path="/galeria/:id" element={<DetalleObra/>}/> 
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
    </Routes>  
    );
}