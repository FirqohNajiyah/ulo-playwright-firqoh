import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('button', { name: 'Keuangan' }).click();
  await page.getByRole('link', { name: 'Pembelian Aset' }).click();
  await page.getByRole('button', { name: 'Tambah Aset' }).click();
  await page.getByRole('combobox', { name: 'Pilih UKM' }).click();
  await page.getByRole('option', { name: 'Firqoh Shop' }).click();
  await page.getByRole('textbox', { name: 'Nama Aset' }).click();
  await page.getByRole('textbox', { name: 'Nama Aset' }).fill('Motor');
  await page.locator('input[name="coaId"]').click();
  await page.getByRole('option', { name: 'Aset Tetap - Kendaraan' }).click();
  await page.getByTestId('CalendarMonthOutlinedIcon').first().click();
  await page.getByRole('option', { name: 'Choose Senin, 27 April' }).click();
  await page.getByRole('textbox', { name: 'Nomor Aset' }).click();
  await page.getByRole('textbox', { name: 'Nomor Aset' }).fill('02');
  await page.locator('input[name="coaBayar"]').click();
  await page.getByRole('option', { name: 'Rekening Bank' }).click();
  await page.getByRole('textbox', { name: '0' }).click();
  await page.getByRole('textbox', { name: '0' }).fill('1.500.0000');
  await page.getByRole('button', { name: 'Tambahkan' }).click();
});