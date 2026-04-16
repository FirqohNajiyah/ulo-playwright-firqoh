import { test, expect } from '@playwright/test';

test.describe('Pelanggan Flow', () => {

  test('Tambah Pelanggan', async ({ page }) => {

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
    // 2. NAVIGASI KE PELANGGAN
    // =====================
    await page.getByRole('button', { name: /ukm/i }).click();
    await page.getByRole('link', { name: /pelanggan/i }).click();


    // =====================
    // 3. TAMBAH PELANGGAN
    // =====================
    await page.getByRole('button', { name: /tambah pelanggan/i }).click();

    // pilih toko
    await page.getByRole('button', { name: /buka/i }).click();
    await page.getByRole('option', { name: 'Firqoh Shop' }).click();

    // input nama pelanggan
    await page.getByRole('textbox', { name: /masukkan nama pelanggan/i })
      .fill('diana');

    // input no hp
    await page.getByRole('textbox', { name: '831xxxxxx' })
      .fill('87394477665');

    // submit
    await page.getByRole('button', { name: /tambahkan/i }).click();


    // =====================
    // 4. ASSERTION (OPSIONAL)
    // =====================
    await expect(page.getByText('diana')).toBeVisible();
  });

});