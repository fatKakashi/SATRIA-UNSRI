"use client"

import { useContext, useEffect, useState } from "react"
import { User, Home, Upload, LogOut, ChevronDown, CloudDownload } from "lucide-react"
import { useNavigate } from "react-router-dom"
import logoSatriaUnsri from "./assets/images/Satria Unsri.png"
import { StudentContext } from "./StudentContext.jsx"
import axios from "axios"
import { useNotification } from "./notification.jsx"

const InputSertifikatForm = ({ walletAddress }) => {
  const Navigate = useNavigate()
  const { studentData, setStudentData } = useContext(StudentContext)
  const [loading, setLoading] = useState(true)
  const { showNotification, NotificationComponent } = useNotification()

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const nim = localStorage.getItem("nim")
        if (nim) {
          const response = await axios.get(`http://localhost:3001/checkdatamahasiswa/${nim}`)
          setStudentData(response.data)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching student data:", error)
        setLoading(false)
      }
    }

    if (!studentData) {
      fetchStudentData()
    } else {
      setLoading(false)
    }
  }, [studentData, setStudentData])

  const handleDashboard = () => {
    Navigate("/dashboard")
  }

  const handleLogout = () => {
    Navigate("/")
  }

  const handleMinting = () => {
    Navigate("/minting")
  }

  const [selectedFormType, setSelectedFormType] = useState("Prestasi Lomba")
  const [formData, setFormData] = useState({
    namaKegiatan: "",
    tingkat: "",
    tahunKegiatan: "",
    fotoSertifikat: null,
    dokumenPendukung: null,
    prestasiLomba: "",
    namaPrestasi: "",
    namaOrganisasi: "",
    namaSeminar: "",
    posisi: "",
    penyelenggara: "",
    namaPerusahaan: "",
    jabatan: "",
  })

  const formTypes = ["Prestasi Lomba", "Magang/Studi Independen", "Seminar Keilmuan", "Organisasi"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (name, file) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!studentData) {
      console.error("Student data is not available")
      return
    }
    const data = new FormData()
    for (const key in formData) {
      data.append(key, formData[key])
    }
    data.append("nim", studentData.nim)

    let endpoint
    switch (selectedFormType) {
      case "Magang/Studi Independen":
        endpoint = "http://localhost:3001/api/sertifikat/magang-studi-independen"
        break
      case "Organisasi":
        endpoint = "http://localhost:3001/api/sertifikat/organisasi"
        break
      case "Seminar Keilmuan":
        endpoint = "http://localhost:3001/api/sertifikat/seminar-keilmuan"
        break
      default:
        endpoint = "http://localhost:3001/api/sertifikat/prestasi-lomba"
    }

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(response.data)

      // Show success notification
      showNotification("Sertifikat berhasil disubmit!", "success")

      // Reset form after successful submission
      setFormData({
        namaKegiatan: "",
        tingkat: "",
        tahunKegiatan: "",
        fotoSertifikat: null,
        dokumenPendukung: null,
        prestasiLomba: "",
        namaPrestasi: "",
        namaOrganisasi: "",
        namaSeminar: "",
        posisi: "",
        penyelenggara: "",
        namaPerusahaan: "",
        jabatan: "",
      })
    } catch (error) {
      console.log("Error submitting form:", error)
      if (error.response) {
        console.log("Server responded with:", error.response.data)
      }

      // Show error notification
      showNotification("Gagal mengirim sertifikat. Silakan coba lagi.", "error")
    }
  }

  const renderFormFields = () => {
    switch (selectedFormType) {
      case "Magang/Studi Independen":
        return (
          <>
            <div>
              <label className="block mb-2">Nama Perusahaan/Mitra</label>
              <input
                type="text"
                name="namaPerusahaan"
                value={formData.namaPerusahaan}
                onChange={handleInputChange}
                placeholder="Masukkan nama perusahaan"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Posisi</label>
              <input
                type="text"
                name="posisi"
                value={formData.posisi}
                onChange={handleInputChange}
                placeholder="Masukkan posisi"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tahun</label>
              <input
                type="text"
                name="tahunKegiatan"
                value={formData.tahunKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan tahun"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
          </>
        )
      case "Organisasi":
        return (
          <>
            <div>
              <label className="block mb-2">Nama Organisasi</label>
              <input
                type="text"
                name="namaOrganisasi"
                value={formData.namaOrganisasi}
                onChange={handleInputChange}
                placeholder="Masukkan nama organisasi"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tingkat</label>
              <select
                name="tingkat"
                value={formData.tingkat}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              >
                <option value="">Pilih Tingkat</option>
                <option value="universitas">Universitas</option>
                <option value="nasional">Nasional</option>
                <option value="internasional">Internasional</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Jabatan</label>
              <input
                type="text"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleInputChange}
                placeholder="Masukkan posisi"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tahun</label>
              <input
                type="text"
                name="tahunKegiatan"
                value={formData.tahunKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan tahun"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
          </>
        )
      case "Seminar Keilmuan":
        return (
          <>
            <div>
              <label className="block mb-2">Nama Kegiatan</label>
              <input
                type="text"
                name="namaKegiatan"
                value={formData.namaKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan nama seminar"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Penyelenggara</label>
              <input
                type="text"
                name="penyelenggara"
                value={formData.penyelenggara}
                onChange={handleInputChange}
                placeholder="Masukkan nama penyelenggara"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tahun</label>
              <input
                type="text"
                name="tahunKegiatan"
                value={formData.tahunKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan tahun"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
          </>
        )
      default:
        return (
          <>
            <div>
              <label className="block mb-2">Prestasi Lomba</label>
              <select
                name="prestasiLomba"
                value={formData.prestasiLomba}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              >
                <option value="">Pilih Prestasi Lomba</option>
                <option value="akademik">Akademik</option>
                <option value="non-akademik">Non-Akademik</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Nama Kegiatan</label>
              <input
                type="text"
                name="namaKegiatan"
                value={formData.namaKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan nama kegiatan"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tahun</label>
              <input
                type="text"
                name="tahunKegiatan"
                value={formData.tahunKegiatan}
                onChange={handleInputChange}
                placeholder="Masukkan tahun"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Penyelenggara</label>
              <input
                type="text"
                name="penyelenggara"
                value={formData.penyelenggara}
                onChange={handleInputChange}
                placeholder="Masukkan nama penyelenggara"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Tingkat</label>
              <select
                name="tingkat"
                value={formData.tingkat}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              >
                <option value="">Pilih Tingkat</option>
                <option value="universitas">Universitas</option>
                <option value="nasional">Nasional</option>
                <option value="internasional">Internasional</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Nama Prestasi</label>
              <input
                type="text"
                name="namaPrestasi"
                value={formData.namaPrestasi}
                onChange={handleInputChange}
                placeholder="Masukkan nama prestasi"
                className="w-full p-3 rounded-lg bg-white text-black"
                required
              />
            </div>
          </>
        )
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Render the notification component */}
      {NotificationComponent}

      <div className="w-64 bg-yellow-300 p-6 flex flex-col fixed h-screen">
        <div className="flex items-center gap-2 mb-12">
          <img src={logoSatriaUnsri || "/placeholder.svg"} alt="logo Satria Unsri" />
        </div>
        <nav className="flex-1">
          <div className="space-y-2">
            <button
              onClick={handleDashboard}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-gray-800 text-white">
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
      <div className="flex-1 p-8 ml-64">
        <div className="max-88 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Input Sertifikat</h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-yellow-300 rounded-full text-sm">Connected</span>
              <span className="px-3 py-1 bg-black text-white rounded-full text-sm">
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Not Connected"}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <select
                value={selectedFormType}
                onChange={(e) => setSelectedFormType(e.target.value)}
                className="w-full p-4 pr-10 bg-white border rounded-lg appearance-none cursor-pointer"
              >
                {formTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 text-white">
            <div className="space-y-6">
              {renderFormFields()}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Foto Sertifikat</label>
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange("fotoSertifikat", e.target.files[0])}
                      className="hidden"
                      id="fotoSertifikat"
                    />
                    <label htmlFor="fotoSertifikat" className="cursor-pointer">
                      <Upload className="mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Drag your file(s) to start uploading</p>
                      <p className="text-sm text-gray-400 mt-1">OR</p>
                      <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                        Browse files
                      </button>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block mb-2">Dokumen Pendukung</label>
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange("dokumenPendukung", e.target.files[0])}
                      className="hidden"
                      id="dokumenPendukung"
                    />
                    <label htmlFor="dokumenPendukung" className="cursor-pointer">
                      <Upload className="mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Drag your file(s) to start uploading</p>
                      <p className="text-sm text-gray-400 mt-1">OR</p>
                      <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                        Browse files
                      </button>
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-yellow-300 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InputSertifikatForm

