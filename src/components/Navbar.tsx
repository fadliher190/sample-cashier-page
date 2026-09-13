import React from 'react';
import cashRegisterImg from '../assets/images/cash_register_3d_1789268706453.jpg';

interface NavbarProps {
  onReset?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <header className="relative bg-gradient-to-r from-[#707af4] via-[#7b85f6] to-[#8893fa] px-6 sm:px-8 py-3.5 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between shadow-sm overflow-visible">
      {/* Brand Logo */}
      <div className="flex items-baseline space-x-1 select-none">
        <span className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight drop-shadow-sm font-sans">
          eClinic
        </span>
        <span className="text-white font-serif italic text-2xl sm:text-3xl font-medium tracking-wide">
          leap!
        </span>
      </div>

      {/* Center Subtitle or Clinic Info (Visible on medium+ screens) */}
      <div className="hidden md:flex items-center space-x-2 text-white/90 text-xs font-medium bg-white/15 px-3 py-1 rounded-full border border-white/20">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Modul Kasir & Billing Pembayaran Pasien</span>
      </div>

      {/* Cash Register 3D Graphic positioned popping out */}
      <div className="relative flex items-center space-x-3">
        {onReset && (
          <button
            onClick={onReset}
            title="Reset data ke bawaan awal"
            className="hidden sm:inline-flex text-xs bg-white/20 hover:bg-white/30 text-white font-medium px-3 py-1 rounded-lg border border-white/25 transition-colors"
          >
            Reset Contoh
          </button>
        )}
        <div className="w-16 h-16 sm:w-20 sm:h-20 -my-4 relative z-20 flex-shrink-0 drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
          <img
            src={cashRegisterImg}
            alt="3D Kasir POS Machine"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </div>
      </div>
    </header>
  );
};
