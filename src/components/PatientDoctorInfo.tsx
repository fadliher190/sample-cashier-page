import React from 'react';
import { DoctorInfo, PatientInfo } from '../types';

interface PatientDoctorInfoProps {
  patient: PatientInfo;
  doctor: DoctorInfo;
}

export const PatientDoctorInfo: React.FC<PatientDoctorInfoProps> = ({
  patient,
  doctor,
}) => {
  return (
    <div className="bg-white px-5 sm:px-8 py-4 sm:py-5 border-b border-indigo-100/80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-[13px] sm:text-[14px] text-slate-800">
        {/* Column 1 */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-[90px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">ID</span>
            <span className="text-slate-500">:</span>
            <span className="font-semibold text-slate-900">{patient.id}</span>
          </div>
          <div className="grid grid-cols-[90px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">Tanggal</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-800">{patient.datetime}</span>
          </div>
          <div className="grid grid-cols-[90px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">Nomor RM</span>
            <span className="text-slate-500">:</span>
            <span className="font-semibold text-slate-900">{patient.medicalRecordNumber}</span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-[100px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">Nama</span>
            <span className="text-slate-500">:</span>
            <span className="font-semibold text-slate-900">{patient.name}</span>
          </div>
          <div className="grid grid-cols-[100px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">Jenis Kelamin</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-800">{patient.gender}</span>
          </div>
          <div className="grid grid-cols-[100px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">Tanggal Lahir</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-800">{patient.birthDate}</span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-[105px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">Nama Dokter</span>
            <span className="text-slate-500">:</span>
            <span className="font-semibold text-slate-900">{doctor.name}</span>
          </div>
          <div className="grid grid-cols-[105px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">NIP</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-800 tracking-tight">{doctor.nip}</span>
          </div>
          <div className="grid grid-cols-[105px_10px_1fr] items-center">
            <span className="font-semibold text-slate-700">SIP</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-800 tracking-tight">{doctor.sip}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
