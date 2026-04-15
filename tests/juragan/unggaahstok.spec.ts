import { test, expect } from '@playwright/test';
import path from 'path';

test('Upload stok sesuai flow asli', async ({ page }) => {
  // ======================
  // 1. LOGIN
  // ======================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page).toHaveURL(/beranda/i);

  // ======================
  // 2. KE UNGGAH STOK
  // ======================
  await page.getByRole('link', { name: /daftar stok/i }).click();
  await page.getByRole('tab', { name: /unggah stok/i }).click();

  // ======================
  // 3. PILIH UKM
  // ======================
  await page.getByRole('button', { name: /buka/i }).click();
  await page.getByRole('option', { name: /firqoh shop/i }).click();

  // ======================
  // 4. DOWNLOAD FORMAT
  // ======================
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /unduh format/i }).click();
  const download = await downloadPromise;

  const filePath = path.join(__dirname, 'format.xlsx');
  await download.saveAs(filePath);

  // ======================
  // 5. (SIMULASI) FILE SUDAH DIISI
  // ======================
  // NOTE: biasanya di real case, file ini diedit manual
  // untuk test, kita langsung pakai file tersebut

  // ======================
  // 6. UPLOAD FILE (INI PENGGANTI "CHOOSE FILE")
  // ======================
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);

  // ======================
  // 7. KLIK UNGGAH
  // ======================
  await page.getByRole('button', { name: /unggah stok/i }).click();

  // ======================
  // 8. VALIDASI
  // ======================
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/berhasil|sukses/i)).toBeVisible();
});