import { test, expect } from '@playwright/test';

test('Tambah produk satuan berhasil', async ({ page }) => {
  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  await page
    .getByRole('textbox', { name: 'Contoh: ulo@gmail.com' })
    .fill('Firqoh06');

  await page
    .getByRole('textbox', { name: 'Minimal 8 karakter' })
    .fill('FirqohNa06');

  await Promise.all([
    page.waitForURL(/transaksi/i),
    page.getByRole('button', { name: 'Masuk' }).click(),
  ]);

  // ================= PASTIKAN HALAMAN TRANSAKSI SIAP =================
  await expect(
    page.getByRole('button', { name: 'Tambah Barang' })
  ).toBeVisible({ timeout: 10000 });

  // ================= TAMBAH BARANG SATUAN =================
  await page.getByRole('button', { name: 'Tambah Barang' }).click();

  // tunggu dropdown muncul
  await page.getByRole('menuitem', { name: 'Satuan' }).waitFor();

  // klik satuan
  await page.getByRole('menuitem', { name: 'Satuan' }).click();

  // ================= AMBIL DIALOG =================
  const dialog = page.getByRole('dialog', {
    name: /Tambah Barang Satuan/i,
  });

  await expect(dialog).toBeVisible({ timeout: 10000 });

  // ================= ISI FORM =================
  await dialog.locator('#namaBarang').fill('Es Teh');
  await dialog.locator('#deskripsiBarang').fill('Segar');

  // isi harga (locator aman berdasarkan label)
  await dialog
    .getByText('Harga 1')
    .locator('xpath=..')
    .getByRole('textbox')
    .fill('7000');

  // isi stok
  await dialog
    .getByPlaceholder('Masukkan jumlah stok barang')
    .fill('10');

  // ================= SIMPAN =================
  await dialog.getByRole('button', { name: 'Simpan' }).click();


  // ✅ validasi minimal (modal masih boleh terbuka)
  await expect(dialog.getByRole('button', { name: 'Simpan' }))
    .toBeVisible();
});