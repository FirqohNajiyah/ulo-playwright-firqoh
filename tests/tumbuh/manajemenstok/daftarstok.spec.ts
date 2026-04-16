import { test, expect } from '@playwright/test';

test('Tambah Barang', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  const email = page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' });
  const password = page.getByRole('textbox', { name: 'Minimal 8 karakter' });

  await expect(email).toBeVisible();
  await email.fill('Firqoh06');

  await expect(password).toBeVisible();
  await password.fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu halaman siap
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('button', { name: 'Manajemen Stok' })).toBeVisible();


  // ================= MASUK MENU =================
  await page.getByRole('button', { name: 'Manajemen Stok' }).click();
  await expect(page.getByRole('button', { name: 'Tambah Barang' })).toBeVisible();

  await page.getByRole('button', { name: 'Tambah Barang' }).click();


  // ================= PILIH TIPE =================
  const satuan = page.getByRole('menuitem', { name: 'Satuan' });
  await expect(satuan).toBeVisible();
  await satuan.click();


  // ================= INPUT DATA =================
  const namaBarang = page.locator('#namaBarang');
  await expect(namaBarang).toBeVisible();
  await namaBarang.fill('lemineral');

  const sku = page.locator('#sku');
  await expect(sku).toBeVisible();
  await sku.fill('SKU-LEMINERAL');


  // ================= HARGA =================
  // ❌ hindari #mui-xxx
  // ✅ gunakan textbox yang relevan (misal berdasarkan label/urutan aman)

  const harga = page.getByRole('textbox').filter({ hasText: '' }).nth(2);
  await expect(harga).toBeVisible();
  await harga.fill('3000');


  // ================= KATEGORI =================
  const kategoriDropdown = page.getByRole('button', { name: /Kategori/i });
  await kategoriDropdown.click();

  const kategori = page.getByRole('option', { name: 'Drink' });
  await expect(kategori).toBeVisible();
  await kategori.click();


  // ================= SUB KATEGORI =================
  const subKategoriDropdown = page.getByRole('button', { name: /Sub/i });
  await subKategoriDropdown.click();

  const subKategori = page.getByRole('option', { name: 'es teh' });
  await expect(subKategori).toBeVisible();
  await subKategori.click();


  // ================= STOK =================
  const stok = page.getByPlaceholder('Masukkan jumlah stok barang');
  await expect(stok).toBeVisible();
  await stok.fill('20');


  // ================= SIMPAN =================
  const simpan = page.getByRole('button', { name: 'Simpan' });

  await expect(simpan).toBeEnabled();
  await simpan.click();

});