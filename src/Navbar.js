import React from 'react';


function Navbar() {
 


  return (
    <div>    
      <nav className="navbar navbar-expand-lg bg-body-dark" style={{ position: "fixed", zIndex: "999", width: "100%" }}>
        <div className="container-fluid">
     
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">   
              <li className="nav-item">
                <a className="nav-link active mx-2"   style={{ fontFamily: "PT sans", color: "#036EFD", fontSize: "30px", fontWeight:"bolder",  background: 'linear-gradient(112deg, rgb(3, 110, 253), rgb(236, 122, 111), rgb(3, 110, 253)) text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} ><i className="fa-solid fa-terminal mx-2" style={{ color: '#036EFD' }}></i>Intelsy </a>
              </li>
              
              {/* <img src="./images/Intelsylogo.png" style={{ height: "45px", width: "53px"  , opacity:"0.8"}} alt="Logo" /> */}
              
             

             

              
            </ul>
            <div className="d-flex flex-column flex-lg-row">
            
            <button className="btn btn-glow mx-2"  onClick={() => window.location.href = "https://linktr.ee/pratyush.birole"}  style={{ borderRadius:"20px", backgroundColor:"#EFF3F6", color:"#808080", fontWeight:"bold"}}>Developer Details <i className="fa-solid fa-copyright mx-1"></i></button>

            
            <a href="https://github.com/pratyushdev-codes" target="_blank" rel="noopener noreferrer" className="btn btn-primary mx-2" style={{ borderRadius: "20px",  background: "linear-gradient(140deg,  rgb(208 218 231), #036EFD)", fontWeight: "bold" }}>Contact Us</a>

      
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;