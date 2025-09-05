import React from 'react'
import { Link } from 'react-router-dom'

function FriendsCard({friend}) {
  console.log("here is user friend id ",friend._id);
  
  return (
    <div className='bg-black text-white flex gap-3 p-5'>
      <div>
           <div>
        <img src={friend.profilePic} alt="" className='w-14' />
       </div>
       <p>
        {friend.fullName}
       </p>
      </div>
    
         <p>
        {friend.learningLanguage}
       </p>
       <p>
        {friend.nativeLanguage}
       </p>
       <Link to={`/chat/${friend._id}`} >
       Message
       </Link>
      
    </div>
  )
}

export default FriendsCard