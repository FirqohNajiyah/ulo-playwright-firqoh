import { test, expect } from '@playwright/test';

test('Invalid login - email atau password salah', async ({ page }) => {

  // Buka halaman login
  await page.goto('https://admin.ukm.noretest.com/');
  await page.waitForLoadState('domcontentloaded');

  // Input email
  await page.getByRole('textbox', { name: 'Email' }).fill('nana123@email.com');

  // Input password
  await page.getByRole('textbox', { name: 'Password' }).fill('nanajiyah');

  // Klik tombol login
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Validasi bahwa login gagal (contoh: muncul pesan error)
  await expect(page.locator('text=/invalid|salah|error/i')).toBeVisible();
});