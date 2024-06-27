import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import { initSocket } from '../Socket';
import ACTIONS from '../Action';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import AccessibilityBar from '../Components/AccessibilityBar';
import AiAPI from '../Components/aiAPI';

import html2canvas from 'html2canvas'; 

function EditorPage() {
  const [editorScreenshot, setEditorScreenshot] = useState(null); 
  const editorRef = useRef(null); 
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  
 
  const snapShot = () => {
    html2canvas(editorRef.current).then(canvas => {
      // Set the screenshot data URL to the state
      setEditorScreenshot(canvas.toDataURL());
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        console.log('Socket initialized:', socketRef.current); 
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));


        //Join
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        // Listening for joined events
        socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the Playground`);
            console.log(`${username} joined`);
            // Update clients state array if necessary
          }
          setClients(clients);
          // Emit SYNC_CODE action with the current code
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current, // Use codeRef here
            socketId,
          });
        });

        // Listening for leaving clients
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.error(`${username} left the Playground`);
          setClients(prev => {
            return prev.filter(client => client.socketId !== socketId);
          });
        });
      } catch (error) {
        console.error('Error initializing socket:', error); 
        handleErrors(error);
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket disconnected'); 
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      } else {
        console.log('Socket is not initialized yet.'); 
      }
    };
  }, [roomId, location.state?.username]);

  const handleErrors = error => {
    console.log('socket error', error);
    toast.error('Socket Connection Failed, try again later');
    reactNavigator('/');
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <>
     <div className='mainWrap'>
  <div className='rightAside' style={{zIndex:"+1"}}>
    <div className='rightasideInner'>
      <h3 style={{ color: 'grey' }}>
        <span style={{ color: 'white', fontWeight: 'bold' }}>
          Intelsy <span style={{ color: '#036EFD', display: 'inline-flex', alignItems: 'center' }}>
            AI
            &nbsp;<img src="../images/Ai.gif" alt="AI" style={{ verticalAlign: "right", height:"25px" }} />
          </span>
        </span>
        <br />
        <span style={{ fontSize: '20px' }}>
          Transform your coding experience.
        </span>
      </h3>
            <AiAPI />
          </div>
        </div>
        <div className='bottomCenter'>Hello this is compiler</div>

        <div className='aside'>
          <div className='asideInner'>
            <div className='logo'>
              <img
                className='logoImage'
                src="../images/logo.png"
                alt="Logo"
              />
              <h3 style={{ color: 'grey' }}>
                <span style={{ color: 'white', fontWeight: 'bold' }}>
                  Your Playground is ready
                </span>
                <br />
                <span style={{ fontSize: '20px' }}>Start developing !</span>
              </h3>
              <br />
              <h3 style={{ color: '#036EFD', fontSize: '22px', fontWeight: 'bold' }}>
                Playground Players
              </h3>
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
        <div className='editorWrap' >
          <div className='topBar'>
            <AccessibilityBar takeScreenshot={snapShot} />
          </div>
          {/* This is the main Complier div */}
          <div className='bottomCenter' style={{
    zIndex: "999",
    backgroundColor: "#1B1C1E",
    borderTopLeftRadius: '20px',
    borderTopRightRadius: "20px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px'
}}>
    {/* First red codeOutput div */}
    <div className='codeOutput' style={{
        padding: "10px",
        display:'flex',
        width: '90%',
        marginBottom: '5px'
    }}>

      {/* Language selector dropdown */}
      
      
      <div class="dropdown">
      <button className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        style={{  borderRadius: "20px", borderColor: "white" }}
        aria-expanded="false">
      Choose Language
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>   
  
  {/* Run button  */}
  
  <button type="button" class="btn btn-secondary" style={{borderRadius:"20px", borderColor:"white"}}>Primary</button>
    </div>

    {/* Second red codeOutput div */}
    <div className='codeOutput' style={{
        padding: "10px",
        backgroundColor: "blueviolet",
        width: "90%",
        marginBottom: '5px'
    }}></div>


</div>

          <Editor socketRef={socketRef} roomId={roomId} codeRef={codeRef} ref={editorRef} />
        </div>
      </div>
    </>
  );
}

export default EditorPage;
