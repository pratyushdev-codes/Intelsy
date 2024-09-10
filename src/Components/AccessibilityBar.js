import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Container from './Container/Container';
import { Navigate , useNavigate} from 'react-router-dom';




const AccessibilityBar = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const reactNavigator = useNavigate();

  const openEditor = () => {
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
  };


  async function  logoutUser(){
    reactNavigator("/")
 
   }
  const snapShot = () => {
    html2canvas(document.body).then(canvas => {
      const tempLink = document.createElement('a');
      tempLink.href = canvas.toDataURL();
      tempLink.setAttribute('download', 'code.png');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    });
  };

  return (
    <div id="capture" style={{ zIndex: "100", marginTop: "1rem", display: "flex", justifyContent: "center" }}>
      <nav className="navbar navbar-expand-lg" style={{ borderRadius: "30px", height: "7vh", zIndex: "100", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: "#036EFD", fontSize: "20px", fontWeight: "bold" }}>
            <i className="fa-brands fa-gripfire" style={{ scale: "1.2" }}></i> &nbsp;
            <span style={{ background: 'linear-gradient(-100deg, #036EFD, #EC7A6F, #EC7A6F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Accessibility Bar
            </span>
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <a className="nav-link"><i className="fa-solid fa-camera-retro" onClick={snapShot} style={{ color: "#808080", scale: "1.5" }}></i></a>
              </li>

              <li className="nav-item mx-2">
                <a className="nav-link"><i className="fa-solid fa-pen-to-square" style={{ color: "#808080", scale: "1.5" }} onClick={openEditor}></i></a>
              </li>

              <li className="nav-item mx-2">
                <a className="nav-link"><i className="fa-solid fa-cubes" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{
                  background: "linear-gradient(90deg, #EC7A6F, #036EFD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  scale: "1.5",
                }}></i></a>
              </li>

              {/* User image li ta */}
              <li className="nav-item dropdown mx-2">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="navbarDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <img
      src="../images/gradient.png"
      style={{ borderRadius: "50%", width: "25px", height: "25px" }}
      alt="Dropdown"
    />
  </a>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
  <li><a className="dropdown-item" style={{fontWeight:"bolder", color:"#036EFD"}}>Current Status : Active </a></li>
    <li>
      <a
        className="dropdown-item      my-2"
        href="https://wa.me/?text=Hey%2C%20join%20me%20for%20a%20coding%20session%20on%20Intelsy%20IDE%20intelsy.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
   
      >
        Share via WhatsApp <i class="fa-brands fa-whatsapp"></i>
      </a>
    </li>
    {/* Twitter  */}
    <li>
      <a
        className="dropdown-item my-2"
        href="https://twitter.com/intent/tweet?text=Hey%2C%20join%20me%20for%20a%20coding%20session%20on%20Intelsy%20IDE%20https%3A%2F%2Fintelsy.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Share via Twitter <i class="fa-brands fa-x-twitter"></i>
      </a>
    </li>
    <li><a className="dropdown-item" onClick={logoutUser}>Logout</a></li>

  </ul>
</li>
            </ul>
          </div>

          <div className="modal" style={{ zIndex: "10000" }} id="exampleModal" tabIndex="-100" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color:"black"}}>Intelsy Remote Code Execution Engine</h1>
                 
                </div>
                <div className="modal-body " style={{color:"#036EFD"}}>
                <i className="fa-solid fa-shield-halved mx-2"></i> Your code is securely being executed on Intelsy's Native Remote Code Execution Engine.
                </div>
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  style={{borderRadius:"20px"}}>Close</button> */}
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{borderRadius:"20px"}}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isEditorOpen && <Container onClose={closeEditor} />}
    </div>
  );
};

export default AccessibilityBar;