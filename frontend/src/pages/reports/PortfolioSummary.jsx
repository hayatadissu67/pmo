import React from 'react';
import { DollarSign, PieChart, Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function PortfolioSummary() {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm mt-6">
      <h3 className="text-sm font-bold text-slate-800 mb-3">Portfolio Summary</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/60 flex items-center gap-2.5">
          <div className="p-2 bg-blue-100 rounded-md text-blue-600"><DollarSign className="w-4 h-4" /></div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Total Budget</span>
            <span className="text-sm font-bold text-slate-800">$12.45M</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/60 flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 rounded-md text-emerald-600"><PieChart className="w-4 h-4" /></div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Actual Spend</span>
            <span className="text-sm font-bold text-slate-800">$7.85M</span>
          </div>
        </div>

        <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100/60 flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 rounded-md text-amber-600"><DollarSign className="w-4 h-4" /></div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Remaining</span>
            <span className="text-sm font-bold text-slate-800">$4.60M</span>
          </div>
        </div>

        <div className="p-3 bg-teal-50/50 rounded-lg border border-teal-100/60 flex items-center gap-2.5">
          <div className="p-2 bg-teal-100 rounded-md text-teal-600"><Activity className="w-4 h-4" /></div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Avg Progress</span>
            <span className="text-sm font-bold text-slate-800">63%</span>
          </div>
        </div>

        <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/60 flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 rounded-md text-emerald-600"><CheckCircle className="w-4 h-4" /></div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">On Track</span>
            <span className="text-sm font-bold text-slate-800">14 (58.33%)</span>
          </div>
        </div>

        <div className="p-3 bg-red-50/50 rounded-lg border border-red-100/60 flex items-center gap-2.5">
          <div className="p-2 bg-red-100 rounded-md text-red-600"><XCircle className="w-4 h-4" /></div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Critical</span>
            <span className="text-sm font-bold text-slate-800">3 (12.50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}