import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import { initSocket } from './Socket';
import ACTIONS from '../Action';
import { useLocation , useNavigate, Navigate, useParams} from 'react-router-dom';

function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
     socketRef.current.on('connect_error', (err)=>handleErrors(err));
     socketRef.current.on('connect_failed', (err)=>handleErrors(err));

     function handleErrors(e){
      console.log('socket error', e);
      toast.error("Socket Connection Failed, try again later");
      reactNavigator('/');

     }
    // You can emit join action here
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username
      });
    };
    init();
  }, [location.state?.username]);

  const [clients, setClients] = useState([
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" },
    { socketId: 1, username: "Pratyush" }
  ]);

  if(!location.state){
    return <Navigate to="/"/>;
  }

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
            <h3 style={{ color: "grey" }}>
              <span style={{ color: "white", fontWeight: "bold" }}>Your Playground is ready </span><br />
              <span style={{ fontSize: "20px" }}>Start developing !</span>
            </h3>
            <br />
            <h3 style={{ color: "#036EFD", fontSize: "22px", fontWeight: "bold" }}>Playground Players</h3>
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
        <button type="button" className='btn copyBtn' style={{
          background: "rgb(157,86,224)",
          background: "radial-gradient(circle, rgba(157,86,224,1) 0%, rgba(253,130,85,1) 100%)",
          borderRadius: "20px",
          color: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>Copy Room Id</button>

        <button type="button" className='btn leaveBtn' style={{ backgroundColor: "#036EFD", borderRadius: "20px", color: "white" }}>Leave Room</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  );
}

export default EditorPage;