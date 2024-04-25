import React from 'react'
import Avatar from 'react-avatar';

const Client = ({username}) => {
    console.log('username', username);
  return (
    <div className='client'>
        <Avatar  facebookId="100008343750912" name={username} size={50}  round="14px"/>
        {/* facebookId="100008343750912" */}
        <span className='userName'>{username}</span>
        
        
        </div>
  )
}

export default Client