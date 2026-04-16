import { test, expect } from '@playwright/test';

test('Login berhasil', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  const emailInput = page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i });
  await emailInput.fill('Firqoh06');

  const passwordInput = page.getByRole('textbox', { name: /minimal 8 karakter/i });
  await passwordInput.fill('FirqohNa06');

  await page.getByRole('button', { name: /masuk/i }).click();

  // tunggu redirect selesai (opsional tapi bagus)
  await page.waitForLoadState('networkidle');

  // ✅ sesuai real URL
  await expect(page).toHaveURL(/beranda/i);
});
