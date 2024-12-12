import React, { useContext, useState } from "react";
import { LogOut, HomeIcon as House, Upload, CloudDownload, X, User } from 'lucide-react';
import imageDefault from "./assets/images/default image.jpg";
import logoSatriaUnsri from "./assets/images/Satria Unsri.png";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "./StudentContext.jsx";

const Minting = ({ walletAddress }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const { studentData } = useContext(StudentContext);

  const Navigate = useNavigate();

  const handleLogout = () => {
    Navigate("/");
  };

  const handleInputSertifikat = () => {
    Navigate("/input-sertifikat");
  };

  const handleDashboard = () => {
    Navigate("/dashboard");
  };

  const nftCards = Array(12)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      name: "Muhammad Achalendra Feroz",
      certificateType: "MBKM",
      year: "2023",
      activity: "Magang Merdeka Batch 5 Di Dikti",
      note: "Blockchain / Web3 Developer",
    }));

  const openModal = (nft) => {
    if (!hasAgreed) {
      setShowTerms(true);
      setSelectedNFT(nft);
    } else {
      setSelectedNFT(nft);
      setIsMinting(false);
    }
  };

  const closeModal = () => {
    setSelectedNFT(null);
    setIsMinting(false);
    setShowTerms(false);
  };

  const handleMint = () => {
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      closeModal();
    }, 3000);
  };

  const handleAgree = () => {
    setHasAgreed(true);
    setShowTerms(false);
  };

  const scannerStyles = `
    @keyframes scan {
      0% {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
      }
      50% {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      100% {
        clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
      }
    }
  `;

  return (
    <div className="flex min-h-screen bg-white">
      <style>{scannerStyles}</style>
      {/* Sidebar */}
      <div className="w-64 bg-yellow-300 p-6 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <img src={logoSatriaUnsri} alt="Satria UNSRI Logo" />
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={handleDashboard}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white"
              >
                <House size={20} />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={handleInputSertifikat}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white"
              >
                <Upload size={20} />
                Input Sertifikat
              </button>
            </li>
            <li>
              <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-gray-800 text-white">
                <CloudDownload size={20} />
                Minting
              </button>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        {studentData ? (
        <div className="mt-auto">
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <div className="flex items-center gap-3">
              <User size={24} />
              <div>
                <div className="font-medium">{studentData.name}</div>
                <div className="text-sm text-gray-400">{studentData.nim}</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 mt-4 rounded-lg hover:bg-gray-800 hover:text-white"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-yellow-300 rounded-full text-sm">
              Connected
            </span>
            <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Not Connected"}
            </span>
          </div>
        </div>

        {/* NFT List Section */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daftar NFT Anda</h1>
          <select className="bg-black text-white px-4 py-2 rounded-md">
            <option>Semua Tipe NFT</option>
            <option>Art</option>
            <option>Collectible</option>
          </select>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nftCards.map((nft) => (
            <div key={nft.id} className="border rounded-lg p-4">
              <div
                className="aspect-square bg-gray-100 rounded-lg mb-4 cursor-pointer"
                onClick={() => openModal(nft)}
              >
                <img
                  src={imageDefault}
                  alt={`NFT ${nft.id}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <button
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => openModal(nft)}
              >
                MINT
              </button>
            </div>
          ))}
        </div>

        {/* Terms & Conditions Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-8">
              <h2 className="text-2xl font-bold mb-6">Terms & Condition</h2>
              <div className="space-y-4 mb-6">
                <p className="text-sm">
                  1. Sertifikat yang dihasilkan dari proses minting telah dikonversi ke dalam format NFT (Non-Fungible Token) sesuai standar blockchain Ethereum dengan mekanisme Proof of Authority.
                </p>
                <p className="text-sm">
                  2. Sertifikat yang diminting telah melalui proses validasi oleh admin universitas dan dijamin sesuai dengan data yang tersimpan dalam database lokal universitas.
                </p>
                <p className="text-sm">
                  3. Setelah proses minting selesai, sertifikat NFT akan terstandardisasi dan hanya dapat diakses melalui aplikasi SATRIA UNSRI menggunakan wallet terverifikasi pengguna.
                </p>
              </div>
              <button
                onClick={handleAgree}
                className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
              >
                SETUJU
              </button>
            </div>
          </div>
        )}

        {/* NFT Details Modal */}
        {selectedNFT && !showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full z-50"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="w-full md:w-1/2 p-8 relative">
                  <div className="relative">
                    <img
                      src={imageDefault}
                      alt="NFT Preview"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    {isMinting && (
                      <>
                        {/* Scanning overlay */}
                        <div className="absolute inset-0 bg-white bg-opacity-30 animate-[scan_2s_ease-in-out_infinite]" />

                        {/* Corner brackets */}
                        <div className="absolute inset-0">
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="w-full md:w-1/2 p-8 bg-gray-50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Nama
                      </h3>
                      <p className="mt-1">{selectedNFT.name}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Jenis Sertikast
                      </h3>
                      <p className="mt-1">{selectedNFT.certificateType}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Tahun
                      </h3>
                      <p className="mt-1">{selectedNFT.year}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Nama Kegiatan
                      </h3>
                      <p className="mt-1">{selectedNFT.activity}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Note
                      </h3>
                      <p className="mt-1">{selectedNFT.note}</p>
                    </div>

                    <button
                      className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium disabled:opacity-50"
                      onClick={handleMint}
                      disabled={isMinting}
                    >
                      {isMinting ? "MINTING..." : "MINT"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Minting;

