import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('link', { name: 'Bahan dan Resep' }).click();
  await page.getByRole('button', { name: 'Tambah Bahan' }).click();
  await page.getByRole('menuitem', { name: 'Bahan Dasar' }).click();
  await page.getByRole('combobox', { name: 'Pilih UKM' }).click();
  await page.getByRole('option', { name: 'Firqoh Shop' }).click();
  await page.getByRole('textbox', { name: 'Contoh: Susu' }).click();
  await page.getByRole('textbox', { name: 'Contoh: Susu' }).fill('Gula');
  await page.getByRole('combobox', { name: 'Pilih Kategori' }).click();
  await page.getByRole('option', { name: 'Gula-1775578738877' }).click();
  await page.getByRole('combobox', { name: 'Pilih Satuan' }).click();
  await page.getByRole('option', { name: 'Kilogram' }).click();
  await page.getByPlaceholder('Contoh: 2').click();
  await page.getByPlaceholder('Contoh: 2').fill('017');
  await page.getByPlaceholder('Contoh: 2').click();
  await page.getByPlaceholder('Contoh: 2').fill('17');
  await page.getByRole('textbox', { name: 'Contoh: 10.000' }).click();
  await page.getByRole('textbox', { name: 'Contoh: 10.000' }).fill('1.9000');
  await page.getByRole('button', { name: 'Simpan' }).click();
});