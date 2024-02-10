

const UserAvatar = ({nameInitial, size='20px', textSize='xl' , classes=''}) => {
  
  return (
    
      <div className={` h-[${size}px] rounded-full border-none bg-white flex items-center justify-center ${classes}`} style={{ width:(size * 0.25)+'rem', height:(size * 0.25)+'rem'}}>
      	<p className={`initial text-[#f33f5e] font-bold text-${textSize} `}>{nameInitial}</p>
      </div>
  
  );
};

export default UserAvatar;
