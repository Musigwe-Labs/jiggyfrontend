/* eslint-disable react/prop-types */
import { BsPlusCircleFill } from 'react-icons/bs'

const CreatePostBtn = ({ setCreatePost })=>{
    return(
        <div className='fixed bottom-12 right-8 bg-white cursor-pointer rounded-full' onClick={()=>{setCreatePost(true)}}>
            <BsPlusCircleFill  size={40}
                className="  text-[#f33f5e] rounded-full opacity"
             // style={{
             //        background:'',
             //        color:'',
             //        // borderRadius:'50%', 
                    
             // }} 
            />
        </div>
    )
}

export default CreatePostBtn