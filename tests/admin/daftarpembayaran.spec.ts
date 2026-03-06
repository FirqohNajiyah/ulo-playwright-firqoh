import { test, expect } from '@playwright/test';

test('Tambah Daftar Pembayaran', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://admin.ukm.noretest.com/');

  await page.getByRole('textbox', { name: 'Email' }).fill('nana123@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('nana123');

  await page.getByRole('button', { name: 'Sign in' }).click();


  // ================= MASUK MENU UKM =================
  await page.getByRole('link', { name: 'UKM' }).click();
  await page.getByRole('link', { name: 'Daftar Pembayaran' }).click();


  // ================= TAMBAH PEMBAYARAN =================
  await page.getByRole('button', { name: 'Tambah' }).click();


  // Pilih UKM
  await page.getByTitle('Pilih UKM').click();
  await page.getByRole('treeitem', { name: 'Firqoh Shop' }).click();


  // Isi Bank Tujuan
  await page.getByRole('textbox', { name: 'Bank Tujuan' }).fill('BNI');


  // Isi Diskon
  await page.getByRole('textbox', { name: 'Diskon' }).fill('2000');


  // Pilih Layanan
  await page.getByTitle('Pilih Layanan').click();
  await page.getByRole('treeitem', { name: 'Coba Webstore -' }).click();


  // Perpanjang
  await page.locator('#perpanjang').fill('3');


  // Simpan
  await page.getByRole('button', { name: 'Simpan' }).click();

});