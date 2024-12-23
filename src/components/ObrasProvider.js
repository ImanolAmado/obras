

import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const ObrasContext = createContext();

export const ObrasProvider = ({children}) => {  

    const uri = "http://127.0.0.1:8000/api";

    const [obras, setObras] = useState([]);
    const [endPoint, setEndPoint] = useState('obras');

    useEffect(() => {
        axios 
          .get(uri + "/" + endPoint)
          .then((response) => {            
            console.log(response);
            setObras(response.data);

          })
          .catch((error) => {
            console.error("Error: " + error.message);
          });
        
        }, [endPoint]);
   

    return (
        <ObrasContext.Provider value={{obras, setObras, endPoint, setEndPoint}}>
            {children}
        </ObrasContext.Provider>
    );
}