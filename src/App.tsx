import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { PatientDoctorInfo } from './components/PatientDoctorInfo';
import { BillingTable } from './components/BillingTable';
import { PaymentSummary } from './components/PaymentSummary';
import { DiscountWidget } from './components/DiscountWidget';
import { PrintWidget } from './components/PrintWidget';
import { ReceiptModal } from './components/ReceiptModal';
import { initialDoctor, initialItems, initialPatient } from './data/initialData';
import { BillItem, DiscountMode, DiscountState, PaymentMethod } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [patient] = useState(initialPatient);
  const [doctor] = useState(initialDoctor);
  const [items, setItems] = useState<BillItem[]>(initialItems);

  // Discount state
  const [discount, setDiscount] = useState<DiscountState>({
    mode: 'rupiah',
    value: 0,
    appliedAmount: 0,
    appliedPercentage: 0,
  });

  // PPN state
  const [hasPpn, setHasPpn] = useState<boolean>(false);

  // Payment inputs
  const previousPayment = 0;
  const guaranteeAmount = 0.0;

  // Calculate subtotal of selected items
  const subtotal = useMemo(() => {
    return items
      .filter((it) => it.selected)
      .reduce((acc, curr) => acc + curr.quantity * curr.unitPrice, 0);
  }, [items]);

  // Calculate discount amount in Rp
  const discountAmount = useMemo(() => {
    if (discount.mode === 'percentage') {
      return Math.round((subtotal * (discount.value || 0)) / 100);
    }
    return Math.min(discount.value || 0, subtotal);
  }, [subtotal, discount]);

  // Calculate PPN 11%
  const ppnAmount = useMemo(() => {
    if (!hasPpn) return 0;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    return Math.round(taxableAmount * 0.11);
  }, [subtotal, discountAmount, hasPpn]);

  // Final Total
  const finalTotal = useMemo(() => {
    const afterDiscount = Math.max(0, subtotal - discountAmount);
    return afterDiscount + ppnAmount - previousPayment - guaranteeAmount;
  }, [subtotal, discountAmount, ppnAmount, previousPayment, guaranteeAmount]);

  // Amount Paid
  const [paidAmount, setPaidAmount] = useState<number>(115000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Tunai');

  // Change / Kembalian
  const changeAmount = paidAmount - finalTotal;

  // Print modal state
  const [printModalType, setPrintModalType] = useState<'struk' | 'kuitansi' | null>(null);

  // Payment notification toast state
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Handlers
  const handleToggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleApplyDiscount = (mode: DiscountMode, value: number) => {
    if (mode === 'percentage') {
      const clampedPct = Math.min(100, Math.max(0, value));
      const amount = Math.round((subtotal * clampedPct) / 100);
      setDiscount({
        mode: 'percentage',
        value: clampedPct,
        appliedAmount: amount,
        appliedPercentage: clampedPct,
      });
    } else {
      const clampedRp = Math.min(subtotal, Math.max(0, value));
      const pct = subtotal > 0 ? Math.round((clampedRp / subtotal) * 100) : 0;
      setDiscount({
        mode: 'rupiah',
        value: clampedRp,
        appliedAmount: clampedRp,
        appliedPercentage: pct,
      });
    }
  };

  const handlePay = () => {
    // If paidAmount is 0 or less than finalTotal, set to finalTotal by default or confirm
    if (paidAmount < finalTotal) {
      setPaidAmount(finalTotal);
    }
    setPaymentSuccess(true);
    // Auto show receipt modal after successful payment
    setTimeout(() => {
      setPrintModalType('struk');
    }, 400);
  };

  const handleReset = () => {
    setItems(initialItems);
    setDiscount({
      mode: 'rupiah',
      value: 0,
      appliedAmount: 0,
      appliedPercentage: 0,
    });
    setHasPpn(false);
    setPaidAmount(115000);
    setPaymentMethod('Tunai');
    setPaymentSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#d7e0f8] p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans">
      {/* Outer Application Frame matching eClinic Leap screenshot canvas */}
      <div className="w-full max-w-[1100px] bg-[#ecf1fe] rounded-2xl sm:rounded-3xl border-2 border-indigo-200/90 shadow-2xl p-3 sm:p-5 md:p-6 relative overflow-visible">
        {/* Top Header Navbar with eClinic leap logo & 3D Cash Register machine */}

        {/* Payment Success Notification */}
        {paymentSuccess && (
          <div className="mt-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between shadow-xs animate-in fade-in">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-sm">Pembayaran Berhasil Dikonfirmasi!</span>
                <span className="text-xs text-emerald-700 ml-2 hidden sm:inline">
                  Status transaksi #{patient.id} telah LUNAS via {paymentMethod}.
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPrintModalType('struk')}
                className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Lihat Struk
              </button>
              <button
                onClick={() => setPrintModalType('kuitansi')}
                className="text-xs font-semibold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 px-3 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Kuitansi
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area: Card Pembayaran Kasir */}
        <div className="mt-4 sm:mt-5 bg-white rounded-2xl border border-indigo-200/90 shadow-sm overflow-hidden flex flex-col">
          {/* Blue-purple Card Header */}
          <div className="bg-[#5663f6] text-white px-5 sm:px-8 py-2.5 sm:py-3 font-bold text-base sm:text-lg tracking-wide shadow-xs flex items-center justify-between">
            <span>Pembayaran Kasir</span>
            <span className="text-xs font-normal text-indigo-100 bg-white/15 px-2.5 py-0.5 rounded-full">
              No. Transaksi #{patient.id}
            </span>
          </div>

          {/* Patient & Doctor 3-Column Info Header */}
          <PatientDoctorInfo patient={patient} doctor={doctor} />

          {/* Billing Table */}
          <BillingTable
            items={items}
            onToggleItem={handleToggleItem}
            subtotal={subtotal}
          />

          {/* Informasi Pembayaran Footer with Tombol Bayar */}
          <PaymentSummary
            subtotal={subtotal}
            previousPayment={previousPayment}
            guaranteeAmount={guaranteeAmount}
            discount={{
              ...discount,
              appliedAmount: discountAmount,
              appliedPercentage:
                discount.mode === 'percentage'
                  ? discount.value
                  : subtotal > 0
                  ? Math.round((discountAmount / subtotal) * 100)
                  : 0,
            }}
            hasPpn={hasPpn}
            onTogglePpn={setHasPpn}
            finalTotal={finalTotal}
            paidAmount={paidAmount}
            onChangePaidAmount={setPaidAmount}
            paymentMethod={paymentMethod}
            onChangePaymentMethod={setPaymentMethod}
            changeAmount={changeAmount}
            onPay={handlePay}
          />
        </div>

        {/* Panel Aksi Bawah: Jenis Diskon & Cetak dipindahkan ke bawah card pembayaran */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          {/* Panel 1: Jenis Diskon */}
          <DiscountWidget
            onApplyDiscount={handleApplyDiscount}
            currentDiscount={discount}
          />

          {/* Panel 2: Cetak */}
          <PrintWidget
            onPrintReceipt={() => setPrintModalType('struk')}
            onPrintInvoice={() => setPrintModalType('kuitansi')}
          />
        </div>
      </div>

      {/* Printable Receipt & Kuitansi Modal */}
      <ReceiptModal
        type={printModalType}
        onClose={() => setPrintModalType(null)}
        patient={patient}
        doctor={doctor}
        items={items}
        subtotal={subtotal}
        discount={{
          ...discount,
          appliedAmount: discountAmount,
          appliedPercentage:
            discount.mode === 'percentage'
              ? discount.value
              : subtotal > 0
              ? Math.round((discountAmount / subtotal) * 100)
              : 0,
        }}
        hasPpn={hasPpn}
        finalTotal={finalTotal}
        paidAmount={paidAmount}
        changeAmount={changeAmount}
        paymentMethod={paymentMethod}
      />
    </div>
  );
}
