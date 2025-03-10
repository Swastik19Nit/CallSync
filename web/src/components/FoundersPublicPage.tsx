import { Link } from "react-router-dom";
import swastikProfile from "../assets/images/swastik_profile.jpeg";

const FoundersPublicPage = () => {
  return (
    <div className="w-full my-20 h-2/5 flex flex-col justify-center items-center">
      <div>
        <h1 className="font-secondHeading text-mainText text-center text-4xl md:text-5xl xl:text-6xl font-bold">
          Book a meeting with Swastik Bhowmick
        </h1>
      </div>
      <div className="text-white h-full flex mt-14 justify-center lg:flex-row font-heading flex-col">
        <div className="bg-home lg:w-2/5 py-6 h-full mx-4 lg:m-0 border-input rounded-[50px] flex-col flex justify-center items-center">
          <img
            src={swastikProfile}
            alt="Swastik Bhowmick"
            className="w-[200px] rounded-[100px] pb-2"
          />
          <h1 className="text-3xl font-semibold text-center">Swastik Bhowmick</h1>
          <div className="text-sm w-10/12 py-4 text-input">
            <p>
              Hey! 👋 I'm Swastik, currently pursuing my BTech from NIT Kurukshetra.
              My passion lies in problem-solving, algorithms, and full-stack development.
              With a strong foundation in Data Structures and Algorithms, I actively
              participate in competitive programming and software development.
            </p>
            <p className="py-2">
              I'm proficient in C++, JavaScript, and Python, with hands-on experience in
              building scalable web applications using technologies like React, Next.js,
              Node.js, and databases like MongoDB and PostgreSQL.
            </p>
            <p>
              Beyond coding, I enjoy exploring system design, DevOps, and cloud computing.
              I am always eager to collaborate on innovative projects and learn from others
              in the tech community.
            </p>
            <p className="pt-2">
              Let's connect and create something impactful together!
            </p>
          </div>
          <Link to="/swastik">
            <button className="py-4 px-8 border-gray-400 font-medium border rounded-[50px] hover:bg-input hover:text-main duration-100">
              Let's schedule a meet
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoundersPublicPage;