import { test, expect } from '@playwright/test';

test.describe('Pengaturan UKM - Langganan', () => {

  test('Perbarui Langganan & Pilih Pembayaran', async ({ page }) => {

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
    // 2. NAVIGASI KE PENGATURAN UKM
    // =====================
    await page.getByRole('button', { name: /ukm/i }).click();
    await page.getByRole('link', { name: /pengaturan ukm/i }).click();


    // =====================
    // 3. PERBARUI LANGGANAN
    // =====================
    await page.getByRole('button', { name: /perbarui langganan/i }).click();

    // pilih paket (index ke-1)
    await page.getByRole('button', { name: /pilih langganan/i })
      .nth(1)
      .click();


    // =====================
    // 4. PROSES PEMBAYARAN
    // =====================
    await page.getByRole('link', { name: /bayar/i }).click();
    await page.getByRole('link', { name: /lanjut ke pembayaran/i }).click();

    // pilih metode pembayaran
    await page.getByRole('link', { name: /permata/i }).click();


    // =====================
    // 5. ASSERTION (OPSIONAL)
    // =====================
    await expect(page).toHaveURL(/permata/i);
  });

});