import { test, expect } from '@playwright/test';

test('Unggah Stok', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  const email = page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' });
  const password = page.getByRole('textbox', { name: 'Minimal 8 karakter' });

  await expect(email).toBeVisible();
  await email.fill('Firqoh06');

  await expect(password).toBeVisible();
  await password.fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu halaman setelah login
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('button', { name: 'Manajemen Stok' })).toBeVisible();


  // ================= MASUK MENU =================
  await page.getByRole('button', { name: 'Manajemen Stok' }).click();
  await page.getByRole('tab', { name: 'Unggah Stok' }).click();

  await expect(page.getByRole('button', { name: 'Unduh Template' })).toBeVisible();


  // ================= DOWNLOAD TEMPLATE =================
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Unduh Template' }).click();
  await downloadPromise;


  // ================= UPLOAD FILE =================
  // ❌ jangan pakai click "Choose file"
  // ✅ langsung pakai input file

  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toBeVisible();

  await fileInput.setInputFiles('tests/data/contohhhh.xlsx'); // pastikan path benar


  // ================= SUBMIT =================
  const uploadBtn = page.getByRole('button', { name: 'Unggah Stok' });

  await expect(uploadBtn).toBeEnabled();
  await uploadBtn.click();

});