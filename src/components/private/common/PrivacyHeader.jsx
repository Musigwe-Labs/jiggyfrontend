import { HiOutlineRefresh, HiRefresh } from "react-icons/hi";
import profile_pic from "../../../assets/profile_pics/pic1.png";
import { FiRefreshCcw, FiRefreshCw } from "react-icons/fi";

const PrivacyHeader = () => {
  return (
    <section className="flex flex-col items-center my-10">
      <div className="h-[120px] w-[120px] rounded-full border-none">
        <img src={profile_pic} alt="" className="h-[100%] w=[100%]" />
      </div>
      <h4 className="flex items-center gap-2 mt-6">
        <span className="text-2xl">
        Sircumsalot{" "}
        </span>
          <HiOutlineRefresh fontWeight={"700"} className="text-blue-300" />
      </h4>
      <a href="https://jiggy.com/annoymous" className="text-sm mt-2 text-blue-800">https://jiggy.com/annoymous</a>
    </section>
  );
};

export default PrivacyHeader;
