import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { FiFacebook, FiTwitter } from 'react-icons/fi'

const Socialmedialinks = ({postId}) => {
    let url = "https://jiggy-app.netlify.app/home";
    console.log(postId);
  return (
    <div className='flex gap-4 justify-center'>
        <button><FiFacebook /></button>
        <button><FiTwitter /></button>
        <button><BsWhatsapp /></button>
    </div>
  )
}

export default Socialmedialinks