import { test, expect } from '@playwright/test';

test('Login berhasil', async ({ page }) => {
  // ================== DATA ==================
  const username = 'Firqoh06';
  const password = 'FirqohNa06';

  // ================== STEP: BUKA HALAMAN ==================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // ================== STEP: INPUT EMAIL/USERNAME ==================
  await page
    .getByRole('textbox', { name: 'Contoh: ulo@gmail.com' })
    .fill(username);

  // ================== STEP: INPUT PASSWORD ==================
  await page
    .getByRole('textbox', { name: 'Minimal 8 karakter' })
    .fill(password);

  // ================== STEP: KLIK MASUK ==================
  await page.getByRole('button', { name: 'Masuk' }).click();

  // ================== VALIDASI LOGIN ==================
  // Ganti locator di bawah sesuai element setelah login sukses
  await expect(page).not.toHaveURL(/login/);
});