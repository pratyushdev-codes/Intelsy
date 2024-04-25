import React, { useState } from 'react';
import Client from '../Components/Client';

function EditorPage() {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Pratyush" },
    { socketId: 2, username: "Rishit" }
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
            <h3>Connected Successfully, Start developing</h3>
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
      </div>
      <div className='editorWrap'>Editor...</div>
    </div>
  );
}

export default EditorPage;
