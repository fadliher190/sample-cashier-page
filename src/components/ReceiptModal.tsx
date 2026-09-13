import React, { useRef } from 'react';
import { BillItem, DoctorInfo, PatientInfo, DiscountState, PaymentMethod } from '../types';
import { formatNumber, formatRupiah, terbilang } from '../utils/formatters';
import { Printer, X, Download, CheckCircle2 } from 'lucide-react';

interface ReceiptModalProps {
  type: 'struk' | 'kuitansi' | null;
  onClose: () => void;
  patient: PatientInfo;
  doctor: DoctorInfo;
  items: BillItem[];
  subtotal: number;
  discount: DiscountState;
  hasPpn: boolean;
  finalTotal: number;
  paidAmount: number;
  changeAmount: number;
  paymentMethod: PaymentMethod;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  type,
  onClose,
  patient,
  doctor,
  items,
  subtotal,
  discount,
  hasPpn,
  finalTotal,
  paidAmount,
  changeAmount,
  paymentMethod,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!type) return null;

  const handlePrint = () => {
    window.print();
  };

  const selectedItems = items.filter((it) => it.selected);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="bg-[#5663f6] text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5" />
            <h3 className="font-bold text-base tracking-wide">
              {type === 'struk' ? 'Pratinjau Struk Pembayaran Kasir' : 'Pratinjau Kuitansi Resmi Klinik'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content / Printable Document */}
        <div className="p-6 max-h-[75vh] overflow-y-auto bg-slate-100/60 flex justify-center">
          {type === 'struk' ? (
            /* =================== STRUK KASIR (Thermal 80mm style) =================== */
            <div
              id="printable-receipt"
              ref={printRef}
              className="w-full max-w-[380px] bg-white p-6 shadow-md border border-slate-200 rounded-sm font-mono text-[12px] text-slate-900 leading-relaxed"
            >
              {/* Header Struk */}
              <div className="text-center pb-3 border-b border-dashed border-slate-400">
                <div className="font-bold text-lg tracking-wider font-sans text-indigo-900">
                  eClinic <span className="italic font-serif">leap!</span>
                </div>
                <div className="text-[11px] text-slate-600 font-sans mt-0.5">
                  Klinik Pratama & Apotek Terpadu
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  Jl. Kesehatan No. 45, Jakarta Selatan
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  Telp: (021) 7890-1234 • WA: 0812-3456-7890
                </div>
              </div>

              {/* Info Struk */}
              <div className="py-2.5 space-y-1 text-[11px] border-b border-dashed border-slate-400">
                <div className="flex justify-between">
                  <span>No. Transaksi</span>
                  <span className="font-bold">#{patient.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tanggal</span>
                  <span>{patient.datetime}</span>
                </div>
                <div className="flex justify-between">
                  <span>No. RM</span>
                  <span>{patient.medicalRecordNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pasien</span>
                  <span className="font-semibold">{patient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dokter</span>
                  <span>{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kasir</span>
                  <span>Admin Kasir 01</span>
                </div>
              </div>

              {/* Items List */}
              <div className="py-3 border-b border-dashed border-slate-400 space-y-2">
                <div className="font-bold text-[11px] pb-1 border-b border-slate-200 flex justify-between">
                  <span>ITEM</span>
                  <span>TOTAL</span>
                </div>
                {selectedItems.map((it) => (
                  <div key={it.id} className="text-[11px]">
                    <div className="font-semibold text-slate-800">{it.name}</div>
                    <div className="flex justify-between text-slate-600 text-[10px]">
                      <span>
                        {it.quantity} x {formatRupiah(it.unitPrice)}
                        {it.dosageNote && ` ${it.dosageNote}`}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formatRupiah(it.quantity * it.unitPrice)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kalkulasi & Total */}
              <div className="py-2.5 space-y-1 text-[11px] border-b border-dashed border-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                {discount.appliedAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>
                      Diskon ({discount.mode === 'percentage' ? `${discount.appliedPercentage}%` : 'Rp'})
                    </span>
                    <span>- {formatRupiah(discount.appliedAmount)}</span>
                  </div>
                )}
                {hasPpn && (
                  <div className="flex justify-between text-slate-700">
                    <span>PPN (11%)</span>
                    <span>
                      + {formatRupiah(Math.round((subtotal - discount.appliedAmount) * 0.11))}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm pt-1 border-t border-slate-300">
                  <span>TOTAL</span>
                  <span>{formatRupiah(finalTotal)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Bayar ({paymentMethod})</span>
                  <span>{formatRupiah(paidAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kembalian</span>
                  <span className="font-semibold">
                    {changeAmount >= 0 ? formatRupiah(changeAmount) : 'Kurang'}
                  </span>
                </div>
              </div>

              {/* Footer Struk */}
              <div className="text-center pt-3 space-y-1 font-sans">
                <div className="flex items-center justify-center space-x-1 text-emerald-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STATUS: LUNAS</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Terima kasih atas kunjungan Anda
                </p>
                <p className="text-[10px] text-slate-500">
                  Semoga Lekas Sembuh & Sehat Selalu
                </p>
                <div className="pt-2 flex flex-col items-center">
                  {/* Pseudo Barcode */}
                  <div className="flex space-x-0.5 h-8 items-center px-4 bg-white">
                    {Array.from({ length: 36 }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-full ${
                          (idx % 3 === 0 || idx % 7 === 0 || idx % 2 === 0)
                            ? 'bg-slate-900 w-[2px]'
                            : 'bg-transparent w-[2px]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-400 tracking-widest font-mono">
                    *ECL-{patient.id}-{patient.medicalRecordNumber}*
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* =================== KUITANSI RESMI (Formal A4 / Half-Letter style) =================== */
            <div
              id="printable-receipt"
              ref={printRef}
              className="w-full max-w-xl bg-white p-8 shadow-md border border-slate-300 rounded-sm text-slate-800 text-xs sm:text-[13px] leading-relaxed relative"
            >
              {/* Kop Surat Klinik */}
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-indigo-900 font-extrabold text-2xl font-sans tracking-tight">
                      eClinic
                    </span>
                    <span className="text-indigo-800 font-serif italic text-2xl font-semibold">
                      leap!
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Klinik Pratama Rawat Jalan & Apotek Terpadu
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Izin Operasional: 445/03/DPMPTSP/2023 • Jl. Kesehatan No. 45, Jakarta Selatan
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Telp: (021) 7890-1234 • Email: finance@eclinicleap.id
                  </p>
                </div>

                <div className="text-right">
                  <div className="inline-block border border-slate-300 rounded px-3 py-1 bg-slate-50 text-[11px] font-mono text-slate-600">
                    No: KWT/2024/08/{patient.id}
                  </div>
                </div>
              </div>

              {/* Judul Kuitansi */}
              <div className="text-center my-4">
                <h2 className="text-base sm:text-lg font-extrabold tracking-widest uppercase text-slate-900 underline underline-offset-4 decoration-2">
                  Kwitansi Pembayaran
                </h2>
              </div>

              {/* Identitas Pasien & Pembayaran */}
              <div className="space-y-2.5 py-2">
                <div className="grid grid-cols-[160px_12px_1fr] items-baseline">
                  <span className="font-semibold text-slate-700">Telah Diterima Dari</span>
                  <span>:</span>
                  <span className="font-bold text-slate-900">{patient.name}</span>
                </div>

                <div className="grid grid-cols-[160px_12px_1fr] items-baseline">
                  <span className="font-semibold text-slate-700">Nomor Rekam Medis (RM)</span>
                  <span>:</span>
                  <span className="font-mono text-slate-800">{patient.medicalRecordNumber}</span>
                </div>

                <div className="grid grid-cols-[160px_12px_1fr] items-baseline">
                  <span className="font-semibold text-slate-700">Dokter Pemeriksa</span>
                  <span>:</span>
                  <span>{doctor.name} (SIP: {doctor.sip})</span>
                </div>

                <div className="grid grid-cols-[160px_12px_1fr] items-baseline bg-indigo-50/70 p-2.5 rounded border border-indigo-100">
                  <span className="font-semibold text-indigo-950">Uang Sejumlah</span>
                  <span className="text-indigo-950">:</span>
                  <span className="italic font-bold text-indigo-900">
                    # {terbilang(finalTotal)} Rupiah #
                  </span>
                </div>

                <div className="grid grid-cols-[160px_12px_1fr] items-baseline">
                  <span className="font-semibold text-slate-700">Untuk Pembayaran</span>
                  <span>:</span>
                  <span>
                    Pelayanan Tindakan Medis, Uji Laboratorium & Resep Obat Farmasi (ID Kasir #{patient.id})
                  </span>
                </div>
              </div>

              {/* Tabel Ringkasan Item */}
              <div className="mt-4 border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                    <tr>
                      <th className="py-2 px-3">Uraian Pelayanan / Obat</th>
                      <th className="py-2 px-2 text-center w-16">Jml</th>
                      <th className="py-2 px-3 text-right w-28">Tarif Satuan</th>
                      <th className="py-2 px-3 text-right w-28">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-1.5 px-3">
                          <span className="font-medium text-slate-800">{item.name}</span>
                          {item.dosageNote && (
                            <span className="text-slate-500 text-[11px] block">{item.dosageNote}</span>
                          )}
                        </td>
                        <td className="py-1.5 px-2 text-center">{item.quantity}</td>
                        <td className="py-1.5 px-3 text-right">{formatRupiah(item.unitPrice)}</td>
                        <td className="py-1.5 px-3 text-right font-medium">
                          {formatRupiah(item.quantity * item.unitPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-800">
                    {discount.appliedAmount > 0 && (
                      <tr>
                        <td colSpan={3} className="py-1.5 px-3 text-right text-emerald-700">
                          Diskon:
                        </td>
                        <td className="py-1.5 px-3 text-right text-emerald-700">
                          - {formatRupiah(discount.appliedAmount)}
                        </td>
                      </tr>
                    )}
                    {hasPpn && (
                      <tr>
                        <td colSpan={3} className="py-1.5 px-3 text-right text-slate-600">
                          PPN 11%:
                        </td>
                        <td className="py-1.5 px-3 text-right">
                          + {formatRupiah(Math.round((subtotal - discount.appliedAmount) * 0.11))}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t border-slate-300 text-slate-950 font-bold bg-indigo-50/50">
                      <td colSpan={3} className="py-2 px-3 text-right">
                        Total yang Dibayar:
                      </td>
                      <td className="py-2 px-3 text-right text-indigo-900 font-extrabold text-sm">
                        {formatRupiah(finalTotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Cap Stempel LUNAS dan Tanda Tangan */}
              <div className="mt-8 flex justify-between items-end relative">
                {/* Stamp LUNAS */}
                <div className="absolute left-1/3 bottom-2 transform -rotate-12 border-4 border-emerald-600 text-emerald-600 rounded-lg px-4 py-1.5 font-black tracking-widest text-lg opacity-85 select-none pointer-events-none">
                  LUNAS
                  <div className="text-[9px] font-medium tracking-normal text-center">
                    eClinic leap! Kasir
                  </div>
                </div>

                <div className="text-center w-40">
                  <p className="text-slate-500 text-[11px]">Pasien / Wali,</p>
                  <div className="h-16 flex items-end justify-center">
                    <p className="font-bold text-slate-800 border-b border-slate-400 pb-0.5 w-full">
                      {patient.name}
                    </p>
                  </div>
                </div>

                <div className="text-center w-48">
                  <p className="text-slate-500 text-[11px]">
                    Jakarta, {patient.datetime.split(' ')[0]}
                  </p>
                  <p className="text-slate-500 text-[11px]">Petugas Kasir,</p>
                  <div className="h-14 flex items-end justify-center">
                    <p className="font-bold text-slate-800 border-b border-slate-400 pb-0.5 w-full">
                      Dewi Sartika, A.Md.Keb
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Tekan tombol <strong>Cetak Dokumen</strong> untuk mencetak langsung ke printer.
          </div>
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#5663f6] hover:bg-[#4351ea] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Dokumen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
