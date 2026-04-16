import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('link', { name: 'Bahan dan Resep' }).click();
  await page.getByRole('tab', { name: 'Resep' }).click();
  await page.getByRole('button', { name: 'Buat Resep' }).click();
  await page.getByRole('button', { name: 'Buka' }).first().click();
  await page.getByRole('option', { name: 'Firqoh Shop' }).click();
  await page.getByRole('cell').first().click();
  await page.locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(4) > div > .MuiButtonBase-root').click();
  await page.getByRole('button', { name: 'Lanjutkan' }).click();
  await page.getByRole('button', { name: 'Buka' }).click();
  await page.getByRole('option', { name: 'creamy taste' }).click();
  await page.getByRole('row', { name: 'Gula (Rp 19,000 /Kilogram)' }).getByPlaceholder('0').click();
  await page.getByRole('row', { name: 'Gula (Rp 19,000 /Kilogram)' }).getByPlaceholder('0').fill('01');
  await page.getByRole('row', { name: 'Tapioka-1776273225395 (Rp 10,' }).getByPlaceholder('0').click();
  await page.getByRole('row', { name: 'Tapioka-1776273225395 (Rp 10,' }).getByPlaceholder('0').fill('03');
  await page.getByRole('button', { name: 'Tambahkan' }).click();
});