import React, { useState } from 'react';
import Navbar from '../Navbar';
import Banner from '../Banner';
import Download from '../HomePageFooter';
import { v4 as uuidv4 } from 'uuid'; // Corrected import
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Corrected import
import AiAPI from '../../Components/aiAPI';
import Container from '../../Components/Container/Container';

function Home() {
  const navigate = useNavigate(); // Corrected useNavigate declaration
  const [roomId, setRoomID] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4(); // Use uuidv4 to generate UUID
    setRoomID(id);
    console.log(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room Id and Username are required.");
      return;
    }
    // Redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      }
    });
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

  const hanleInputEnter=(e)=>{
    console.log('event', e.code);
    if(e.code==='Enter'){
      joinRoom();
    }

  }

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
            <h1 style={{ fontFamily: "PT sans", color: "#036EFD", fontSize: "50px", fontWeight: "bold" }} onClick={joinRoom}>Join a room</h1>
            <h3 style={{fontFamily: "PT sans", color:"white", fontSize: "20px", fontWeight:"bold"}}>Paste Invitation ROOM ID</h3>
            <br/>
            <div className="inputGroup">
              <center>
                <input
                    type="text"
                    className="inputBox"
                    placeholder="    Room ID"
                    style={{borderRadius:"20px", width:"40%", height:"2.7rem",marginBottom:"10px", color:"grey"}}
                    onChange={(e) => setRoomID(e.target.value)}
                    value={roomId}
                    onKeyUp={hanleInputEnter}
                />
                <br/>
                <input
                    type="text"
                    className="inputBox"
                    placeholder="    Username"
                    style={{borderRadius:"20px", height:"2.7rem",  width:"40%"}}
                    onChange={(e)=> setUsername(e.target.value)}
                    value={username}
                />
                <br/>
                <br/>
                <a onClick={createNewRoom} href=''> <h3 style={{fontFamily: "PT sans", color:"grey", fontSize: "20px", fontWeight:"bold"}}>Don't have an invite code? Create new Room</h3></a>
              </center>
              <br/>
              <center> <button type="button" className="btn btn-primary" style={{borderRadius:"20px", width:"250px",}} onClick={joinRoom}>Join Room</button></center>
             
            </div>
            <br/>
            <img src='./images/1.jpeg' className="img-fluid" style={{borderRadius:"20px"}}/>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Download/>



        </center>
    
      </div>
    </div>
  );
}

export default Home;
