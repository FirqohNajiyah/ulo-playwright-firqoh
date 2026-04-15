import { test, expect } from '@playwright/test';

test.describe('Penjualan - Download Transaksi', () => {

  test('Download laporan penjualan', async ({ page }) => {

    // =====================
    // 1. LOGIN
    // =====================
    await page.goto('https://ulo-nk-juragan.noretest.com/');

    await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i })
      .fill('Firqoh06');

    await page.getByRole('textbox', { name: /minimal 8 karakter/i })
      .fill('FirqohNa06');

    await page.getByRole('button', { name: /masuk/i }).click();


    // =====================
    // 2. NAVIGASI KE PENJUALAN
    // =====================
    await page.getByRole('button', { name: /ukm/i }).click();
    await page.getByRole('link', { name: /penjualan/i }).click();


    // =====================
    // 3. FILTER TANGGAL
    // =====================
    await page.getByRole('button', { name: /\/04\/2026/i }).click();
    await page.getByRole('button', { name: /3 bulan terakhir/i }).click();
    await page.getByRole('button', { name: /simpan/i }).click();


    // =====================
    // 4. DOWNLOAD FILE
    // =====================
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /unduh transaksi/i }).click(),
    ]);

    // =====================
    // 5. ASSERTION (OPSIONAL)
    // =====================
    expect(download).toBeTruthy();

    // optional: simpan file
    // await download.saveAs('downloads/laporan-penjualan.xlsx');
  });

});