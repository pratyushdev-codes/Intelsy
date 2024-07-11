import React from 'react';

const Features = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* First row of cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: 'white', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-server" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Remote Code Execution Engine</p>
            <p className="card-text">Execute your code remotely using RCE Engine powered by AWS.</p>
          </div>
        </div>

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-terminal" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Terminal</p>
            <p className="card-text">Run and know the output of the program.</p>
          </div>
        </div>

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-code" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Code Editor</p>
            <p className="card-text">Interactive code editor and playground with themes.</p>
          </div>
        </div>
      </div>

      {/* Second row of cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-users" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Collaborate</p>
            <p className="card-text">Collaborate with your team, friends, peers, or engineering teams for project code with auto sync functionality.</p>
          </div>
        </div>

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-chalkboard-user" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Whiteboard</p>
            <p className="card-text">Collaborative Canvas whiteboard for tech planning and strategy with auto sync functionality.</p>
          </div>
        </div>

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-cloud-arrow-down" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Download Code</p>
            <p className="card-text">Download your language-specific code.</p>
          </div>
        </div>
      </div>

      {/* Third row of cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-brands fa-slack" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>AI Chatbot</p>
            <p className="card-text">AI Chatbot to help you out during bugs, meetings, and code reviews.</p>
          </div>
        </div>

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-camera-retro" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>Screenshot</p>
            <p className="card-text">Instantly click a snap of your code.</p>
          </div>
        </div>

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-handshake-angle" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>AI Code Assistant</p>
            <p className="card-text">AI Code assistant that assists you while coding complex projects.</p>
          </div>
        </div>
        
        {/* <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-brands fa-gripfire" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>AI Code Assistant</p>
            <p className="card-text">AI Code assistant that assists you while coding complex projects.</p>
          </div>
        </div> */}

        <div className="card" style={{ width: '18rem', backgroundColor: '#1B1C1F', borderRadius: '20px', color: '#036EFD', marginBottom: '20px' }}>
          <div className="card-body">
            <h5 className="card-title"><i className="fa-solid fa-lightbulb" style={{ color: '#EC7A6F' }}></i></h5>
            <p className="card-subtitle mb-2 text-body-secondary" style={{ color: 'white' }}>AI Code Explain</p>
            <p className="card-text">Helps you understand difficult code.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
