import { Link } from "react-router-dom";


export default function Footer(){


return (

<section className="footerSeccion">  
  <footer id="footer1" className="text-center text-dark">   
    <div className="container p-4 pb-0">     
      <section className="primerFooter">
        <p className="d-flex justify-content-center align-items-center">
          <span className="me-3">Register for free</span>
          <Link to="/registro">
          <button data-mdb-ripple-init type="button" className="btn btn-outline-light btn-rounded">
            Sign up!
          </button>
          </Link>
        </p>
      </section>     
    </div>   
    <div id="footer2" className="text-center text-white p-3">      
      <p className="text-white">© 2025 Copyright: Personas con Arte</p>
    </div>   
  </footer> 
</section>

);

}