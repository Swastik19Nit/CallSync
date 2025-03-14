import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import landingImage from "../assets/images/landing.png";

function Authentication() {
  const [alreadySigned, setAlreadySigned] = useState(false);
  const handleSign = () => {
    setAlreadySigned(!alreadySigned);
  };
  return (
    <div className="px-32 py-12 h-screen flex justify-center items-center">
      <div className="flex justify-start items-start bg-second text-white rounded-3xl">
        <div className="w-full">
          <div className="flex justify-center items-center lg:justify-start lg:items-start p-8 py-0 lg:p-0 w-full">
            <div className="w-1/2 h-full hidden lg:block rounded-3xl shadow-sm shadow-gray-600">
              <div className="h-[500px] bg-input rounded-t-3xl">
                <img
                  src={landingImage}
                  className="w-full h-full border-b-[0.5px] border-b-gray-400"
                />
              </div>
              <div className="flex flex-row my-6 px-4">
                <div className="px-2 w-4/12">
                  <p>
                    We will take care of your meetings you focus on completing
                    your task
                  </p>
                </div>
                <div className="px-2 w-4/12">
                  <p>
                    Connect your google calendar with CalSync for better
                    experience
                  </p>
                </div>
                <div className="px-2 w-4/12">
                  <p>
                    We are always there to help you to request any feature,
                    click{" "}
                    <a
                      href="https://github.com/Swastik1493/CalSync/issues/new"
                      target="_blank"
                      className="text-gray-400"
                    >
                      here
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 py-5">
              {alreadySigned ? <Login /> : <Signup />}
              <span className="w-64 flex justify-center">
                - - - - - &nbsp; OR &nbsp; - - - - -
              </span>
              <p
                className="my-4 cursor-pointer text-[20px] w-64 text-mainText text-center text-md font-heading font-semibold"
                onClick={() => {
                  handleSign();
                }}
              >
                {alreadySigned
                  ? "First Time Here, Sign Up"
                  : "Already a User, Login"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
