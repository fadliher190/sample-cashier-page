import React from 'react';
import doctorImg from '../assets/images/female_doctor_1789268726685.jpg';
import { CheckCircle2 } from 'lucide-react';

interface DoctorIllustrationProps {
  doctorName?: string;
}

export const DoctorIllustration: React.FC<DoctorIllustrationProps> = ({
  doctorName = 'dr. Fauziah',
}) => {
  return (
    <div className="relative flex flex-col items-center justify-end select-none">
      {/* Tooltip / Speech bubble badge */}
      <div className="mb-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-indigo-100 flex items-center space-x-1.5 text-xs text-slate-700 animate-fade-in">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
        <span className="font-semibold text-slate-800">{doctorName}</span>
        <span className="text-[11px] text-slate-500 hidden sm:inline">• SIP Aktif</span>
      </div>

      {/* Doctor Image with cutout / smooth blending effect */}
      <div className="relative w-44 sm:w-52 md:w-56 h-auto overflow-hidden drop-shadow-xl rounded-b-2xl">
        <img
          src={doctorImg}
          alt={doctorName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-bottom filter contrast-[1.02] brightness-[1.01]"
        />
        {/* Soft bottom gradient to merge into container */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#cbd6fb]/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
