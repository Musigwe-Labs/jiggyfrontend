import React from "react";
import Google from "../../assets/google.png";
import Microsoft from "../../assets/microsoft.png";

const AuthIcons = () => {
  return (
    <div className="flex justify-between mt-4 space-x-4 text-gray-400 text-sm">
      <a
        target={window.innerWidth >= 1024 ? "popup" : "_blank"}
        onClick={() =>
          window.innerWidth >= 1024 &&
          window.open(
            "https://accounts.google.com/o/oauth2/auth?client_id=524267745289-99tcul9q2eos9crnc5krameenh2p59gb.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcruise.pythonanywhere.com%2Faccount%2Fauth%2Fgoogle%2Fcallback%2F&response_type=code&scope=email",
            "Sign In With Google -  Jiggy",
            "width=600,height=400"
          )
        }
        href={ window.innerWidth < 1024 && "https://accounts.google.com/o/oauth2/auth?client_id=524267745289-99tcul9q2eos9crnc5krameenh2p59gb.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcruise.pythonanywhere.com%2Faccount%2Fauth%2Fgoogle%2Fcallback%2F&response_type=code&scope=email"}
        className="flex cursor-pointer justify-center items-center border border-gray-500 rounded-md py-2 w-[47%] space-x-1"
      >
        <img src={Google} alt="google icon" className="h-4" />
        <span>Google</span>
      </a>
      <div className="flex justify-center items-center border border-gray-500 rounded-md py-2 w-[47%] space-x-1">
        <img src={Microsoft} alt="microsoft icon" className="h-4" />
        <span>Microsoft</span>
      </div>
    </div>
  );
};

export default AuthIcons;
