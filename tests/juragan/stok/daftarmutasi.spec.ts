import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';

test('Daftar Mutasi - Unduh Mutasi Stok', async ({ page }) => {
  // Login
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /masuk/i }).click();

  // Navigate ke Mutasi Stok
  await page.getByRole('link', { name: /mutasi stok/i }).click();
  await page.waitForLoadState('networkidle');

  // Filter tanggal
  const dateButton = page.getByRole('button', { name: /\/04\/2026/i });
  await expect(dateButton).toBeVisible({ timeout: 15000 });
  await dateButton.click();

  // Tunggu dropdown muncul dan stabil
  const filterOption = page.getByRole('button', { name: /3 bulan terakhir/i });
  await expect(filterOption).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(500); // biar DOM stabil
  await filterOption.click();

  // Klik Simpan
  const saveButton = page.getByRole('button', { name: /simpan/i });
  await expect(saveButton).toBeVisible({ timeout: 15000 });
  await saveButton.click();

  // Tunggu filter selesai
  await page.waitForLoadState('networkidle');

  // Unduh Mutasi
  const downloadPromise = page.waitForEvent('download');
  const downloadButton = page.getByRole('button', { name: /unduh mutasi/i });
  await expect(downloadButton).toBeVisible({ timeout: 15000 });
  await downloadButton.click();
  
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBeTruthy();
});