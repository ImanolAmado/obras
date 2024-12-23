import './App.css';
import AppRoutes from './AppRoutes';
import Menu from './components/Menu';
import Cabecera from './components/Cabecera';
import { BrowserRouter } from 'react-router-dom';
import { ObrasProvider } from './components/ObrasProvider';

function App() {
  return (
    <div className="App">
      <ObrasProvider>
      <BrowserRouter>
      <Cabecera/>
      <Menu/>
        <div className="container">       
        <AppRoutes/>
        </div>
      </BrowserRouter>
      </ObrasProvider>     
    </div>
  );
}

export default App;
