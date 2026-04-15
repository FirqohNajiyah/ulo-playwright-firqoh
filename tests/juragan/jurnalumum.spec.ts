import { test, expect } from '@playwright/test';

test.describe('Keuangan - Jurnal Umum', () => {

  test('Buat Jurnal Umum', async ({ page }) => {

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
    // 2. NAVIGASI KE JURNAL UMUM
    // =====================
    await page.getByRole('button', { name: /keuangan/i }).click();
    await page.getByRole('link', { name: /jurnal umum/i }).click();


    // =====================
    // 3. BUAT JURNAL
    // =====================
    await page.getByRole('button', { name: /buat jurnal umum/i }).click();

    // pilih tanggal
    await page.getByTestId('CalendarMonthOutlinedIcon').click();
    await page.getByRole('option', { name: /kamis, 16 april/i }).click();

    // pilih toko
    await page.getByRole('button', { name: /buka/i }).first().click();
    await page.getByRole('option', { name: 'Firqoh Shop' }).click();

    // pilih metode
    await page.getByRole('button', { name: /buka/i }).nth(1).click();
    await page.getByRole('option', { name: 'Giro' }).click();

    // pilih akun
    await page.getByRole('button', { name: /buka/i }).nth(2).click();
    await page.getByRole('option', { name: 'Kas', exact: true }).click();

    // input nominal
    await page.getByRole('textbox', { name: '0' })
      .fill('20000');

    // keterangan
    await page.getByRole('textbox', { name: /contoh: setoran dari/i })
      .fill('Setoran');

    // submit
    await page.getByRole('button', { name: /simpan/i }).click();


    // =====================
    // 4. ASSERTION (OPSIONAL)
    // =====================
    await expect(page.getByText('Setoran')).toBeVisible();
  });

});