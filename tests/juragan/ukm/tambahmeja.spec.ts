import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('button', { name: 'UKM' }).click();
  await page.getByRole('link', { name: 'Pengaturan Meja' }).click();
  await page.getByRole('button', { name: 'Tambah Meja' }).click();
  await page.getByRole('combobox', { name: 'Pilih UKM' }).click();
  await page.getByRole('option', { name: 'Firqoh Shop' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Nomor Meja' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Nomor Meja' }).fill('13');
  await page.getByRole('textbox', { name: 'Masukkan Nama Ruangan Meja' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Nama Ruangan Meja' }).fill('G');
  await page.getByRole('textbox', { name: 'Masukkan Kapasitas Meja' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Kapasitas Meja' }).fill('6');
  await page.getByRole('button', { name: 'Tambahkan' }).click();
});