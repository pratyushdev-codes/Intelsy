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
  const [code, setCode] = useState(''); // Move code state to EditorPage

  const submitCode = () => {
    console.log(location.state);
    
  };

  const [language, setLanguage] = useState('');
  const snapShot = () => {
    html2canvas(editorRef.current).then(canvas => {
      setEditorScreenshot(canvas.toDataURL());
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,
        });

        socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the Playground`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        });

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.error(`${username} left the Playground`);
          setClients(prev => {
            return prev.filter(client => client.socketId !== socketId);
          });
        });
      } catch (error) {
        handleErrors(error);
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [roomId, location.state?.username]);

  const handleErrors = error => {
    toast.error('Socket Connection Failed, try again later');
    reactNavigator('/');
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className='mainWrap'>
        <div className='rightAside' style={{ zIndex: "+1" }}>
          <div className='rightasideInner'>
            <h3 style={{ color: 'grey' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                Intelsy <span style={{ color: '#036EFD', display: 'inline-flex', alignItems: 'center' }}>
                  AI
                  &nbsp;<img src="../images/Ai.gif" alt="AI" style={{ verticalAlign: "right", height: "25px" }} />
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

        <div className='aside' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
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
                Playground Players &nbsp; <span style={{ fontSize: "17px", color: "#808080" }}><i className="fa-solid fa-arrow-right-to-bracket"></i></span>
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
        <div className='editorWrap'>
          <div className='topBar'>
            <AccessibilityBar takeScreenshot={snapShot} />
          </div>
          <div className='bottomCenter' style={{
            zIndex: "999",
            backgroundColor: "#171717",
            borderTopLeftRadius: '10px',
            borderTopRightRadius: "10px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div className='codeOutput' style={{
              padding: "10px",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              marginBottom: '5px'
            }}>
              <div className="dropdown">
                <button className="btn btn-secondary mx-2 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderColor: "darkgrey",
                    borderStyle: "dotted",
                    backgroundColor: "#1B1C1E",
                    color: "#036EFD"
                  }}
                  aria-expanded="false">
                  Choose Language
                </button>
                <ul className="dropdown-menu">
                  <li onClick={() => { setLanguage("java"); }}>
                    <a className="dropdown-item" href="#">Java</a>
                  </li>
                  <li onClick={() => { setLanguage("python"); }}>
                    <a className="dropdown-item" href="#">Python</a>
                  </li>
                  <li onClick={() => { setLanguage("cpp"); }}>
                    <a className="dropdown-item" href="#">C++</a>
                  </li>
                </ul>
              </div>

              <button type="button" id="submit" onClick={submitCode} className="btn btn-secondary mx-2"
                style={{ borderRadius: "20px", borderColor: "white", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: "#090300" }}>
                <i className="fa-solid fa-play" style={{ color: "#EC7A6F" }}></i> &nbsp; Run
              </button>

              <button type="button" className="btn btn-secondary"
                style={{ borderRadius: "20px", borderColor: "white", backgroundColor: "#090300" }}>
                <i className="fa-solid fa-download" style={{ color: "#EC7A6F" }}></i>  &nbsp;Download Code
              </button>
            </div>

            <div className='codeOutput' style={{
              padding: "10px",
              backgroundColor: "#0F1117",
              width: "90%",
              borderRadius: "10px",
              height: "80vh"
            }}><p><img src='../images/next.png' style={{ scale: "0.5" }} /> Hello World </p>
            </div>
          </div>

          <Editor socketRef={socketRef} roomId={roomId} code={code} setCode={setCode} ref={editorRef} />
        </div>
      </div>
    </>
  );
}

export default EditorPage;
