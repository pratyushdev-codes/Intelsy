import React from 'react';
import Navbar from '../Navbar';
import Banner from '../Banner';

function Home() {
  const imageStyle = {
    width: "55rem",
    height: "33rem",
    borderRadius: "20px"
  };

  // Inline CSS for component styles
  const styles = `
    .center-text {
      text-align: center;
    }

    .facilities-heading {
      font-family: 'PT Sans', sans-serif;
      color: #65A0FB;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 20px 0;
      text-align: center;
    }

    .switch-container {
      display: flex;
      justify-content: center;
    }

    /* Your existing switch styles */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: #2196F3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <Navbar/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 className="center-text" style={{fontFamily: "PT sans", color:"white", fontSize: "50px", fontWeight:"bold"}}>Blazing Fast <span style={{color:"#036EFD"}}>Development</span> and  <span style={{color:"#036EFD"}}>Integrations!</span></h1>
       <h3 className="center-text" style={{fontFamily: "PT sans", fontSize: "20px",  color:"grey",fontWeight:"bolder"}}>Toggle the switch now and shift to faster code development.</h3>
      <div>
        <br/>
       
        <div className="switch-container">
          <label className="switch">
            <input type="checkbox"/>
            <span className="slider round"></span>
          </label>
        </div>
        <br/>
        
        <Banner/>
        <br/>
        <br/>
 <center>
 <div style={{backgroundColor:"#1B1C1E", borderRadius:"20px",width:"100%", height:"30rem"}}>
  <br/>

  <h1>Join a room</h1>
  
 </div>
 </center>
     
       
      </div>
    </div>
  )
}

export default Home;
