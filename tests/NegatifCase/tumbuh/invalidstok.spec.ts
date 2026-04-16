import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const PRODUCT_NAME = 'nanas';
const PRODUCT_PRICE = '1.0000';
const INVALID_STOCK = '1.5';
const CATEGORY = 'Dessert sweet';
const SUBCATEGORY = 'Gelato';

test('Tambah Barang - Stok Tidak Valid (Desimal)', async ({ page }) => {
  // Login
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /masuk/i }).click();

  // Buka form tambah barang
  await page.getByRole('button', { name: /tambah barang/i }).click();
  await page.getByRole('menuitem', { name: /satuan/i }).click();

  // Isi data barang
  await page.locator('#namaBarang').fill(PRODUCT_NAME);
  await page.locator('#sku').click();
  await page.locator('#mui-52').fill(PRODUCT_PRICE);

  // Pilih kategori dan sub-kategori
  await page.getByRole('button').nth(3).click();
  await page.getByRole('option', { name: CATEGORY }).click();

  await page.getByRole('button').nth(4).click();
  await page.getByRole('option', { name: SUBCATEGORY }).click();

  // Isi stok dengan nilai desimal (tidak valid)
  await page.getByPlaceholder('Masukkan jumlah stok barang').fill(INVALID_STOCK);

  // Coba simpan
  await page.getByRole('button', { name: /simpan/i }).click();

  // Verifikasi ada error message atau tidak bisa simpan
  const errorMessage = page.locator('[role="alert"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
});