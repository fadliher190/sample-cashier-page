import React, { useState } from 'react';
import { DiscountMode, DiscountState } from '../types';
import { formatNumber } from '../utils/formatters';
import { Percent } from 'lucide-react';

interface DiscountWidgetProps {
  onApplyDiscount: (mode: DiscountMode, value: number) => void;
  currentDiscount: DiscountState;
}

export const DiscountWidget: React.FC<DiscountWidgetProps> = ({
  onApplyDiscount,
  currentDiscount,
}) => {
  const [mode, setMode] = useState<DiscountMode>(currentDiscount.mode || 'rupiah');
  const [inputValue, setInputValue] = useState<string>(
    currentDiscount.value ? currentDiscount.value.toString() : '0'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(inputValue.replace(/\D/g, '')) || 0;
    onApplyDiscount(mode, num);
  };

  return (
    <div className="relative w-full rounded-2xl shadow-md overflow-hidden border border-indigo-200">
      {/* Widget Header */}
      <div className="bg-[#5663f6] text-white px-4 py-2 font-bold text-sm tracking-wide shadow-xs">
        Jenis Diskon
      </div>

      {/* Widget Body */}
      <div className="bg-[#cbd6fb] p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 space-y-3">
        {/* Radio Options */}
        <div className="flex items-center space-x-5 text-slate-800 font-medium">
          <label className="inline-flex items-center space-x-1.5 cursor-pointer">
            <input
              type="radio"
              name="discount_mode"
              checked={mode === 'percentage'}
              onChange={() => setMode('percentage')}
              className="accent-[#333ed8] cursor-pointer"
            />
            <span>Persentase</span>
          </label>

          <label className="inline-flex items-center space-x-1.5 cursor-pointer">
            <input
              type="radio"
              name="discount_mode"
              checked={mode === 'rupiah'}
              onChange={() => setMode('rupiah')}
              className="accent-[#333ed8] cursor-pointer"
            />
            <span>Rupiah</span>
          </label>
        </div>

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-800 select-none">Diskon:</span>
            <div className="flex items-center bg-white border border-indigo-300 rounded overflow-hidden flex-1 shadow-2xs">
              <span className="bg-indigo-50/80 px-2 py-1 text-slate-700 font-medium text-xs border-r border-indigo-200 select-none">
                {mode === 'rupiah' ? 'Rp' : '%'}
              </span>
              <input
                type="text"
                value={inputValue === '0' ? '0' : formatNumber(Number(inputValue.replace(/\D/g, '')) || 0)}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '');
                  setInputValue(cleaned || '0');
                }}
                className="w-full px-2 py-1 text-right text-slate-900 font-semibold text-xs sm:text-sm outline-hidden"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="bg-[#333ed8] hover:bg-[#252fb6] active:bg-[#1f269a] text-white text-xs font-semibold py-1.5 px-4 rounded-md shadow transition-colors cursor-pointer"
            >
              Berikan Diskon
            </button>
          </div>
        </form>
      </div>

      {/* Decorative percentage icon tag at bottom-left */}
      <div className="absolute bottom-2 left-2.5 w-4 h-4 rounded-xs bg-[#333ed8] text-white flex items-center justify-center text-[9px] font-bold opacity-80 pointer-events-none">
        <Percent className="w-2.5 h-2.5 stroke-[2.5]" />
      </div>
    </div>
  );
};
