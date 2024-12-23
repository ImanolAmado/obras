import { Routes, Route } from 'react-router-dom';
import Inicio from '../src/pages/Inicio';
import Galeria from '../src/pages/Galeria';



export default function AppRoutes() {

    return (
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/galeria" element={<Galeria/>}/>   
    </Routes>  
    );
}