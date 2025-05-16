import { useContext, useState, useEffect } from "react";
import {
  User,
  HomeIcon as House,
  Upload,
  LogOut,
  CloudDownload,
  X,
} from "lucide-react";
import logoSatriaUnsri from "./assets/images/Satria Unsri.png";
import { useNavigate } from "react-router-dom";
import imageDefault from "./assets/images/default image.jpg";
import { StudentContext } from "./StudentContext.jsx";
import axios from "axios";

const Dashboard = ({ walletAddress }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const navigate = useNavigate();
  const { studentData, setStudentData } = useContext(StudentContext);
  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [unmintedNFTs, setUnmintedNFTs] = useState([]);
  const [stats, setStats] = useState({
    minted: 0,
    unminted: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const nim = localStorage.getItem("nim");
        if (nim) {
          const response = await axios.get(
            `http://localhost:3001/checkdatamahasiswa/${nim}`
          );
          setStudentData(response.data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (!studentData) {
      fetchStudentData();
    }
  }, [studentData, setStudentData]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const nim = localStorage.getItem("nim");
        if (nim) {
          // Fetch minted NFTs
          const mintedResponse = await axios.get(
            `http://localhost:3001/api/submissions/minted/${nim}`
          );
          setMintedNFTs(mintedResponse.data);

          // Fetch unminted but approved NFTs
          const unmintedResponse = await axios.get(
            `http://localhost:3001/api/submissions/approved`
          );
          const studentUnminted = unmintedResponse.data.filter(
            (nft) => nft.nim === nim
          );
          setUnmintedNFTs(studentUnminted);

          // Update stats
          setStats({
            minted: mintedResponse.data.length,
            unminted: studentUnminted.length,
            total: mintedResponse.data.length + studentUnminted.length,
          });
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    if (studentData) {
      fetchNFTs();
    }
  }, [studentData]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleInputSertifikat = () => {
    navigate("/input-sertifikat");
  };

  const handleMinting = () => {
    navigate("/minting");
  };

  const openModal = (nft) => {
    setSelectedNFT(nft);
  };

  const closeModal = () => {
    setSelectedNFT(null);
  };

  // Data placeholder untuk NFT overview
  const nftOverview = Array(8)
    .fill()
    .map((_, index) => ({
      id: index + 1,
      name: "Muhammad Achalendra Feroz",
      certificateType: "MBKM",
      year: "2023",
      activity: "Magang Merdeka Batch 5 Di Dikti",
      note: "Blockchain / Web3 Developer",
    }));

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-yellow-300 p-6 flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <img src={logoSatriaUnsri} alt="Logo Satria Unsri" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          <div className="space-y-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-gray-800 text-white">
              <House size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={handleInputSertifikat}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <Upload size={20} />
              <span>Input Sertifikat</span>
            </button>

            <button
              onClick={handleMinting}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <CloudDownload size={20} />
              <span>Minting</span>
            </button>
          </div>
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
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full p-3 mt-4 rounded-lg hover:bg-gray-800 hover:text-white"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">
              Selamat Datang,{" "}
              {studentData ? studentData.name.split(" ").pop() : "Loading..."}
            </h1>
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

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg bg-yellow-300">
              <div className="text-4xl font-bold mb-2">{stats.minted}</div>
              <div className="text-gray-700">Minted NFT</div>
            </div>

            <div className="p-6 rounded-lg bg-black text-white">
              <div className="text-4xl font-bold mb-2">{stats.unminted}</div>
              <div>Unminted NFT</div>
            </div>

            <div className="p-6 rounded-lg bg-yellow-300">
              <div className="text-4xl font-bold mb-2">{stats.total}</div>
              <div className="text-gray-700">Total NFT</div>
            </div>
          </div>

          {/* Overview Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Overview</h2>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 rounded-lg bg-black text-white">
                  <option>Semua Tipe NFT</option>
                </select>
                <select className="px-4 py-2 rounded-lg border">
                  <option>Sort</option>
                </select>
              </div>
            </div>

            {/* NFT Grid */}
            <div className="grid grid-cols-4 gap-6">
              {mintedNFTs.map((nft) => (
                <div key={nft._id} className="p-4 border rounded-lg">
                  <img
                    onClick={() => openModal(nft)}
                    src={nft.imageGatewayUrl || nft.imageUrl || imageDefault}
                    alt="nft image"
                    className="rounded-lg mb-4 w-full h-48 object-cover"
                  />
                  <div className="mt-2 text-sm font-medium">
                    {nft.type}
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Minted
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {selectedNFT && (
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
                          src={
                            selectedNFT.imageGatewayUrl ||
                            selectedNFT.imageUrl ||
                            imageDefault
                          }
                          alt="NFT Preview"
                          className="w-full aspect-square object-contain rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Right side - Details */}
                    <div className="w-full md:w-1/2 p-8 bg-gray-50">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Nama
                          </h3>
                          <p className="mt-1">{selectedNFT.studentName}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Jenis Sertifikat
                          </h3>
                          <p className="mt-1">{selectedNFT.type}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Tahun
                          </h3>
                          <p className="mt-1">{selectedNFT.tahunKegiatan}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Nama Kegiatan
                          </h3>
                          <p className="mt-1">{selectedNFT.namaKegiatan}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Note
                          </h3>
                          <p className="mt-1">{selectedNFT.note}</p>
                        </div>

                        <div className="mt-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                            Minted
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
