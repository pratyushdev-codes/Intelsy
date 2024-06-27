import React, { useState } from 'react';

import html2canvas from 'html2canvas';

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
      // Create a temporary link to download the image
      const tempLink = document.createElement('a');
      tempLink.href = canvas.toDataURL(); // Set the image URL to the canvas image
      tempLink.setAttribute('download', 'code.png'); // Set the download attribute with a filename
      document.body.appendChild(tempLink); // Append the link to the body
      tempLink.click(); // Simulate a click event to trigger the download
      document.body.removeChild(tempLink); // Clean up: remove the link from the body
    });
  };

  return (
    <div id="capture" style={{ zIndex: -100, marginTop: "1rem", display: "flex", justifyContent: "center" }}>
      <nav className="navbar navbar-expand-lg" style={{ borderRadius: "30px", width: "50vh", height: "7vh", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: "#036EFD", fontSize: "20px", fontWeight: "bold" }}><i className="fa-brands fa-gripfire"></i> &nbsp; Accessibility <span style={{ color: "#EC7A6F" }}>Bar</span></a>
       
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item my-2">
                <a className="nav-link"><i className="fa-solid  fa-camera-retro" onClick={snapShot} style={{ color: "#808080", scale: "1.5" }} ></i></a>
              </li>
              
              <li className="nav-item my-2">
                <a className="nav-link"><i className="fa-solid  fa-eraser" style={{ color: "#808080", scale: "1.5" }} ></i></a>
              </li>
          
              <li className="nav-item my-2">
                <a className="nav-link"><i className="fa-solid fa-pen-to-square" style={{ color: "#808080", scale: "1.5" }} onClick={openEditor} ></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
    </div>
  );
}

export default AccessibilityBar;
