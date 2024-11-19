import React, { useState } from "react";
import SatriaUnsri from "./assets/images/Satria Unsri.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner"; // Import your LoadingSpinner component

const CheckDataMahasiswa = ({ onConnect }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const connctWallet = async () => {
    setIsLoading(true);
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        if (onConnect) {
          onConnect(accounts[0]);
        }
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("MetaMask not installed");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-screen flex justify-center items-center bg-[#31323E]">
          <div className="w-[538px] h-[638px] bg-white rounded-md flex flex-col justify-center p-5">
            <div className="flex justify-center mb-4">
              <img
                src={SatriaUnsri}
                alt="logo Satria Unsri"
                className="w-[334px] text-center"
              />
            </div>
            <div className="pl-4">
              <h1 className="text-xl font-bold mb-4">Verifikasi Data Anda</h1>
              <p className="text-gray-600 mb-4">
                Mohon periksa apakah data berikut adalah benar data Anda:
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full bg-gray-100 p-4 rounded lg">
                <p className="text-sm text-gray-500 mb-1">Nama</p>
                <p className="font-medium">Muhammad Achalendra Feroz</p>
              </div>
              <div className="w-full bg-gray-100 p-4 rounded lg">
                <p className="text-sm text-gray-500 mb-1">NIM</p>
                <p className="font-medium">09031282126050</p>
              </div>
              <div className="w-full bg-gray-100 p-4 rounded lg mb-4">
                <p className="text-sm text-gray-500 mb-1">Program Studi</p>
                <p className="font-medium">Sistem Informasi</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={connctWallet}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-md font-medium flex items-center justify-center"
              >
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </motion.button>
              <button
                className="w-full py-3 px-4 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => window.history.back()}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CheckDataMahasiswa;
