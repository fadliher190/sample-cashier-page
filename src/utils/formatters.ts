export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('IDR', 'Rp');
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

// Convert numbers into Indonesian words (e.g., 115000 -> "Seratus Lima Belas Ribu Rupiah")
export function terbilang(angka: number): string {
  const bilangan = [
    '',
    'Satu',
    'Dua',
    'Tiga',
    'Empat',
    'Lima',
    'Enam',
    'Tujuh',
    'Delapan',
    'Sembilan',
    'Sepuluh',
    'Sebelas',
  ];

  if (angka < 12) {
    return bilangan[angka];
  } else if (angka < 20) {
    return terbilang(angka - 10) + ' Belas';
  } else if (angka < 100) {
    return (
      terbilang(Math.floor(angka / 10)) +
      ' Puluh ' +
      bilangan[angka % 10]
    ).trim();
  } else if (angka < 200) {
    return 'Seratus ' + terbilang(angka - 100).trim();
  } else if (angka < 1000) {
    return (
      terbilang(Math.floor(angka / 100)) +
      ' Ratus ' +
      terbilang(angka % 100)
    ).trim();
  } else if (angka < 2000) {
    return 'Seribu ' + terbilang(angka - 1000).trim();
  } else if (angka < 1000000) {
    return (
      terbilang(Math.floor(angka / 1000)) +
      ' Ribu ' +
      terbilang(angka % 1000)
    ).trim();
  } else if (angka < 1000000000) {
    return (
      terbilang(Math.floor(angka / 1000000)) +
      ' Juta ' +
      terbilang(angka % 1000000)
    ).trim();
  } else {
    return (
      terbilang(Math.floor(angka / 1000000000)) +
      ' Miliar ' +
      terbilang(angka % 1000000000)
    ).trim();
  }
}
