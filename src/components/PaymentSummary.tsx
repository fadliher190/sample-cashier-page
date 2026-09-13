import React from 'react';
import { DiscountState, PaymentMethod } from '../types';
import { formatNumber, formatRupiah } from '../utils/formatters';
import { Banknote, CheckCircle2 } from 'lucide-react';

interface PaymentSummaryProps {
  subtotal: number;
  previousPayment: number;
  guaranteeAmount: number;
  discount: DiscountState;
  hasPpn: boolean;
  onTogglePpn: (checked: boolean) => void;
  finalTotal: number;
  paidAmount: number;
  onChangePaidAmount: (amount: number) => void;
  paymentMethod: PaymentMethod;
  onChangePaymentMethod: (method: PaymentMethod) => void;
  changeAmount: number;
  onPay: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  subtotal,
  previousPayment,
  guaranteeAmount,
  discount,
  hasPpn,
  onTogglePpn,
  finalTotal,
  paidAmount,
  onChangePaidAmount,
  paymentMethod,
  onChangePaymentMethod,
  changeAmount,
  onPay,
}) => {
  const paymentMethods: PaymentMethod[] = [
    'Tunai',
    'QRIS',
    'Transfer Bank',
    'Kartu Debit',
    'Kartu Kredit',
    'BPJS / Asuransi',
  ];

  return (
    <div className="p-4 sm:p-6 bg-white border-t border-indigo-100">
      <h3 className="font-bold text-slate-900 text-sm mb-4 tracking-tight">
        Informasi Pembayaran
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-[13px] sm:text-[13.5px]">
        {/* Column 1 */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Jumlah Pembayaran</span>
            <span className="font-bold text-slate-900">
              {formatRupiah(subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-700">Pembayaran Sebelumnya</span>
            <span className="font-medium text-slate-800">
              {formatRupiah(previousPayment)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-700">Jaminan (-)</span>
            <span className="font-medium text-slate-800">
              {guaranteeAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Diskon</span>
            <span className="font-bold text-slate-900">
              {discount.appliedPercentage > 0
                ? `${discount.appliedPercentage}% (${formatRupiah(discount.appliedAmount)})`
                : discount.appliedAmount > 0
                ? formatRupiah(discount.appliedAmount)
                : '0%'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-700">PPN 11%</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasPpn}
                onChange={(e) => onTogglePpn(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-[#5663f6]"
              />
            </label>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-800 font-medium">
              Jumlah Yang Harus Dibayar
            </span>
            <span className="inline-block bg-[#8893fc] text-slate-900 font-bold px-3 py-1 rounded shadow-xs text-xs sm:text-sm">
              {formatRupiah(finalTotal)}
            </span>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-2.5">
          {/* Dibayar */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Dibayar</span>
            <div className="relative w-44">
              <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                <span className="text-slate-500 text-xs px-2 select-none">Rp</span>
                <input
                  type="text"
                  value={paidAmount ? formatNumber(paidAmount) : ''}
                  onChange={(e) => {
                    const rawVal = e.target.value.replace(/\D/g, '');
                    onChangePaidAmount(rawVal ? parseInt(rawVal, 10) : 0);
                  }}
                  className="w-full text-right pr-2 py-1 text-slate-900 font-semibold text-xs sm:text-sm outline-hidden"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Quick Uang Pas helper if paidAmount != finalTotal */}
          {paidAmount !== finalTotal && (
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                onClick={() => onChangePaidAmount(finalTotal)}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 underline font-medium cursor-pointer"
              >
                Gunakan Uang Pas ({formatRupiah(finalTotal)})
              </button>
            </div>
          )}

          {/* Metode Pembayaran */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Metode Pembayaran</span>
            <div className="w-44">
              <select
                value={paymentMethod}
                onChange={(e) =>
                  onChangePaymentMethod(e.target.value as PaymentMethod)
                }
                aria-label="Metode Pembayaran"
                className="w-full bg-[#f0f3fd] border border-indigo-200 text-slate-800 font-medium py-1 px-2.5 rounded text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {paymentMethods.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kembalian */}
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Kembalian</span>
            <div className="w-44 bg-[#f1f3f7] border border-slate-200 rounded py-1 px-2.5 text-right font-semibold text-slate-900 text-xs sm:text-sm">
              {changeAmount < 0 ? (
                <span className="text-amber-600 font-semibold">
                  Kurang {formatRupiah(Math.abs(changeAmount))}
                </span>
              ) : (
                formatRupiah(changeAmount)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Bayar */}
      <div className="mt-5 pt-4 border-t border-indigo-100/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 flex items-center space-x-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>
            Pastikan rincian tindakan, obat, dan nominal pembayaran sudah sesuai sebelum konfirmasi bayar.
          </span>
        </div>

        <button
          type="button"
          onClick={onPay}
          className="w-full sm:w-auto bg-[#333ed8] hover:bg-[#252fb6] active:bg-[#1f269a] text-white font-bold py-2.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer"
        >
          <Banknote className="w-5 h-5" />
          <span>Bayar Sekarang ({formatRupiah(finalTotal)})</span>
        </button>
      </div>
    </div>
  );
};
