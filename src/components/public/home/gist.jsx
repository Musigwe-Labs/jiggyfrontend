/* eslint-disable react/prop-types */
const Gist = ({ post }) => {
  return (
    <p className='cursor-pointer text-white mt-3'>
      {post.content}
    </p>
  )
}
  
  export default Gist