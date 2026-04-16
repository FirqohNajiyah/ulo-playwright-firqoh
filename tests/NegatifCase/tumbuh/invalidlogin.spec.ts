import { test, expect } from '@playwright/test';

const INVALID_EMAIL = 'Fiiiiinaaa';
const PASSWORD = 'FirqohNa06';

test('Invalid Login - Email Salah', async ({ page }) => {
  // Navigate ke login page
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // Input kredensial dengan email yang salah
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(INVALID_EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);

  // Submit login
  await page.getByRole('button', { name: /masuk/i }).click();

  // Verifikasi error message muncul
  const errorMessage = page.getByRole('button', { name: /ok/i });
  await expect(errorMessage).toBeVisible();

  // Click OK untuk close error
  await errorMessage.click();

  // Verifikasi masih di halaman login (tidak berhasil login)
  await expect(page).toHaveURL(/tumbuh/);
});