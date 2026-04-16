import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const INGREDIENT_NAME = '098876yt6t65';
const CATEGORY = 'Gula-1776080585812';
const UNIT = 'Milliliter';
const INVALID_STOCK = '-17';
const INVALID_PRICE = '2.3000';

test('Tambah Bahan - Stok Negatif dan Harga Desimal', async ({ page }) => {
  // Login
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /masuk/i }).click();

  // Buka form tambah bahan
  await page.getByRole('button', { name: /bahan & resep/i }).click();
  await page.getByRole('button', { name: /tambah bahan/i }).click();
  await page.getByRole('menuitem', { name: /bahan dasar/i }).click();

  // Isi data bahan
  await page.getByRole('textbox', { name: /contoh: susu/i }).fill(INGREDIENT_NAME);

  // Pilih kategori dan satuan
  await page.getByRole('button', { name: /pilih kategori/i }).click();
  await page.getByRole('option', { name: CATEGORY }).click();

  await page.getByRole('button', { name: /pilih satuan/i }).click();
  await page.getByRole('option', { name: UNIT }).click();

  // Isi stok dengan nilai negatif (tidak valid)
  await page.getByPlaceholder('Contoh: 2').fill(INVALID_STOCK);

  // Isi harga dengan nilai desimal (tidak valid)
  await page.getByRole('textbox', { name: /contoh: 10.000/i }).fill(INVALID_PRICE);

  // Coba simpan
  await page.getByRole('button', { name: /simpan/i }).click();

  // Verifikasi ada error message atau tidak bisa simpan
  const errorMessage = page.locator('[role="alert"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
});