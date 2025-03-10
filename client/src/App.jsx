import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CheckDataMahasiswa from "./CheckDataMahasiswa";
import Dashboard from "./Dashboard";
import InputSertifikatForm from "./InputSertifikatForm";
import Minting from "./Minting";
import SertifikatPrestasi from "./SertifikatPrestasi";
import SertifikatMagang from "./SertifikatMagang";
import SertifikatSeminar from "./SertifikatSeminar";
import SertifikatOrganisasi from "./SertifikatOrganisasi";
import { StudentProvider } from "./StudentContext";

function App() {
  const [walletAddress, setWalletAddress] = useState(() => {
    return localStorage.getItem("walletAddress") || "";
  });
  const [nim, setNim] = useState(() => {
    return localStorage.getItem("nim") || "";
  });

  useEffect(() => {
    localStorage.setItem("walletAddress", walletAddress);
    localStorage.setItem("nim", nim);
  }, [walletAddress, nim]);

  const handleLogin = (username, nim) => {
    setWalletAddress(username);
    setNim(nim);
  };

  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/checkdatamahasiswa"
            element={
              <CheckDataMahasiswa onConnect={setWalletAddress} nim={nim} />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard walletAddress={walletAddress} />}
          />
          <Route
            path="/input-sertifikat"
            element={<InputSertifikatForm walletAddress={walletAddress} />}
          />
          <Route
            path="/minting"
            element={<Minting walletAddress={walletAddress} />}
          />
          <Route path="/sertifikat-prestasi/:id" element={<SertifikatPrestasi />} />
          <Route path="/sertifikat-magang/:id" element={<SertifikatMagang />} />
          <Route path="/sertifikat-seminar/:id" element={<SertifikatSeminar />} />
          <Route path="/sertifikat-organisasi/:id" element={<SertifikatOrganisasi />}
          />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;