import { test, expect } from '@playwright/test';

test('Transaksi Open Bill berhasil', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' })
    .fill('Firqoh06');

  await page.getByRole('textbox', { name: 'Minimal 8 karakter' })
    .fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();


  // ================= MENU PESAN =================
  await page.getByRole('button', { name: 'Pesan' }).first().click();


  // ================= PILIH PRODUK =================
  await page.getByRole('button').nth(2).click();

  await page.getByRole('button', { name: 'Pesan' }).click();


  // ================= SCAN BARCODE =================
  await page.getByRole('checkbox', { name: 'Scan Barcode' }).first().check();

  const barcodePopup = page.waitForEvent('popup');

  await page.locator('#mui-54').click();

  await barcodePopup;


  // ================= TUNGGU POPUP SUKSES =================
  await expect(page.getByText('Transaksi berhasil!')).toBeVisible({ timeout: 10000 });

  await page.getByRole('button', { name: 'OK' }).click();


  // ================= BUKA TAB OPEN BILL =================
  await page.waitForLoadState('networkidle');

  await page.getByText('Daftar Open Bill', { exact: false }).click();


  // ================= PILIH OPEN BILL =================
  await page.locator('.MuiButton-containedButtongreen').first().click();


  // ================= PEMBAYARAN =================
  await page.getByRole('button', { name: '50.000' }).click();

  await page.getByRole('button', { name: 'Bayar' }).click();


  // ================= INPUT NOMOR HP =================
  await page.getByRole('textbox').fill('85747400942');


  // ================= POPUP PAYMENT =================
  const paymentPopup = page.waitForEvent('popup');

  await page.getByRole('button', { name: 'Bayar' }).click();

  await paymentPopup;

  await page.getByRole('button', { name: 'OK' }).click();

});