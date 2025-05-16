import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Medal } from "lucide-react";
import { v4 as uuidv4 } from "uuid";  // Import the UUID package

export default function SertifikatMagang() {
  const { id } = useParams(); // Get certificate id from URL params
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/submissions");
        // Find the certificate matching the id, type, and approved status
        const matchedCertificate = response.data.find(
          (submission) =>
            submission._id === id &&
            submission.type === "magang_studi_independen" &&
            submission.status === "approved"
        );
        if (matchedCertificate) {
          // Add a unique Credential ID for the certificate
          matchedCertificate.credentialId = uuidv4();
        }
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

  return (
    <div
      id="certificate-container"
      className="relative w-full max-w-4xl aspect-[1.4/1] bg-black rounded-lg p-8 shadow-2xl"
    >
      {/* Border Frame */}
      <div className="absolute inset-4 border-2 border-yellow-400" />
      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-yellow-400" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-4 border-r-4 border-yellow-400" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-4 border-l-4 border-yellow-400" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-yellow-400" />
      
      {/* Corner Ornaments */}
      <svg
        className="absolute top-6 left-6 w-32 h-32 text-yellow-400"
        viewBox="0 0 100 100"
      >
        <path
          d="M0,50 Q25,0 50,50 T100,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20,80 Q35,65 50,80 T80,80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute top-6 right-6 w-32 h-32 text-yellow-400 scale-x-[-1]"
        viewBox="0 0 100 100"
      >
        <path
          d="M0,50 Q25,0 50,50 T100,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20,80 Q35,65 50,80 T80,80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute bottom-6 left-6 w-32 h-32 text-yellow-400 scale-y-[-1]"
        viewBox="0 0 100 100"
      >
        <path
          d="M0,50 Q25,0 50,50 T100,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20,80 Q35,65 50,80 T80,80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute bottom-6 right-6 w-32 h-32 text-yellow-400 scale-x-[-1] scale-y-[-1]"
        viewBox="0 0 100 100"
      >
        <path
          d="M0,50 Q25,0 50,50 T100,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20,80 Q35,65 50,80 T80,80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* Certificate Content */}
      <div className="relative h-full flex flex-col items-center justify-between text-center z-10 py-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl font-serif text-yellow-400 tracking-wide">
            CERTIFICATE
          </h1>
          <h2 className="text-2xl text-yellow-400 tracking-wider">
            OF APPRECIATION
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8 max-w-2xl">
          <p className="text-white text-lg">
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </p>
          <h3 className="text-4xl font-serif text-yellow-400 italic border-b-2 border-yellow-400 pb-2">
            {certificate.studentName}
          </h3>
          <p className="text-white text-lg leading-relaxed">
            This certificate is awarded for the contribution as {certificate.posisi} at {certificate.namaPerusahaan} in {certificate.tahunKegiatan}, demonstrating excellence and competency in the field.
          </p>
        </div>

        {/* Credential ID */}
        <p className="text-sm text-gray-400 mt-4">
          <strong>Credential ID:</strong> {certificate.credentialId}
        </p>

        {/* Footer */}
        <div className="w-full flex items-center justify-between mt-8 px-12">
          <div className="flex flex-col items-center">
            <div className="w-48 border-b border-yellow-400" />
            <p className="text-white mt-2">Morgan Maxwell</p>
            <p className="text-sm text-gray-400">Head of Event</p>
          </div>

          {/* Certificate Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                <Medal className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 border-b border-yellow-400" />
            <p className="text-white mt-2">Daniel Gallego</p>
            <p className="text-sm text-gray-400">Mentor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
