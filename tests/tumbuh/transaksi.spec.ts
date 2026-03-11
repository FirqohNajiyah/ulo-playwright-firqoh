import { test, expect } from '@playwright/test';

test('Transaksi pesan berhasil', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' })
    .fill('Firqoh06');

  await page.getByRole('textbox', { name: 'Minimal 8 karakter' })
    .fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' })
    .click();


  // ================= PILIH MENU PESAN =================
  await page.getByRole('button', { name: 'Pesan' })
    .nth(3)
    .click();


  // ================= PILIH PRODUK =================
  await page.getByRole('button')
    .nth(2)
    .click();


  // ================= KONFIRMASI PESAN =================
  await page.getByRole('button', { name: 'Pesan' })
    .click();


  // ================= PILIH PEMBAYARAN =================
  await page.getByRole('button', { name: 'Pembayaran' })
    .click();

  await page.getByRole('button', { name: '100.000' })
    .click();

  await page.getByRole('button', { name: 'Bayar' })
    .click();


  // ================= INPUT NOMOR HP =================
  await page.getByRole('textbox', { name: '8316352725' })
    .fill('85747400942');


  // ================= PROSES POPUP PEMBAYARAN =================
  const popupPromise = page.waitForEvent('popup');

  await page.getByRole('button', { name: 'Bayar' })
    .click();

  const popupPage = await popupPromise;


  // ================= KONFIRMASI =================
  await page.getByRole('button', { name: 'OK' })
    .click();

});