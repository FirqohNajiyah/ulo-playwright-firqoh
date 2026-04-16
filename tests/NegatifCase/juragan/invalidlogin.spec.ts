import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const INVALID_PASSWORD = 'nanajiyah';
const VALID_EMAIL = 'Firqoh06';

test('Invalid Login - Password Salah', async ({ page }) => {
  // Navigate ke login page
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  // Input kredensial dengan password yang salah
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(INVALID_PASSWORD);

  // Submit login
  await page.getByRole('button', { name: /masuk/i }).click();

  // Verifikasi error message muncul
  const errorMessage = page.getByRole('button', { name: /ok/i });
  await expect(errorMessage).toBeVisible();

  // Click OK untuk close error
  await errorMessage.click();

  // Verifikasi masih di halaman login (tidak berhasil login)
  await expect(page).toHaveURL(/juragan/);
});