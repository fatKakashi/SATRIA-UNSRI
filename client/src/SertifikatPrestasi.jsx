import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Award, CheckCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Import uuid package
import logoSatriaUnsri from "./assets/images/Satria Unsri.png";

export default function SertifikatPrestasi() {
  const { id } = useParams(); // Get certificate id from URL
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/submissions"
        );
        // Find the certificate with the matching id, type, and approved status
        const matchedCertificate = response.data.find(
          (submission) =>
            submission._id === id &&
            submission.type === "prestasi_lomba" &&
            submission.status === "approved"
        );
        setCertificate(matchedCertificate);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    };

    fetchCertificate();
  }, [id]);

  if (!certificate) {
    return <div>Loading certificate...</div>;
  }

  const credentialId = uuidv4(); // Generate a unique UUID for the credential

  return (
    <div
      id="certificate-container"
      className="w-full max-w-4xl mx-auto p-8 bg-white relative"
    >
      {/* Geometric Decorations */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-yellow-500/10 rounded-br-[100px]" />
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-yellow-500/10 rounded-tl-[100px]" />

      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-2 text-slate-700">
          <CheckCircle className="h-8 w-8 text-yellow-600" />
          <div>
            <img
              src={logoSatriaUnsri}
              alt="Logo Satria Unsri"
              className="w-[200px]"
            />
            <p className="text-sm">Excellence in Education</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-12 w-12 text-yellow-600" />
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-600">
              Certificate of Achievement
            </p>
            <p className="text-xs text-slate-500">Awarded by SATRIA UNSRI</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">CERTIFICATE</h1>
        <h2 className="text-xl text-slate-600 mb-8">Of Achievement</h2>

        <p className="text-slate-600 mb-8">
          This Certificate is Proudly Presented to
        </p>

        <div className="mb-8">
          <h3 className="text-3xl font-serif italic text-slate-800 border-b-2 border-slate-200 inline-block px-12 py-2">
            {certificate.studentName}
          </h3>
        </div>

        <p className="text-slate-600 max-w-2xl mx-auto mb-16">
          In recognition of exceptional achievement, this certificate is
          presented to {certificate.namaPrestasi} for remarkable performance in{" "}
          {certificate.prestasiLomba} at {certificate.namaKegiatan}, organized
          by {certificate.penyelenggara} in {certificate.tahunKegiatan}, and
          acknowledged at the {certificate.tingkat} level.
        </p>
      </div>

      <p className="text-slate-600 text-lg mb-4 text-center">
        Credential ID: <strong>{credentialId}</strong>
      </p>

      {/* Footer */}
      <div className="flex justify-around items-center mt-16">
        <div className="text-center">
          <div className="w-40 border-b border-slate-300 mb-2"></div>
          <p className="text-sm text-slate-600">Year</p>
          <p className="text-slate-800">{certificate.tahunKegiatan}</p>
        </div>

        <div className="text-center">
          <div className="w-40 border-b border-slate-300 mb-2"></div>
          <p className="text-sm text-slate-600">APPROVED BY</p>
          <p className="font-serif italic text-slate-800">
            Director of Education
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <div className="w-8 h-8 border-2 border-teal-500/30 rotate-45" />
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <div className="w-8 h-8 border-2 border-teal-500/30 rotate-45" />
      </div>
    </div>
  );
}
