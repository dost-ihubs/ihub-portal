import React from "react";
import { FooterSection } from "../components/LandingSections";

interface FindPageProps {
  mapComponent?: React.ReactNode;
  sidebarComponent?: React.ReactNode;
}

export default function FindPage({ mapComponent, sidebarComponent }: FindPageProps) {
  return (
    <div className="flex flex-col bg-slate-50 overflow-x-hidden relative min-h-screen">
      <div className="flex-1 pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center">
        <span className="inline-block px-4 py-1.5 bg-sky-50 text-slate-800 border border-sky-100 rounded-full text-sm font-dmsans font-medium mb-6">
          Directory
        </span>
        <h2 className="text-4xl lg:text-5xl font-medium text-[#002E6A] font-poppins tracking-tight text-center mb-12">Find an iHub near you</h2>

        {/* Map Container */}
        <div className="w-full max-w-[1400px] h-[700px] bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200 flex flex-col lg:grid lg:grid-cols-[1fr_380px] relative">
          {mapComponent}
          {sidebarComponent}
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
