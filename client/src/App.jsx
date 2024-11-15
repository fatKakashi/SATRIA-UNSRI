import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import CheckDataMahasiswa from "./CheckDataMahasiswa";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/checkdatamahasiswa" element={<CheckDataMahasiswa/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
