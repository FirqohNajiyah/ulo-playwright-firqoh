import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).click();
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByText('Tumbuh Bersama UKM LOKALEmail').click();
  await page.getByText('Email atau UsernameKata SandiLupa Kata Sandi?Simpan Informasi LoginMasukKe').click();
  await page.getByText('Email atau UsernameKata SandiLupa Kata Sandi?Simpan Informasi LoginMasukKe').click();
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).click();
});