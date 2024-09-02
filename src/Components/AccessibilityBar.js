import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import Container from './Container/Container';

const AccessibilityBar = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const openEditor = () => {
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
  };

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
            </ul>
          </div>

          <div className="modal" style={{ zIndex: "10000" }} id="exampleModal" tabIndex="-100" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color:"black"}}>Intelsy Remote Code Execution Engine</h1>
                 
                </div>
                <div className="modal-body">
                  ...
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