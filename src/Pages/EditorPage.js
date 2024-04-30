import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Client from '../Components/Client';
import Editor from '../Components/Editor';
import { initSocket } from '../Socket';
import ACTIONS from '../Action';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

function EditorPage() {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        console.log('Socket initialized:', socketRef.current); // Debugging

        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the Playground`);
            console.log(`${username} joined`);
            // Update clients state array if necessary
            setClients(clients);
          }
        });

        // Listening for leaving clients
        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the Playground`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        });
      } catch (error) {
        console.error('Error initializing socket:', error); // Debugging
        handleErrors(error);
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket disconnected'); // Debugging
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      } else {
        console.log('Socket is not initialized yet.'); // Debugging
      }
    };
  }, [roomId, location.state, reactNavigator]);

  const handleErrors = (error) => {
    console.log('socket error', error);
    toast.error("Socket Connection Failed, try again later");
    reactNavigator('/');
  };

  if (!location.state) {
    return <Navigate to="/" />;
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
        <Editor socketRef={socketRef} roomId={roomId} />
      </div>
    </div>
  );
}

export default EditorPage;
