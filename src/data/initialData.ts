import { BillItem, DoctorInfo, PatientInfo } from '../types';

export const initialPatient: PatientInfo = {
  id: '1447',
  datetime: '08-08-2024 14:41:43',
  medicalRecordNumber: '00000141',
  name: 'Suhardam Ikarupan',
  gender: 'Laki-laki',
  birthDate: '12-12-1998',
};

export const initialDoctor: DoctorInfo = {
  name: 'dr. Fauziah',
  nip: '198805072009122001',
  sip: '03/SIP/SDK/I/2024',
};

export const initialItems: BillItem[] = [
  {
    id: 'act-1',
    category: 'Tindakan',
    name: 'Cabut Gigi',
    quantity: 1,
    unitPrice: 10000,
    selected: true,
    status: '',
  },
  {
    id: 'lab-1',
    category: 'Laboratorium',
    name: 'Gula Darah Sewaktu',
    quantity: 1,
    unitPrice: 30000,
    selected: true,
    status: '',
  },
  {
    id: 'lab-2',
    category: 'Laboratorium',
    name: 'Hematologi Rutin',
    quantity: 1,
    unitPrice: 50000,
    selected: true,
    status: '',
  },
  {
    id: 'med-1',
    category: 'Resep Obat',
    name: 'Parasetamol 125 Mg',
    dosageNote: '(2x1 - Sesudah Makan)',
    quantity: 2,
    unitPrice: 5000,
    selected: true,
    status: '',
  },
  {
    id: 'med-2',
    category: 'Resep Obat',
    name: 'Ibuprofen',
    dosageNote: '(3x1 - Sesudah Makan)',
    quantity: 1,
    unitPrice: 15000,
    selected: true,
    status: '',
  },
];
