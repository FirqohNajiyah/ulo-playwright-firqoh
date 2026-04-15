import { test, expect } from '@playwright/test';

test('Filter laporan 3 bulan terakhir', async ({ page }) => {
  // ======================
  // 1. Buka halaman & login
  // ======================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  // Tunggu masuk ke beranda
  await expect(page).toHaveURL(/beranda/i);

  // ======================
  // 2. Klik filter tanggal
  // ======================
  const dateFilter = page.getByRole('button', { name: /\/04\/2026/i });
  await dateFilter.click();

  // ======================
  // 3. Pilih "3 bulan terakhir"
  // ======================
  await page.getByRole('button', { name: /3 bulan terakhir/i }).click();

  // ======================
  // 4. Klik simpan
  // ======================
  await page.getByRole('button', { name: /simpan/i }).click();

  // ======================
  // 5. Validasi (opsional tapi disarankan)
  // ======================
  await expect(page.getByText(/3 bulan terakhir/i)).toBeVisible();
});

