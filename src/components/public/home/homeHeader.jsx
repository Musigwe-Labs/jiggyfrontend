/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import profile_pic from "../../../assets/profile_pics/pic1.png";
import { useAuthContext } from "../../../contexts/AuthContext";

const HomeHeader = ({ setProfilePage, userDetails }) => {
  const { key } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="flex items-center pt-6 px-3">
      {userDetails && (
        <div
          className="cursor-pointer"
          onClick={() => {
            key === "" ? navigate("/login") : setProfilePage(true);
          }}
        >
          <img className="w-8 rounded-full mx-[9px]" src={profile_pic} />
        </div>
      )}
      <h1 className="text-2xl font-bold font-openSans  from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent">
        Home
      </h1>
      {!userDetails && (
        <button className="ml-auto bg-[#fff] hover:scale-105 transition-all duration-150 ease-linear px-3 py-2 rounded-xl " onClick={() => navigate("/login")}>
          <span className="from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent font-bold">Login</span>
        </button>
      )}
    </div>
  );
};

export default HomeHeader;
