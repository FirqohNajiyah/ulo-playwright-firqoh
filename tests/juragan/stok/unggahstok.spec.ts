import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const UKM_NAME = 'Firqoh Shop';

test('Unggah Stok - Upload file stok baru', async ({ page }) => {
  // Login
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill(EMAIL);
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Masuk' }).click();

  // Navigate ke Unggah Stok
  await page.getByRole('link', { name: 'Daftar Stok' }).click();
  await page.getByRole('tab', { name: 'Unggah Stok' }).click();

  // Pilih UKM
  await page.getByRole('combobox', { name: 'Pilih UKM' }).click();
  await page.getByRole('option', { name: UKM_NAME }).click();

  // Download format template
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Unduh Format' }).click();
  const download = await downloadPromise;

  // Upload stok
  await page.getByRole('button', { name: 'Choose file' }).click();
  await page.getByRole('button', { name: 'Unggah Stok' }).click();
});