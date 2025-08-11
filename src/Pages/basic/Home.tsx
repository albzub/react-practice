import React from "react";
import { Link } from "react-router-dom";
import back from "../../assets/back.png"

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen min-w-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${back})`,
      }}
    >
      <div className="w-full flex items-center justify-center px-4">
        <div className="mt-16 max-w-lg w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
          <h1 className="text-4xl font-extrabold text-center text-white md:text-5xl">
            Welcome to Post Management Service
          </h1>
          <p className="text-center text-lg text-gray-200 md:text-xl">
            Hello! Dive into your coastal adventure.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-5 py-3 rounded-md text-white border border-white/30 hover:bg-white/10 hover:text-sky-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
