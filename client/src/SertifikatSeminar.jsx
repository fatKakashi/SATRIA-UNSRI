import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PencilIcon as CalligraphyIcon } from "lucide-react";

export default function SertifikatKeilmuan() {
  const { id } = useParams(); // get certificate id from URL params
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/submissions");
        // Filter for a single certificate matching the id, type, and status
        const matchedCertificate = response.data.find(
          (submission) =>
            submission._id === id &&
            submission.type === "seminar_keilmuan" &&
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
      className="w-[800px] h-[600px] bg-white relative p-8 border-8 border-double border-yellow-500"
    >
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-black" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-black" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-black" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-black" />

        {/* Certificate Content */}
        <div className="flex flex-col items-center justify-between h-full text-black">
          {/* Header Section */}
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center border-4 border-black">
                <CalligraphyIcon className="w-8 h-8 text-black" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-wide mb-2">
                CERTIFICATE
              </h1>
              <p className="text-xl tracking-wider">OF APPRECIATION</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <p className="text-lg">
              This certificate is proudly presented to
            </p>
            <h2 className="text-3xl font-serif italic border-b-2 border-yellow-500 pb-2 px-12 inline-block">
              {certificate.studentName}
            </h2>
            <p className="text-gray-700 leading-relaxed px-12">
              For outstanding participation and valuable contribution in the Web Development Workshop Series. 
              Your dedication and enthusiasm have significantly enriched our learning community.
            </p>
          </div>

          {/* Signature Section */}
          <div className="text-center">
            <div className="w-64 border-t-2 border-black mt-16 pt-2">
              <p className="font-bold">David Anderson</p>
              <p className="text-sm text-gray-600">Workshop Director</p>
            </div>
          </div>
        </div>

        {/* Decorative Curves */}
        <div className="absolute top-0 right-0 w-64 h-64">
          <div className="absolute top-8 right-0 w-full h-1 bg-yellow-500 transform -rotate-45" />
          <div className="absolute top-16 right-0 w-full h-1 bg-yellow-500 transform -rotate-45" />
        </div>
      </div>
    </div>
  );
}
