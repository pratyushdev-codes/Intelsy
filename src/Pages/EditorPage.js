import React, { useState } from 'react';
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import Navbar from '../Navbar';

function EditorPage() {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },{ socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },{ socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },{ socketId: 1, username: "Pratyush" },
    
  ]);

  return (
  

    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className="logo">
            <img
              className='logoImage'
              src="../images/logo.png"
              alt="Logo"
            />
            <h3 style={{color:"grey"}}><span style={{color:"white", fontWeight:"bold"}}>Your Playground is ready </span><br/> <span style={{fontSize:"20px"}}>Start developing !</span></h3>
            <br/>
            <h3 style={{color:"#036EFD", fontSize:"25px", fontWeight:"bold"}}>Playground Players</h3>
            <div className="clientsList">
              {clients.map((client) => (
                <Client
                  key={client.socketId}
                  username={client.username}
                />
              ))}
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary" className='btn copyBtn' style={{
    backgroundColor: "#036EFD",
    borderRadius: "20px",
    color: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  }}>Copy Room Id</button>
       
        <button type="button" class="btn btn-primary" className='btn leaveBtn'  style={{backgroundColor:"#DF6F67", borderRadius:"20px", color:"white",  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"}}>Leave Room</button>
      </div>
      <div className='editorWrap'>


<Editor/>
      </div>
    </div>

  );
}

export default EditorPage;
