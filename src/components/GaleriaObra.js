import { Link } from "react-router-dom";

export function GaleriaObra({obra}){

return(

<div className="card mt-3 mx-3" style={{ width: "350px" }}>
  <img src={obra.imagen} height={240} className="card-img-top" alt="imagen obra"></img>
  <div className="card-body">
    <h5 className="card-title">{obra.titulo}</h5>
    <p>Categoria: {obra.categoria}</p>
    <p className="card-text">{obra.descripcion}</p>
    <Link to={"/galeria/" + obra.id}>
    <button className="btn btn-primary">Ver detalles</button>
    </Link>
  </div>
</div>

);

}