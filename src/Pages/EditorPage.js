import React, { useState } from 'react'

function EditorPage() {
  const [client, setClient] = useState([{
    socketId:1, userName: "Pratyush"},
    {socketId:2, userName:"Rishit" }
  
  
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

            <h3>Connected Successfully, Start developing
</h3>




          </div>




        </div>



      </div>



      <div className='editorWrap'>Editor...</div>

    </div>
  )
}

export default EditorPage