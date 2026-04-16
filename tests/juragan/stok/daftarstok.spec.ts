import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const UKM_NAME = 'Firqoh Shop';
const PRODUCT_NAME = 'purelife';
const PRODUCT_PRICE = '3000';
const PRODUCT_STOCK = '16';
const CATEGORY = 'Drink';
const SUBCATEGORY = 'es teh';

test('Daftar Stok - Tambah Barang Baru', async ({ page }) => {
  // Login
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /masuk/i }).click();

  // Navigate ke Daftar Stok
  await page.getByRole('link', { name: /daftar stok/i }).click();
  await page.getByRole('button', { name: /tambah barang/i }).click();

  // Pilih UKM
  await page.getByRole('combobox', { name: /pilih ukm/i }).click();
  await page.getByRole('option', { name: UKM_NAME }).click();

  // Isi data barang
  await page.locator('#namaBarang').fill(PRODUCT_NAME);
  await page.locator('#sku').click();
  await page.locator('input[name="multipleHarga.0.harga"]').fill(PRODUCT_PRICE);

  // Pilih kategori dan sub-kategori
  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: CATEGORY }).click();

  await page.getByRole('combobox').nth(2).click();
  await page.getByRole('option', { name: SUBCATEGORY }).click();

  // Isi stok dan simpan
  await page.getByPlaceholder('Jumlah Stok').fill(PRODUCT_STOCK);
  await page.getByRole('button', { name: /simpan/i }).click();

  // Optional: verifikasi berhasil
  await expect(page.getByText(PRODUCT_NAME)).toBeVisible();
});