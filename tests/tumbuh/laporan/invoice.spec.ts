import { test, expect } from '@playwright/test';

test('Test cari stok dalam invoice', async ({ page }) => {

  // =====================
  // 1. LOGIN
  // =====================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  const emailInput = page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i });
  const passwordInput = page.getByRole('textbox', { name: /minimal 8 karakter/i });
  const loginButton = page.getByRole('button', { name: /masuk/i });

  await expect(emailInput).toBeVisible();
  await emailInput.fill('Firqoh06');

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('FirqohNa06');

  await expect(loginButton).toBeEnabled();
  await loginButton.click();

  // =====================
  // 2. MASUK KE LAPORAN
  // =====================
  const laporanButton = page.getByRole('button', { name: /laporan/i });
  await expect(laporanButton).toBeVisible({ timeout: 10000 });
  await laporanButton.click();

  // =====================
  // 3. CARI STOK DALAM INVOICE
  // =====================
  const cariStokButton = page.getByRole('button', { name: /cari stok dalam invoice/i });
  await expect(cariStokButton).toBeVisible();
  await cariStokButton.click();

  // =====================
  // 4. PILIH DATA (LEBIH AMAN)
  // =====================
  const pilihDataButton = page.locator('div:nth-child(3) > div:nth-child(6) > .MuiButtonBase-root');

  await expect(pilihDataButton).toBeVisible({ timeout: 10000 });
  await pilihDataButton.click();

  // =====================
  // 5. KLIK CARI STOK
  // =====================
  const submitCari = page.getByRole('button', { name: /cari stok/i });

  await expect(submitCari).toBeEnabled();
  await submitCari.click();

});