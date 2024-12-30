import axios from "axios";
import { useEffect, useState } from "react";


export default function PerfilUsuario(){

let miToken = "";

if(localStorage.getItem('miToken')){
    miToken = localStorage.getItem('miToken');    
}

const [perfil, setPerfil] = useState({});
const [llamadaRealizada, setLlamadaRealizada] = useState(false);


useEffect(() => {   

    if(llamadaRealizada){
        return;
    }
  
    axios.get("http://127.0.0.1:8000/api/perfil",
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
      )   

      .then((response) => {                  
          setLlamadaRealizada(true);
          setPerfil(response.data);   
      })
      .catch((error) => {           
          console.log(error);                   
      });      
       
  },[]);  

return (perfil);

}