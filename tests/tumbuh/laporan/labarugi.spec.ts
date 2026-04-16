import { test, expect } from '@playwright/test';

test('Export PDF Laba Rugi - Stabil Flow', async ({ page }) => {

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

  await loginButton.click();

  // =====================
  // 2. MASUK KE LAPORAN
  // =====================
  const laporanBtn = page.getByRole('button', { name: /laporan/i });

  await expect(laporanBtn).toBeVisible();
  await laporanBtn.click();

  // =====================
  // 3. FILTER TANGGAL
  // =====================
  const tanggalBtn = page.getByRole('button', { name: /\/04\/2026/i });

  await expect(tanggalBtn).toBeVisible();
  await tanggalBtn.click();

  await page.getByRole('button', { name: /3 bulan terakhir/i }).click();
  await page.getByRole('button', { name: /simpan/i }).click();

  // =====================
  // 4. TAB LABA RUGI
  // =====================
  const tabLabaRugi = page.getByRole('tab', { name: /laba rugi/i });

  await expect(tabLabaRugi).toBeVisible();
  await tabLabaRugi.click();

  // =====================
  // 5. EXPORT PDF (POPUP)
  // =====================
  const exportLink = page.getByRole('link', { name: /ekspor pdf/i });

  await expect(exportLink).toBeVisible();

  const [popup] = await Promise.all([
    page.waitForEvent('popup'), // tunggu tab baru
    exportLink.click(),
  ]);

  // =====================
  // 6. VALIDASI POPUP
  // =====================
  await popup.waitForLoadState('domcontentloaded');

  // opsional: cek URL atau title
  await expect(popup).toHaveURL(/pdf/i);

});