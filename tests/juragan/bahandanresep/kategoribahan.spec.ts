import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const UKM_NAME = 'Firqoh Shop';
const CATEGORY_NAME = 'Aqua';

test('Kategori Bahan - Tambah Kategori Baru', async ({ page }) => {
  // Login
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /masuk/i }).click();

  // Navigate ke Kategori Bahan
  await page.getByRole('link', { name: /bahan dan resep/i }).click();
  await page.getByRole('tab', { name: /kategori bahan/i }).click();

  // Filter UKM
  await page.getByRole('combobox', { name: /filter berdasarkan ukm/i }).click();
  await page.getByRole('option', { name: UKM_NAME }).click();

  // Tambah Kategori
  await page.getByRole('button', { name: /tambah kategori/i }).click();
  await page.getByRole('textbox', { name: /masukkan nama kategori/i }).fill(CATEGORY_NAME);
  await page.getByRole('button', { name: /simpan/i }).click();

  // Optional: verifikasi kategori berhasil ditambah
  await expect(page.getByText(CATEGORY_NAME)).toBeVisible();
});