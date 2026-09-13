import React from 'react';
import { FileText, Printer, Receipt } from 'lucide-react';

interface PrintWidgetProps {
  onPrintReceipt: () => void; // Cetak Struk
  onPrintInvoice: () => void; // Cetak Kuitansi
}

export const PrintWidget: React.FC<PrintWidgetProps> = ({
  onPrintReceipt,
  onPrintInvoice,
}) => {
  return (
    <div className="relative w-full rounded-2xl shadow-md overflow-hidden border border-indigo-200">
      {/* Widget Header */}
      <div className="bg-[#5663f6] text-white px-4 py-2 font-bold text-sm tracking-wide shadow-xs flex items-center justify-between">
        <span>Cetak</span>
        <Printer className="w-4 h-4 opacity-80" />
      </div>

      {/* Widget Body */}
      <div className="bg-[#cbd6fb] p-3.5 sm:p-4 space-y-2.5">
        {/* Button: Cetak Struk */}
        <button
          type="button"
          onClick={onPrintReceipt}
          className="w-full bg-white hover:bg-indigo-50/80 active:bg-indigo-100 text-slate-800 border border-indigo-200/90 rounded-md py-2 px-3 text-xs sm:text-[13px] font-medium flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
        >
          <span className="font-semibold text-slate-800 group-hover:text-indigo-900">
            Cetak Struk
          </span>
          <Receipt className="w-4 h-4 text-[#5663f6]" />
        </button>

        {/* Button: Cetak Kuitansi */}
        <button
          type="button"
          onClick={onPrintInvoice}
          className="w-full bg-white hover:bg-indigo-50/80 active:bg-indigo-100 text-slate-800 border border-indigo-200/90 rounded-md py-2 px-3 text-xs sm:text-[13px] font-medium flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
        >
          <span className="font-semibold text-slate-800 group-hover:text-indigo-900">
            Cetak Kuitansi
          </span>
          <FileText className="w-4 h-4 text-[#5663f6]" />
        </button>
      </div>

      {/* Decorative percentage / document badge at bottom-left */}
      <div className="absolute bottom-2 left-2.5 w-4 h-4 rounded-xs bg-[#333ed8] text-white flex items-center justify-center text-[9px] font-bold opacity-80 pointer-events-none">
        <span className="leading-none">%</span>
      </div>
    </div>
  );
};
