import { test, expect } from '@playwright/test';

test('Login admin UKM berhasil', async ({ page }) => {
  // buka halaman login
  await page.goto('https://admin.ukm.noretest.com/');
  await page.waitForLoadState('domcontentloaded');

  // isi form login (tidak perlu click dulu)
  await page.getByRole('textbox', { name: /email/i })
    .fill('nana123@email.com');

  await page.getByRole('textbox', { name: /password/i })
    .fill('nana123');

  // klik sign in + tunggu redirect
  await Promise.all([
    page.waitForURL(url => !url.toString().includes('/login')),
    page.getByRole('button', { name: /sign in/i }).click(),
  ]);

  // validasi sudah masuk beranda
  await expect(page).not.toHaveURL(/login/i);
});