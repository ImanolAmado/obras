
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export function Logout(){

const navigate = useNavigate();
const [hacerLogout, setHacerLogout] = useState(true);
let miToken = "";

if(localStorage.getItem('miToken')){
miToken = localStorage.getItem('miToken');
console.log(miToken);
}

useEffect(() => {

    // Para evitar que se ejecute multiples veces
    if (hacerLogout== false) {
        return; 
    }
    

    axios.post("http://127.0.0.1:8000/api/logout",  {},
        {
            headers: {
              Authorization: `Bearer ${miToken}`,
            },
        }
    )
    .then((response) => {        
        console.log(response.data);
        localStorage.removeItem("miToken");      
        navigate(0);
                       
    })
    .catch((error) => {             
        if (error != "AxiosError: Request failed with status code 422")
        {  
        console.log(error);
       
        }          
    })
    
    .finally(() => {
       setHacerLogout(false);
    });

},[hacerLogout]);

return (

<div>
    <br></br>
<h5>La sesión se ha cerrado correctamente</h5>
</div>

);


}
