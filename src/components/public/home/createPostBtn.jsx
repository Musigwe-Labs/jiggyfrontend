/* eslint-disable react/prop-types */
import { BsPlusCircleFill } from 'react-icons/bs'

const CreatePostBtn = ({ setCreatePost })=>{
    return(
        <div className='fixed bottom-28 right-8 cursor-pointer' onClick={()=>{setCreatePost(true)}}>
            <BsPlusCircleFill  size='3.0rem' style={{background:'white', color:'#F33F5E', borderRadius:'50%', border:'1px solid #f33f5e'}} />
        </div>
    )
}

export default CreatePostBtn