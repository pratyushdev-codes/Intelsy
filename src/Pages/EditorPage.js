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
const axios = require("axios");

function EditorPage({ Code }) {
  const [editorScreenshot, setEditorScreenshot] = useState(null);
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Select Language');
  const [output, setOutput] = useState(null);

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
            code: code,
            socketId,
          });
        });

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.error(`${username} left the Playground`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
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

  const handleErrors = (error) => {
    toast.error('Socket Connection Failed, try again later');
    reactNavigator('/');
  };

  useEffect(() => {
    if (code && language) {
      runCode(code, language);
    }
  }, [code, language]);

  async function runCode(code, language) {
    console.log(code, language);
  
    try {
      const answer = await fetch(
        "https://gcdx1arns0.execute-api.us-east-1.amazonaws.com/production",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            code: code,
            language: language,
          }),
        }
      );
  
      if (!answer.ok) {
        throw new Error(`HTTP error! Status: ${answer.status}`);
      }
  
      const response = await answer.json();
      console.log("API Response:", response);
      setOutput(response);
    } catch (error) {
      console.error("Error fetching from API:", error.message);
      setOutput({ error: error.message });
    }
  }

  const snapShot = () => {
    html2canvas(editorRef.current).then((canvas) => {
      setEditorScreenshot(canvas.toDataURL());
    });
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
                <span style={{ fontSize: '20px' }}>Start developing!</span>
              </h3>
              <br />
              <h3 style={{ color: '#036EFD', fontSize: '22px', fontWeight: 'bold' }}>
                Playground Players &nbsp; <img src='/images/user.png' style={{ width: "21px", height: "21px" }} />
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
  <button
    className="btn btn-secondary mx-2 dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    style={{
      borderRadius: "20px",
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      borderColor: "darkgrey",
      borderStyle: "dotted",
      backgroundColor: "#090300",
      color: "#036EFD",
    }}
  >
    {language}
  </button>
  <ul className="dropdown-menu">
    <li onClick={() => setLanguage("java")}>
      Java
    </li>
    <li onClick={() => setLanguage("python")}>
      Python
    </li>
    <li onClick={() => setLanguage("cpp")}>
      C++
    </li>
  </ul>
</div>
              <button type="button" id="submit" onClick={() => runCode(code, language)} className="btn btn-secondary mx-2"
                style={{ borderRadius: "20px", borderColor: "white", backgroundColor: "#090300", color: "#036EFD" }}>
                <i className="fa-solid fa-play" style={{ color: "#EC7A6F" }}></i> &nbsp; Run
              </button>

              <button type="button" className="btn btn-secondary mx-1"
                style={{ borderRadius: "20px", borderColor: "white", backgroundColor: "#090300", color: "#036EFD" }}>
                <i className="fa-solid fa-copy" style={{ color: "#EC7A6F" }}></i>  &nbsp;Copy
              </button>

              <button type="button" className="btn btn-secondary mx-1"
                style={{ borderRadius: "20px", borderColor: "white", backgroundColor: "#090300", color: "#036EFD" }}>
                <i className="fa-solid fa-circle-half-stroke" style={{ color: "#EC7A6F" }}></i>
                <span className='mx-2' style={{ color: "#036EFD" }}>Assist </span>
              </button>

              <button type="button" className="btn btn-secondary mx-1"
                style={{ borderRadius: "20px", borderColor: "white", backgroundColor: "#090300", color: "#036EFD" }}>
                <i className="fa-solid fa-lightbulb" style={{ color: "#EC7A6F" }}></i>
                <span className='mx-2' style={{ color: "#036EFD" }}>Explain</span>
              </button>

              <button type="button" className="btn btn-secondary mx-1"
                style={{ borderRadius: "20px", borderColor: "white", backgroundColor: "#090300", color: "#036EFD" }}>
                <i className="fa-solid fa-download" style={{ color: "#EC7A6F" }}></i>  &nbsp;Download Code
              </button>
            </div>

            <div className='codeOutput' style={{
              padding: "10px",
              backgroundColor: "#0F1117",
              width: "90%",
              borderRadius: "10px",
              height: "80vh",
              overflow: 'auto'
            }}>
              {output ? (
                <pre style={{ color: '#FFF' }}>{JSON.stringify(output, null, 2)}</pre>
              ) : (
                <p style={{ color: '#FFF' }}>&gt;</p>

              )}
            </div>
          </div>

          <Editor socketRef={socketRef} roomId={roomId} code={code} setCode={setCode} ref={editorRef} />
        </div>
      </div>
    </>
  );
}

export default EditorPage;
