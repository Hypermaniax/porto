// dash = jaga-jaga tampilan: konten dari admin boleh saja kosong
// (admin tidak wajib mengisi semua field). Daripada tampil kosong
// (kelihatan rusak), tampilkan tanda "-" sebagai gantinya.
export function dash(value: string | undefined | null): string {
  return value && value.trim() ? value : "-"
}
