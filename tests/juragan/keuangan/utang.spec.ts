import { test, expect } from '@playwright/test';

test.describe('Keuangan - Utang', () => {

  test('Pembayaran Utang', async ({ page }) => {

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
    // 2. NAVIGASI KE UTANG
    // =====================
    await page.getByRole('button', { name: /keuangan/i }).click();
    await page.getByRole('link', { name: /^utang$/i }).click();


    // =====================
    // 3. PEMBAYARAN UTANG
    // =====================
    await page.getByRole('button', { name: /pembayaran utang/i }).click();

    // pilih data utang (⚠️ raw locator - sebaiknya diganti kalau ada label)
    await page.locator('.MuiIconButton-colorPrimary').first().click();

    await page.getByRole('button', { name: /lanjutkan/i }).click();

    // pilih metode pembayaran
    await page.getByRole('button', { name: /buka/i }).click();
    await page.getByRole('option', { name: /rekening bank/i }).click();

    // input nominal pembayaran
    await page.getByRole('textbox')
      .first()
      .fill('24000');

    // submit
    await page.getByRole('button', { name: /tambahkan/i }).click();


    // =====================
    // 4. ASSERTION (OPSIONAL)
    // =====================
    await expect(page.getByText(/berhasil|sukses/i)).toBeVisible();
  });

});