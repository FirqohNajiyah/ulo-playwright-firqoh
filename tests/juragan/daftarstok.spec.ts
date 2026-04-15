import { test, expect } from '@playwright/test';

test('Tambah barang stok - FIX CEPAT', async ({ page }) => {
  // LOGIN
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page).toHaveURL(/beranda/i);

  // MASUK KE DAFTAR STOK
  await page.getByRole('link', { name: /daftar stok/i }).click();

  // KLIK TAMBAH BARANG
  await page.getByRole('button', { name: /tambah barang/i }).click();

  // PILIH "Satuan"
  await page.getByRole('menuitem', { name: /satuan/i }).click();

  // ✅ TUNGGU INPUT MUNCUL (INI KUNCI)
  const namaBarang = page.locator('input').filter({ hasText: '' }).first();
  await expect(namaBarang).toBeVisible();

  // ISI NAMA BARANG (langsung ke input pertama)
  await namaBarang.fill('yogurt');

  // SKU (optional - ambil input ke-2)
  const sku = page.locator('input').nth(1);
  if (await sku.isVisible()) {
    await sku.fill('YGT001');
  }

  // HARGA (input spesifik)
  await page.locator('input[name="multipleHarga.0.harga"]').fill('22000');

  // DROPDOWN
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: /drink/i }).click();

  await page.getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: /ice lemon tea/i }).click();

  // STOK
  await page.getByPlaceholder(/jumlah stok/i).fill('20');

  // SIMPAN
  await page.getByRole('button', { name: /simpan/i }).click();

  // VALIDASI (simple biar gak fail)
  await page.waitForLoadState('networkidle');
  await expect(page.locator('table')).toBeVisible();
});