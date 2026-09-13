export type CategoryType = 'Tindakan' | 'Laboratorium' | 'Resep Obat';

export interface BillItem {
  id: string;
  category: CategoryType;
  name: string;
  dosageNote?: string;
  quantity: number;
  unitPrice: number;
  selected: boolean;
  status?: string;
}

export interface PatientInfo {
  id: string;
  datetime: string;
  medicalRecordNumber: string; // Nomor RM
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthDate: string;
}

export interface DoctorInfo {
  name: string;
  nip: string;
  sip: string;
}

export type DiscountMode = 'percentage' | 'rupiah';

export interface DiscountState {
  mode: DiscountMode;
  value: number; // raw value input
  appliedAmount: number; // calculated in Rp
  appliedPercentage: number; // percentage equivalent
}

export type PaymentMethod = 'Tunai' | 'QRIS' | 'Transfer Bank' | 'Kartu Debit' | 'Kartu Kredit' | 'BPJS / Asuransi';
