import React from "react";
import "../App.css";
import ChatCircle from "../images/ChatCircle.png";
import FireSimple from "../images/FireSimple.png";
import Eye from "../images/Eye.png";
import Connect from "../images/Connect.png";
import communityIcon from "../images/communityIcon.png";
import DotsThreeVertical from "../images/DotsThreeVertical.png";
import down from "../images/down.png";
import Home from "../images/Home.png";
import Message1 from "../images/Message1.png";
import Bell from "../images/Bell.png";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

import { useState } from "react";

const ShareButtons = () => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = "Check out this post";

  return (
    <div>
      <img
        src={Connect}
        alt="Share Options"
        style={{
          position: "relative",
          left: "300px",
          bottom: "24px",
          cursor: "pointer",
        }}
        onClick={() => setShowShareOptions(!showShareOptions)}
      />

      {/* Share options modal */}
      {showShareOptions && (
        <div className="share-options-modal">
          <div className="share-options-container">
            <div className="heroes">
              <h4 className="hero">
                Send an anonymous message <br></br>{" "}
                <span style={{ color: "#fff", fontWeight: "500" }}>on</span>{" "}
                <span style={{ color: "#140303", fontWeight: "800" }}>
                  JIGGY
                </span>
              </h4>
              <div id="ones">
                <img src={communityIcon} alt="" />{" "}
                <span>
                  <span className="f1">Anonymous</span>
                  . FUTO. 17h <img src={DotsThreeVertical} alt="" />
                </span>
                <h3>
                  You meet your 13 year old self, but can only tell them 3
                  words, what do you say and why?
                </h3>
              </div>
            </div>

            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <TwitterIcon size={30} round />
            </TwitterShareButton>

            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={30} round />
            </FacebookShareButton>

            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>

            <EmailShareButton url={shareUrl} title={shareTitle}>
              <EmailIcon size={30} round />
            </EmailShareButton>

            <button
              onClick={() => setShowShareOptions(false)}
              className="close-button"
            >
                X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function Content() {
  return (
    <section id="contents">
      <div className="content container">
        {/* First Content Block */}
        <h6>
          FUTO <img src={down} alt="" />
        </h6>
        <div id="one">
          <img src={communityIcon} alt="" />{" "}
          <span>
            <span className="f1">Anonymous</span>
            . FUTO. 17h <img src={DotsThreeVertical} alt="" />
          </span>
          <h3>
            You meet your 13 year old self, but can only tell them 3 words, what
            do you say and why?
          </h3>
          <img src={ChatCircle} alt="" /> <span>22.5k</span>
          <img
            style={{ position: "relative", left: "60px" }}
            src={FireSimple}
            alt=""
          />
          <span style={{ position: "relative", left: "60px" }}>10.9k</span>
          <img
            style={{ position: "relative", left: "120px" }}
            src={Eye}
            alt=""
          />
          <span style={{ position: "relative", left: "120px" }}>10.9k</span>
          <ShareButtons />
        </div>
        <hr className="line" />

        {/* Second Content Block */}
        <div style={{ backgroundColor: "#3A1A1A" }} id="one">
          <img src={communityIcon} alt="" />{" "}
          <span>
            <span className="f1">Anonymous</span>
            . FUTA . 17h <img src={DotsThreeVertical} alt="" />
          </span>
          <div className="small">CONFESSION</div>
          <h3>
            You meet your 13 year old self, but can only tell them 3 words, what
            do you say and why?
          </h3>
          <img src={ChatCircle} alt="" /> <span>22.5k</span>
          <img
            style={{ position: "relative", left: "60px" }}
            src={FireSimple}
            alt=""
          />
          <span style={{ position: "relative", left: "60px" }}>10.9k</span>
          <img
            style={{ position: "relative", left: "120px" }}
            src={Eye}
            alt=""
          />
          <span style={{ position: "relative", left: "120px" }}>10.9k</span>
          <ShareButtons />
        </div>
        <hr className="line" />

        {/* Third Content Block */}
        <div style={{ backgroundColor: "#051522CC" }} id="one">
          <img src={communityIcon} alt="" />{" "}
          <span>
            <span className="f1">Anonymous</span>
            . UNN . 17h <img src={DotsThreeVertical} alt="" />
          </span>
          <div
            style={{ color: "#1D9BF0", border: "1px solid #1D9BF0" }}
            className="small"
          >
            QUESTION
          </div>
          <h3>
            You meet your 13 year old self, but can only tell them 3 words, what
            do you say and why?
          </h3>
          <img src={ChatCircle} alt="" /> <span>22.5k</span>
          <img
            style={{ position: "relative", left: "60px" }}
            src={FireSimple}
            alt=""
          />{" "}
          <span style={{ position: "relative", left: "60px" }}>10.9k</span>
          <img
            style={{ position: "relative", left: "120px" }}
            src={Eye}
            alt=""
          />{" "}
          <span style={{ position: "relative", left: "120px" }}>10.9k</span>
          <ShareButtons />
        </div>
        <hr className="line" />

        {/* Fourth Content Block */}
        <div style={{ backgroundColor: "#5E0525CC" }} id="one">
          <img src={communityIcon} alt="" />{" "}
          <span>
            <span className="f1">Anonymous</span>
            . OAU . 17h <img src={DotsThreeVertical} alt="" />
          </span>
          <div
            style={{ color: "#F91880", border: "1px solid #F91880" }}
            className="small"
          >
            CRUSH
          </div>
          <h3>
            You meet your 13 year old self, but can only tell them 3 words, what
            do you say and why?
          </h3>
          <img src={ChatCircle} alt="" /> <span>22.5k</span>
          <img
            style={{ position: "relative", left: "60px" }}
            src={FireSimple}
            alt=""
          />
          <span style={{ position: "relative", left: "60px" }}>10.9k</span>
          <img
            style={{ position: "relative", left: "120px" }}
            src={Eye}
            alt=""
          />
          <span style={{ position: "relative", left: "120px" }}>10.9k</span>
          <ShareButtons />
        </div>
        <hr className="line" />
        {/* Footer Images */}
        <div className="footer-images">
          <img
            style={{ position: "relative", left: "30px" }}
            src={Home}
            alt=""
          />
          <a style={{ textDecoration: "none" }} href="message.html">
            <img
              style={{ position: "relative", left: "140px" }}
              src={Message1}
              alt=""
            />
          </a>
          <img
            style={{ position: "relative", left: "280px" }}
            src={Bell}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Content;
