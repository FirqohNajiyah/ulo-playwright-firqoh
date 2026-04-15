import { test, expect } from '@playwright/test';

test.describe('Metode Pembayaran Flow', () => {

  test('Tambah Metode Pembayaran', async ({ page }) => {

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
    // 2. NAVIGASI KE METODE PEMBAYARAN
    // =====================
    await page.getByRole('button', { name: /ukm/i }).click();
    await page.getByRole('link', { name: /metode pembayaran/i }).click();


    // =====================
    // 3. TAMBAH METODE PEMBAYARAN
    // =====================
    await page.getByRole('button', { name: /tambah metode pembayaran/i }).click();

    // pilih toko
    await page.getByRole('button', { name: /buka/i }).click();
    await page.getByRole('option', { name: 'Firqoh Shop' }).click();

    // input nama metode
    await page.getByRole('textbox', { name: /masukkan nama metode/i })
      .fill('Mandiri');

    // input nomor tujuan
    await page.getByRole('textbox', { name: /masukkan nomor tujuan/i })
      .fill('174444921');

    // input nama pemegang
    await page.getByRole('textbox', { name: /masukkan nama pemegang/i })
      .fill('Tiana');

    // submit
    await page.getByRole('button', { name: /tambahkan/i }).click();


    // =====================
    // 4. ASSERTION (OPSIONAL)
    // =====================
    await expect(page.getByText('Mandiri')).toBeVisible();
  });

});