import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('button', { name: 'Keuangan' }).click();
  await page.getByRole('link', { name: 'Pengeluaran' }).click();
  await page.getByRole('button', { name: 'Tambah Pengeluaran' }).click();
  await page.getByRole('button', { name: 'Buka' }).click();
  await page.getByRole('listbox').click();
  await page.locator('.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-11qj2wo > path').click();
  await page.getByRole('textbox', { name: '300.000' }).click();
  await page.getByRole('textbox', { name: '300.000' }).fill('2.0000');
  await page.getByRole('textbox', { name: 'Contoh: Pembayaran listrik' }).click();
  await page.getByRole('textbox', { name: 'Contoh: Pembayaran listrik' }).fill('es batu');
  await page.getByRole('button', { name: 'Tambahkan' }).click();
});