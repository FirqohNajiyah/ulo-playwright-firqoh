import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-juragan.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('link', { name: 'Pengaturan Pengguna' }).click();
  await page.getByRole('button', { name: 'Tambah Pengguna' }).click();
  await page.getByRole('checkbox', { name: 'Firqoh Shop' }).check();
  await page.getByRole('textbox', { name: 'Masukkan Nama Lengkap' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Nama Lengkap' }).fill('lala');
  await page.getByRole('textbox', { name: 'Masukkan Username' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Username' }).fill('lala23');
  await page.getByRole('textbox', { name: 'Masukkan Email' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Email' }).fill('lalalostyou23@gmail.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('lalalostyou23');
  await page.locator('input[name="passwordUlang"]').click();
  await page.locator('input[name="passwordUlang"]').fill('lalalostyou23');
  await page.getByRole('button', { name: 'Lanjutkan' }).click();
  await page.locator('input[name="aksesTransaksi"]').check();
  await page.locator('input[name="aksesStok"]').check();
  await page.getByRole('checkbox', { name: 'Laporan', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Shift', exact: true }).check();
  await page.getByRole('button', { name: 'Tambahkan' }).click();
});