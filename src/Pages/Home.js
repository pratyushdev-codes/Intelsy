import React, { useState } from 'react';
import Navbar from '../Navbar';
import Banner from '../Banner';
import Download from '../HomePageFooter';
import ReactPlayer from 'react-player'; 
import { v4 as uuidv4 } from 'uuid'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; 
import Features from '../Features';



function Home() {

    const HeadingStyle={
      fontSize: '5rem',
      fontWeight: 'bold',
      color: '#6C727B',

      textAlign: "center"
    }
  
  const navigate = useNavigate(); 
  const [roomId, setRoomID] = useState('');
  const [username, setUsername] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4(); 
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

    .responsive-video {
      position: relative;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      height: 0;
      overflow: hidden;
      max-width: 100%;
      background: #000;
      border-radius: 20px;
      margin-top: 20px;
    }

    .responsive-video iframe, .responsive-video video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .video-container {
      position: relative;
      width: 100%;
      max-width: 100%;
      background: #000;
      border-radius: 20px;
      overflow: hidden;
    }

    .video-text {
      position: absolute;
      top:  37%;
      left: 0;
      width: 100%;
      text-align: center;
      color: white;
      padding: 20px;
      z-index: 1;
    }

    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .video-wrapper {
      position: relative;
      padding-top: 45.25%; /* 16:9 Aspect Ratio */
      height: 0;
      overflow: hidden;
      max-width: 100%;
      border-radius: 20px;
      background: #000;
    }




    .video-wrapper iframe, .video-wrapper video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    .gradient-text {
      background: linear-gradient(
        to right,
        #E98856 20%,
        #AA6FB3 30%,
       #8278CF 70%,
       #DF6B6A 80%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background-size: 500% auto;
      animation: textShine 5s ease-in-out infinite alternate;
    }

    @keyframes textShine {
      0% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 100% 50%;
      }
    }

    /* Media Queries for responsiveness */
    @media (max-width: 768px) {
      .video-text {
        top: 30%;
        padding: 10px;
      }

      .center-text {
        font-size: 1.2rem;
      }

      .inputBox {
        width: 80%;
      }

      .btn {
        width: 200px;
      }

      .video-wrapper {
        border-radius: 10px;
      }
    }

    @media (max-width: 480px) {
      .video-text {
        top: 20%;
        padding: 5px;
      }

      .center-text {
        font-size: 1rem;
      }

      .inputBox {
        width: 90%;
      }

      .btn {
        width: 150px;
      }

      .video-wrapper {
        border-radius: 5px;
      }
    }
  `;

  const handleInputEnter = (e) => {
    console.log('event', e.code);
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  return (
    <div>
      <style>{styles}</style>
      <Navbar />
      <div className="video-container">
        <div className="video-text">
          <h1 className="center-text gradient-text" style={{ fontFamily: "PT sans",color: "rgba(242, 243, 243, 0.9)", fontSize: "60px", fontWeight: "bold" }}>
          <i class="fa-solid fa-sparkles"></i> Blazing Fast Development and Integrations!
          </h1>
          <h3 className="center-text" style={{ fontFamily: "PT sans", fontSize: "26px", color: "rgba(242, 243, 243, 0.5)", fontWeight: "bolder" }}>
            
          <button
  type="button"
  className="btn btn-light"
  style={{
    borderRadius: "30px",
    background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
    backdropFilter: "blur(10px)", // Blur effect
    WebkitBackdropFilter: "blur(10px)", // For Safari support

  

    color: "white", // Text color
  }}
>  <img src='./images/star.png' className="mx-1"style={{width:"22px", height:"22px", color:"blue"}}/> 
 
  Shift to faster code  development.&nbsp;

</button>

          </h3>
        </div>
        <div className="video-wrapper">
        <video src="./images/intro.webm" loop autoPlay muted className="h-[300px] " ></video>
          {/* <ReactPlayer autoPlay muted
            url='./images/intro.webm'
            playing={true}
            loop={true}
            controls={false}
            width="100%"
            height="100%"
            style={{ borderRadius: '20px' }}
          /> */}
        </div>
      </div>
      <div>
       
      <span><center></center></span>
  
        {/* <Banner /> */}
        
       <br/>
        <br />
        <center>
          <div style={{ backgroundColor: "#1B1C1E", backgroundImage: "url('/images/grad1.png')",borderRadius: "20px", width: "100%", height: "30rem" }}>
            <br />
            <h1 style={{ fontFamily: "PT sans", color: "#036EFD", fontSize: "50px", fontWeight: "bold" ,  background: "linear-gradient(78deg, white, #036EFD)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"}} onClick={joinRoom}>
              Join a room
            </h1>
            <h3 style={{ fontFamily: "PT sans", color: "#bcb3b3", fontSize: "20px", fontWeight: "bold" }}>
              Enter Room ID and Username
            </h3>
            <br />
            <div className="inputGroup">
              <center>
                <input
                  type="text"
                  className="inputBox"
                  placeholder="    Room ID"
                  style={{ borderRadius: "20px", width: "40%", height: "2.7rem", marginBottom: "10px", color: "grey" }}
                  onChange={(e) => setRoomID(e.target.value)}
                  value={roomId}
                  onKeyUp={handleInputEnter}
                />
                <br />
                <input
                  type="text"
                  className="inputBox"
                  placeholder="    Username"
                  style={{ borderRadius: "20px", height: "2.7rem", width: "40%" }}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <br />
                <br />
                <a onClick={createNewRoom} href="" style={{ textDecoration: "none" }}>
  <h3 style={{ fontFamily: "PT sans", color: "grey", fontSize: "20px", fontWeight: "bold" }}>
    Don't have an invite code? Create new Room
  </h3>
</a>
              </center>
              <br />
              <center>
                <button
                  type="button"
                  className="btn btn-primary"
                  
                  style={{ borderRadius: "20px", width: "250px" ,  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
                  onClick={joinRoom}
                >
                  Join Room
                </button>
              </center>
            </div>
            <br/>
            <br/>
   {/* <Features/> */}
   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {/* First row of cards */}
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: 'white', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-server" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Remote Code Execution Engine</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Execute your code with RCE Engine, powered by AWS for unparalleled performance and reliability.</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-terminal" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Terminal</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Execute your code and instantly view your program's output in real-time.</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-code" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Code Editor</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>A dynamic and interactive coding environment with customized themes for a personalized experience.</p>
      </div>
    </div>
  </div>

  {/* Second row of cards */}
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-users" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Collaborate</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Collaborate with your team, friends, peers, or engineering teams on project code with real-time auto-sync functionality .</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-chalkboard-user" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Whiteboard</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Collaborative Canvas whiteboard for tech planning and strategy with auto sync functionality to keep your team aligned and productive.</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-handshake-angle" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>AI Code Assistant</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}> Your smart AI companion for navigating and simplifying complex coding projects..</p>
      </div>
    </div>
  </div>

  {/* Third row of cards */}
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-brands fa-slack" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>AI Chatbot</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Your intelligent AI chatbot for troubleshooting to help you out during bugs, meetings, and code reviews.</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-camera-retro" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Screenshot</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Capture instant snapshots of your code with just a click.</p>
      </div>
    </div>


  <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-cloud-arrow-down" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Download Code</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Download your language-specific code.</p>
      </div>
    </div>
  </div>
  {/* Fourth row of cards */}
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-microchip" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Native Secure Compiler Server</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Execute your code with confidence on our secure engine, ensuring privacy and protection at every step.</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-copy" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>Copy Code</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Copy your code directly to your clipboard with a single click for effortless integration.</p>
      </div>
    </div>

    <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
      <div className="card-body">
        <h5 className="card-title"><i className="fa-solid fa-lightbulb" style={{ color: '#EC7A6F' }}></i></h5>
        <p className="card-subtitle mb-2" style={{ color: 'grey', fontWeight: 'bolder' }}>AI Code Explain</p>
        <p className="card-text" style={{ color: '#036EFD', fontWeight:"500" }}>Simplify complex code with ease and gain a clearer understanding through intelligent explanations.</p>
      </div>
    </div>
  </div>
</div>






   {/*  */}
   {/* <div style={{ position: "relative", display:"flex" }}>
  <img 
    className="img-fluid" 
    src="./images/world-map.png" 
    style={{ 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
      borderRadius: "20px", 
      opacity: "0.3", 
      transform: "scale(0.8)" // Changed 'scale' to 'transform'
    }} 
  />
  <h2 
    style={{ 
      position: "absolute", 
      top: "50%", 
      left: "50%", 
      transform: "translate(-50%, -50%)", 
      


      textAlign: "center",
      margin: 0 ,// Ensure no extra margin around the text
      fontSize: '5rem',
      fontWeight: 'bold',
      color: 'rgb(142 148 158)',
    }}
  >
    Try for free now!
  </h2>
</div> */}

<br/>
<br/>


<div 
      className="d-flex justify-content-center align-items-center text-center position-relative"
      style={{
        backgroundImage: "url('/images/world-map.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        opacity: 0.2
      }}
    >
    <div className="position-absolute top-50 start-50 translate-middle">
    <h2 className="display-2 fw-bold  m-0" style={{ fontSize: '6rem' , color:"#FFFFFF"}}>
      Try Now!
    </h2>
  </div>
</div>

<br/>
<br/>
          {/* <Download /> */}
        
          <div>

          </div>
      
       
  
   
    
        {/* <button type="button"  class="btn btn-light" style={{backgroundColor:"white", borderRadius:"20px", width:"14rem", fontWeight:"bold"}}>Download Now</button> */}
     

      
       
        {/* <div className="video-wrapper">
        <video src="./images/3.mp4" loop autoPlay muted className="h-[300px] " ></video>
</div> */}
    </div>
  <br/>

        </center>
        
      </div>
    </div>
  );
}

export default Home;