import React from 'react';
import '../App.css';
import man from "../images/man.png";
import Battery from "../images/Battery.png";

function Header() {
  return (
    <header id="section1">
      <h5>12:00</h5>
      <img className="battery" src={Battery} alt="" />
      <div className="home">
        <img src={man} alt="" />
        <h2 className="home">Home</h2>
      </div>
      <div className="container">
        <h6 className="all">FUTO</h6>
        <h6 className="trend">Trending</h6>
      </div>
    </header>
  );
}

export default Header;
