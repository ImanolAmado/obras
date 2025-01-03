import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function FormularioVotacion({id}){

    const navigate = useNavigate();
    const [obraNoVotada, setObraNoVotada] = useState(false);
    const [voto, setVoto] = useState(
        {
          voto:"1",
          id:id
        });

    let miToken="";
      // Si el usuario está autenticado...
    if(localStorage.getItem('miToken')){ 
        miToken=localStorage.getItem('miToken');
    }
            
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/voto/" + id,
            {
                headers: {
                  Authorization: `Bearer ${miToken}`,
                },
            }    
        )
        .then((response) => {       
            
            if(response.data===true){
            setObraNoVotada(false);                
            } else setObraNoVotada(true);                         
        })
        .catch((error) => {
        console.error("Error: " + error.message);
        });
            
        }, [id, miToken]); 


// Función onClick que envía voto a la API
function handleOnClick(event){    
    event.preventDefault(); 

    if(localStorage.getItem('miToken')){
      let miToken = localStorage.getItem('miToken');
     
      axios.post("http://127.0.0.1:8000/api/voto", voto,
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
      )
      .then((response) => {        
          
          window.alert("Voto emitido correctamente");  
          setObraNoVotada(false);            
      })
      .catch((error) => {           
          console.log(error);   
          window.alert("Voto no emitido");                 
      });      
      
      
      
     
    // Si usuario no tiene token en localStorage...
    } else {
      window.alert("Lo siento, regístrate para votar");
    }      
  }

  // Función que recoge los cambios en el select de votación
  function handleOnChange(event){
    setVoto({voto:event.target.value, id: id});      
  }


if(localStorage.getItem('miToken')){ 

return (
<div>
<div className="row">
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">    
      <label htmlFor="voto">Vota tu obra preferida</label> 
    </div>
  </div><br></br>  

{ obraNoVotada ?
<div className="row">
  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">    
    <form id="formularioVoto">  
    <div className="form-group d-flex mx-3">  
        <label htmlFor="voto"></label>        
        <select className="form-select" 
          name="voto" 
          id="voto"
          value={voto.voto}
          onChange={handleOnChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>        
        </select>    
        <button type="button" className="btn btn-primary mx-2" onClick={handleOnClick}>Emitir voto</button>
    </div>    
    </form>
  </div>
</div>  : <div><p>Obra votada</p><img src="/hecho.png" width="100px" alt="foto icono"></img></div> }
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