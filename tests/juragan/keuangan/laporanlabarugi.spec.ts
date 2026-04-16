import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('button', { name: 'Keuangan' }).click();
  await page.getByRole('link', { name: 'Laporan Laba Rugi' }).click();
  await page.getByRole('button', { name: '/04/2026 - 16/04/2026' }).click();
  await page.getByRole('button', { name: '3 bulan terakhir' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Ekspor PDF' }).click();
  const page1 = await page1Promise;
});