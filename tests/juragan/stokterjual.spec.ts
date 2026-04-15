import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('link', { name: 'Daftar Stok' }).click();
  await page.getByRole('tab', { name: 'Stok Terjual' }).click();
  await page.getByRole('button', { name: '/04/2026 - 14/04/2026' }).click();
  await page.getByRole('button', { name: '3 bulan terakhir' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('button', { name: 'Unduh Transaksi' }).click();
  await page.getByRole('button', { name: 'Unduh Transaksi' }).click();
});