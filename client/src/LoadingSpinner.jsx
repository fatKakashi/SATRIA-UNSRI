import React from "react";
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg flex flex-col items-center space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-yellow-400" />
      <p className="text-gray-700">Menghubungkan ke MetaMask...</p>
    </div>
  </div>
);

export default LoadingSpinner;