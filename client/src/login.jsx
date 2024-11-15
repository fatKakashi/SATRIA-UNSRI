import React from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import myImage from "./assets/images/Login-Image.jpg";
import logoSatriaUnsri from "./assets/images/Satria Unsri.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password);
    axios
      .post("http://localhost:3001", { username, password })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Login success") {
          navigate("/checkdatamahasiswa");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[25%] flex flex-col">
          <h1 className="text-4xl bold text-white font-extrabold my-2">
            SATRIA UNSRI
          </h1>
          <p className="text-white font-semibold mb-4">
            (Sistem Alumni Tervalidasi dan Reliable menggunakan Inovasi Aplikasi
            Blockchain Universitas Sriwijaya)
          </p>
          <p className="text-white font-bold">
            Di Mana Kebanggaan Alumni Bertemu Teknologi
          </p>
          <p className="w-3/4 text-white my-4">
            Sistem alumni berbasis blockchain pertama di Indonesia yang
            menghubungkan ribuan alumni Universitas Sriwijaya dalam satu
            platform terpercaya.
          </p>
        </div>
        <img src={myImage} alt="nft-blockchain" className="w-full h-full" />
      </div>
      <div className="w-1/2 h-full flex flex-col p-16">
        <img className="w-1/2" src={logoSatriaUnsri} alt="logo satria Unsri" />
        <div className="w-full flex flex-col pl-7 mt-20">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">
              Bergabunglah dengan revolusi digital alumni UNSRI!
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="w-full flex flex-col">
              <input
                onChange={(username) => setUsername(username.target.value)}
                type="text"
                placeholder="Username"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:rounded-lg focus:px-2 transition-all duration-300"
              />
              <input
                onChange={(password) => setPassword(password.target.value)}
                type="password"
                placeholder="Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:rounded-lg focus:px-2 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 text-black border-2 border-transparent bg-yellow-400 rounded-md p-4 text-center font-bold hover:bg-transparent hover:border-yellow-400 hover:border-2 hover:text-yellow-400 transition duration-500"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
