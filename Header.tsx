
import React from 'react';
import { Droplets } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Vocht<span className="text-blue-600">Expert</span></span>
        </div>
        <div className="hidden md:block text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
          Bouwkundige Vocht Diagnose
        </div>
      </div>
    </header>
  );
};