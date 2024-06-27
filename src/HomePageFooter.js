import React from 'react'
import ReactPlayer from 'react-player'

function Download() {
    const HeadingStyle={
        fontSize: '5rem',
        fontWeight: 'bold',
        color: '#6C727B',

        textAlign: "center"
      }
  return (
    <div>
        <h2 style={HeadingStyle}>Try for free now!</h2>
   
    
        <button type="button" class="btn btn-light" style={{backgroundColor:"white", borderRadius:"20px", width:"14rem", fontWeight:"bold"}}>Download Now</button>
     

      
        <div className="video-wrapper">
        <video src="./images/3.mp4" loop autoPlay muted  ></video>
          {/* <ReactPlayer
            url='./images/3.mp4'
            playing={true}
            loop={true}
            controls={false}
            width="100%"
            height="100%"
            style={{ borderRadius: '20px' }}
          /> */}
        </div>


    </div>
  )
}

export default Download