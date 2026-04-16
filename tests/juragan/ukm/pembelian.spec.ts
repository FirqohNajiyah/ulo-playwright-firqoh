import { test, expect } from '@playwright/test';

test.describe('Pembelian Flow', () => {

  test('Tambah Faktur Pembelian', async ({ page }) => {

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
    // 2. NAVIGASI KE PEMBELIAN
    // =====================
    await page.getByRole('button', { name: /ukm/i }).click();
    await page.getByRole('link', { name: /pembelian/i }).click();


    // =====================
    // 3. FILTER TANGGAL
    // =====================
    await page.getByRole('button', { name: /\/04\/2026/i }).click();
    await page.getByRole('button', { name: /3 bulan terakhir/i }).click();
    await page.getByRole('button', { name: /simpan/i }).click();


    // =====================
    // 4. TAMBAH FAKTUR
    // =====================
    await page.getByRole('button', { name: /tambah faktur pembelian/i }).click();

    // pilih produk (hindari locator raw kalau bisa)
    await page.locator('div:nth-child(3) > div > .MuiButtonBase-root').click();

    await page.getByRole('button', { name: /lanjutkan/i }).click();


    // =====================
    // 5. INPUT DATA
    // =====================

    // supplier
    await page.getByRole('button', { name: /buka/i }).first().click();
    await page.getByRole('option', { name: 'lala' }).click();

    // metode pembayaran
    await page.getByRole('button', { name: /buka/i }).nth(1).click();
    await page.getByRole('option', { name: 'Giro' }).click();

    // jumlah stok
    await page.getByPlaceholder('Jumlah Stok').fill('20');

    // harga beli
    await page.locator('input[name="detail.0.hargaBeli"]')
      .fill('17000');

    // pembayaran awal
    await page.locator('input[name="detail.0.pembayaranAwal"]')
      .fill('10000');


    // =====================
    // 6. SUBMIT
    // =====================
    await page.getByRole('button', { name: /tambahkan/i }).click();


    // =====================
    // 7. ASSERTION (OPSIONAL)
    // =====================
    await expect(page.getByText('lala')).toBeVisible();
  });

});