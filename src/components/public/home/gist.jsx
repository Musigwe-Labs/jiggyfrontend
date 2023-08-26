/* eslint-disable react/prop-types */
const Gist = ({ content, showFullGist }) => {
  return (
    <p className={`cursor-pointer ${!showFullGist && 'text-ellipsis overflow-hidden whitespace-nowrap'} text-white mt-3`}>
      {content}
    </p>
  )
}
  
  export default Gist