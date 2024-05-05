import React, { useState } from 'react';
import Container from './Container/Container';

const AccessibilityBar = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const openEditor = () => {
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false); 
  };

  return (
    <div style={{ zIndex: 9999, marginTop: "1rem", display: "flex", justifyContent: "center" }}>
       <nav className="navbar navbar-expand-lg" style={{ borderRadius: "30px", width: "50vh", height: "7vh", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{color: "#036EFD", fontSize: "20px", fontWeight: "bold" }}>Accessibility <span style={{color:"#EC7A6F"}}>Bar</span></a>
          &nbsp;  &nbsp;  &nbsp;
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link"><i className="fa-solid fa-camera-retro" style={{color: "#808080" , scale:"1.5"}} ></i></a>
              </li>
              &nbsp; &nbsp; 
              <li className="nav-item">
                <a className="nav-link"><i className="fa-solid fa-eraser" style={{color: "#808080" , scale:"1.5"}} ></i></a>
              </li>
             &nbsp; &nbsp;
              
              <li className="nav-item">
                <a className="nav-link"><i className="fa-solid fa-pen-to-square" style={{color: "#808080" , scale:"1.5"}}  onClick={openEditor} ></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isEditorOpen && <Container onClose={closeEditor} />}
    </div>
  );
}

export default AccessibilityBar;
