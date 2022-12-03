import React from "react";
import "../../assets/css/landing.css";
import logo from "../../assets/images/logo2.png";
import keyboard from "../../assets/images/keyboard.png";
import howto from "../../assets/images/me2.jpg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <div className="text-center landing-main">
        <img src={logo} alt="logo" className="landing-logo" />
        <h3 className="m-2 fw-bold landing-h1">
          Sign up for all your fall keyboard events!
        </h3>
        <Link to="/register" className="btn btn-lg firebrush-btn mt-4 rounded">
          Get Started
        </Link>
      </div>

      <div className="landing-container bg-white">
        <div className="mx-auto">
          <div className="container">
            <div className="twothird p-5 float-start">
              <h1>What is Firebrush?</h1>
              <h5 className="py-4">
                Why should it be so hard to find those that enjoy the same hobby
                as us? <br /> Thus, the creation of firebrush.Here at firebrush,
                we believe that all keyboard enthusiasts should have an easy
                platform to create, host, and attend all custom-keyboard related
                events.
                <br />
                We aim to provide an easy-to-use platform for those that want to
                attend or volunteer at all their favorite keyboard conventions,
                meetups, and other events.
              </h5>
              <p className="text-muted">
                We here at firebrush strive to assist all keyboard-related
                events around the world by providing a platform that anyone can
                use by simplifying all aspects of event management.
              </p>
            </div>
            <div className="third text-center float-start">
              <img src={keyboard} alt="me" className="aboutus-keyboard mt-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light landing-container">
        <div className="mx-auto">
          <div className="container">
            <div className="third text-center float-start">
              <img
                src={howto}
                alt="howto"
                className="mt-5 howtoimg rounded-circle"
              />
            </div>

            <div className="twothird px-5 my-4 float-start">
              <h1>How to get started!</h1>
              <h5 className="py-4">Getting start is quick and simple!</h5>

              <p className="text-muted">
                Start by creating an account. <br />
                This will allow you to login to the account you just created and
                start joining all current ongoing events. <br />
                From here you can choose to join any of the events that are on
                the page.
                <br />
                Once you have joined your events, you can view them by clicking
                your avatar image in the top right and selecting "My Events".
                <br />
                You can also create your own event from here! <br />
                For more information, please contact us at
                minjaekangdev@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
