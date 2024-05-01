import React from 'react';

const AccessibilityBar = () => {
  return (
    <div style={{ zIndex: 9999 , marginTop:"1rem"}}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{borderRadius:"30px", width:"50vh", height:"7vh"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{color: "#036EFD", fontSize: "20px", fontWeight: "bold" }}>Accessibility <span style={{color:"#EC7A6F"}}>Bar</span></a>
          &nbsp;  &nbsp;  &nbsp;
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            <li className="nav-item">
                <a className="nav-link"><img src="./images/camera2.png"  style={{width:"45px", height:"40px"}}/></a>
              </li>
              <li className="nav-item">
                <a className="nav-link " aria-current="page" ><img src="../images/pen1.png"  style={{width:"45px", height:"40px"}}></img></a>
              </li>
             &nbsp;
              
              <li className="nav-item">
                <a className="nav-link"><img src="../images/eraser2.png"  style={{width:"40px", height:"40px"}}/></a>
              </li>
             
              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AccessibilityBar;
