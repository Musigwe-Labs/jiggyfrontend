import React from 'react';
import "../App.css";
import Exclude from "../images/Exclude.png";
import mask1 from "../images/mask1.png";
import mask2 from "../images/mask2.png";

function LandingPage() {
  return (
    <div>
      {/* First section */}
      <section id="s1">
        <div className="s1">
          <div className="top-left">
            <img src={Exclude} alt="" />
            <p>Jiggy</p>
          </div>
          <div className="buttons">
            <a href="#" className="button">Login</a>
            <a href="#" className="button">Sign Up</a>
          </div>
          <div className="middle-text">
            <p>Unleash Your</p>
            <div className="highlight">Anonymous Side</div>
          </div>
        </div>
      </section>
      {/* First section */}

      {/* Second section */}
      <section id="s2">
        <div className="sx s2">
          <div className="txt1">
            <p>Dive into the world of Jiggy.</p>
            <p>Socialize anonymously</p>
          </div>
          <div className="paragraph">
            <p>Experience the excitement of connecting</p>
            <p>with others without revealing your true</p>
            <p>identity.</p>
            <p>Break free from social expectations</p>
            <p>and unleash your true self on JIGGY.</p>
          </div>
          <div className="first">
            <img src={mask2} alt="Top Right Image" />
          </div>
          <div className="second">
            <img src={mask1} alt="Bottom Left Image" />
          </div>
          <div className="txt2">
            <p>A platform for every student,</p>
            <p>no matter your school.</p>
          </div>
          <div className="smallz">
            <p>Join a community of users that value</p>
            <p>privacy and self-expression. Jiggy</p>
            <p>encourages you to express your thoughts,</p>
            <p>ideas, values and emotions while staying</p>
            <p>completely anonymous.</p>
          </div>
        </div>
        <hr className='hr'></hr>
      </section>
    
      {/* Second section */}

      {/* Third section */}
      <section id="s3">
        <div className="go">
          <h3>Go Jiggy</h3>
          <p>Ready to embark on a thrilling adventure of anonymity and
            self-discovery? Don’t hold back, join Jiggy today and
            experience social media like never before!</p>
        </div>
        <div className="sign-btn">
          <a href="#" className="s-btn">Sign Up Now</a>
        </div>
      </section>
      <hr className='hr'></hr>
      {/* Third section */}

      {/* Fourth section */}
      <section id="s4">
        <div className="s4">
          <h3>Stealthy FAQS</h3>
          <div>
            <h4>What is Jiggy?</h4>
            <p>Jiggy is an anonymous social media <br />
              platform where you can share your <br />
              thoughts, ideas, and emotions without <br />
              revealing your real identity.</p>
          </div>
          <div className="privacy">
            <h4>How does Jiggy ensure privacy?</h4>
            <p>Jiggy takes your privacy extremely <br />
              seriously, User data is encrypted.</p>
          </div>
          <div style={{ position: 'relative', bottom: '130px' }}>
            <h4>Is Jiggy free to use?</h4>
            <p>Yes, absolutely! Jiggy is a free <br /> platform
              for everyone to enjoy.</p>
          </div>
          <div style={{ bottom: '245px' }} className="privacy">
            <h4>Can I invite my friends?</h4>
            <p>Of course! Share the love and invite <br />
              your friends to join Jiggy for a unique <br />
              social media experience.</p>
          </div>
        </div>
      </section>
      {/* Fourth section */}

      {/* Fifth section */}
      <section id="s5">
        <div className="s5">
          <span>Home</span>
          <span>Support</span>
          <span>Legal</span>
        </div>
        <div className="s6">
          <span>Get Started</span>
          <span>Help</span>
          <span>FAQ</span>
          <span>Contact</span>
        </div>
        <h3>2023 Jiggy - Embrace Your Anonymity</h3>
      </section>
      {/* Fifth section */}
    </div>
  );
}

export default LandingPage;
