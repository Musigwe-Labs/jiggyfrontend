/* eslint-disable react/prop-types */
const Gist = ({ content, showFullGist, images }) => {
  return (
    <div>
      <p
        className={`cursor-pointer ${
          !showFullGist && "text-ellipsis overflow-hidden h-[3rem] whitespace-normal"
        } text-white mt-3`}
      >
        {content}
      </p>
      {images && (
        <img
          src={images}
          loading="lazy"
          className="w-3/5 md:w-2/5 mx-auto"
          alt="post_image"
        />
      )}
    </div>
  );
};

export default Gist;
