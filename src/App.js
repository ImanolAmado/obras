import './App.css';
import AppRoutes from './AppRoutes';
import Menu from './components/Menu';
import Cabecera from './components/Cabecera';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Cabecera/>
      <Menu/>
        <div className="cuerpo">
        <div className="container">       
        <AppRoutes/>
        </div>
      <Footer></Footer>
        </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
