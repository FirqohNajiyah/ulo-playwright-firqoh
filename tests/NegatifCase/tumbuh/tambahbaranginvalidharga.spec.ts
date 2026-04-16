import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const PRODUCT_NAME = 'aquviva';
const INVALID_PRICE = ',';
const CATEGORY = 'Dessert sweet';
const SUBCATEGORY = 'Gelato';

test('Tambah Barang - Harga Tidak Valid (Hanya Koma)', async ({ page }) => {
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

  // Isi harga dengan nilai tidak valid (hanya koma)
  await page.locator('#mui-52').fill(INVALID_PRICE);

  // Pilih kategori dan sub-kategori
  await page.getByRole('button').nth(3).click();
  await page.getByRole('option', { name: CATEGORY }).click();

  await page.getByRole('button').nth(4).click();
  await page.getByRole('option', { name: SUBCATEGORY }).click();

  // Coba simpan
  await page.getByRole('button', { name: /simpan/i }).first().click();

  // Verifikasi ada error message atau tidak bisa simpan
  const errorMessage = page.locator('[role="alert"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
});