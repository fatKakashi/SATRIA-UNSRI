import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SertifikatOrganisasi() {
  const { id } = useParams(); // Get certificate id from URL
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/submissions");
        // Find the certificate matching the id, type, and approved status
        const matchedCertificate = response.data.find(
          (submission) =>
            submission._id === id &&
            submission.type === "organisasi" &&
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

  return (
    <div
      id="certificate-container"
      className="w-[800px] h-[600px] bg-white relative p-8"
    >
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Background Stripes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800 transform -skew-x-12" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-400 transform -skew-x-12 opacity-20" />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-2 font-serif tracking-wider text-gray-800">
            Certificate
          </h1>
          <h2 className="text-2xl font-serif tracking-wide text-yellow-400">
            of Recognition
          </h2>
        </div>

        {/* Award Text */}
        <div className="text-center mb-8 z-20">
          <p className="text-lg uppercase tracking-wide text-gray-700">
            THE FOLLOWING AWARD IS GIVEN TO
          </p>
        </div>

        {/* Recipient Name */}
        <div className="text-center mb-12 z-30">
          <h2 className="text-4xl font-serif italic text-blue-800">
            {certificate.studentName}
          </h2>
        </div>

        {/* Certificate Text */}
        <div className="text-center max-w-2xl mb-16 z-20">
          <p className="text-gray-700 leading-relaxed">
            This certificate is awarded for outstanding achievements and 
            exceptional contributions to organizational excellence, demonstrating 
            remarkable leadership and dedication to professional growth.
          </p>
        </div>

        {/* Signatures */}
        <div className="flex justify-center gap-24 mt-auto">
          <div className="text-center">
            <div className="w-48 border-t border-yellow-400 pt-2" />
            <p className="text-gray-800 mt-2">Robert Mitchell</p>
            <p className="text-sm text-gray-600">CHIEF EXECUTIVE OFFICER</p>
          </div>
          <div className="text-center z-30">
            <div className="w-48 border-t border-yellow-400 pt-2" />
            <p className="text-gray-800 mt-2">Sarah Parker</p>
            <p className="text-sm text-gray-600">BOARD DIRECTOR</p>
          </div>
        </div>

        {/* Decorative Seal */}
        <div className="absolute top-8 right-8">
          <div className="w-24 h-24 rounded-full bg-black border-4 border-yellow-400 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-yellow-400 flex items-center justify-center">
              <div className="text-yellow-400 text-xs text-center">
                <div className="font-serif">SEAL OF</div>
                <div className="font-serif">EXCELLENCE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-400" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-400" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-400" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-400" />
      </div>
    </div>
  );
}
