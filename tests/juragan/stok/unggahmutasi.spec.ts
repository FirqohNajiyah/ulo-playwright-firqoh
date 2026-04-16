import { test, expect } from '@playwright/test';

test('Unggah Mutasi Stok', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  const email = page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' });
  const password = page.getByRole('textbox', { name: 'Minimal 8 karakter' });

  await expect(email).toBeVisible();
  await email.fill('Firqoh06');

  await expect(password).toBeVisible();
  await password.fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu halaman setelah login
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('link', { name: 'Mutasi Stok' })).toBeVisible();


  // ================= MASUK MENU =================
  await page.getByRole('link', { name: 'Mutasi Stok' }).click();
  await page.getByRole('tab', { name: 'Unggah Mutasi' }).click();

  await expect(page.getByRole('button', { name: 'Buka' })).toBeVisible();


  // ================= PILIH TOKO =================
  await page.getByRole('button', { name: 'Buka' }).click();

  const toko = page.getByRole('option', { name: 'Firqoh Shop' });
  await expect(toko).toBeVisible();
  await toko.click();


  // ================= DOWNLOAD FORMAT =================
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Unduh Format' }).click();
  await downloadPromise;


  // ================= UPLOAD FILE =================
  // ⚠️ IMPORTANT: jangan pakai click "Choose file"
  // harus pakai setInputFiles

  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toBeVisible();

  await fileInput.setInputFiles('tests/data/mutasi.xlsx'); // sesuaikan path file kamu


  // ================= SUBMIT =================
  const uploadBtn = page.getByRole('button', { name: 'Unggah Mutasi' });

  await expect(uploadBtn).toBeEnabled();
  await uploadBtn.click();

});