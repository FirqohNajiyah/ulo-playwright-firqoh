import { test, expect } from '@playwright/test';

test('Tambah Pengeluaran - Stabil Flow', async ({ page }) => {

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
  // 4. PINDAH KE TAB PENGELUARAN
  // =====================
  const tabPengeluaran = page.getByRole('tab', { name: /pengeluaran/i });

  await expect(tabPengeluaran).toBeVisible();
  await tabPengeluaran.click();

  // =====================
  // 5. TAMBAH DATA
  // =====================
  const tambahBtn = page.getByRole('button', { name: /^tambah$/i });

  await expect(tambahBtn).toBeVisible();
  await tambahBtn.click();

  const nominalInput = page.getByRole('textbox').first();
  const keteranganInput = page.getByRole('textbox', { name: /contoh: bayar listrik/i });

  await expect(nominalInput).toBeVisible();
  await nominalInput.fill('45000');

  await expect(keteranganInput).toBeVisible();
  await keteranganInput.fill('Coklat');

  // =====================
  // 6. SIMPAN
  // =====================
  const simpanBtn = page.getByRole('button', { name: /^simpan$/i });

  await expect(simpanBtn).toBeVisible();
  await simpanBtn.click();

  // =====================
  // 7. VALIDASI (OPSIONAL)
  // =====================
  await expect(page.locator('body')).toContainText('Coklat');

});