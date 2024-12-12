import React from "react";
import { Award, CheckCircle } from "lucide-react";
import logoSatriaUnsri from "./assets/images/Satria Unsri.png";

export default function SertifikatPrestasi({
  recipientName = "John Smith",
  date = "December 2, 2023",
  companyName = "ACME Corporation",
  description = "For outstanding achievement and dedication in completing the Advanced Web Development Program, demonstrating exceptional skills and commitment to excellence in software engineering.",
}) {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white relative">
      {/* Geometric Decorations */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-teal-500/10 rounded-br-[100px]" />
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-teal-500/10 rounded-tl-[100px]" />

      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex items-center gap-2 text-slate-700">
          <CheckCircle className="h-8 w-8 text-teal-600" />
          <div>
            <img src={logoSatriaUnsri} alt="Lodo Satria Unsri" className="w-[200px]"/>
            <p className="text-sm">Excellence in Education</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-12 w-12 text-teal-600" />
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-600">
              Premium Quality
            </p>
            <p className="text-xs text-slate-500">EST 2023</p>
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
            {recipientName}
          </h3>
        </div>

        <p className="text-slate-600 max-w-2xl mx-auto mb-16">{description}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-around items-center mt-16">
        <div className="text-center">
          <div className="w-40 border-b border-slate-300 mb-2"></div>
          <p className="text-sm text-slate-600">DATE</p>
          <p className="text-slate-800">{date}</p>
        </div>

        <div className="text-center">
          <div className="w-40 border-b border-slate-300 mb-2"></div>
          <p className="text-sm text-slate-600">SIGNATURE</p>
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
