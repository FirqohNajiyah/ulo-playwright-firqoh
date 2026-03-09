import { test, expect } from '@playwright/test';

test('Tambah Kategori COA', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://admin.ukm.noretest.com/');

  await page.getByRole('textbox', { name: 'Email' })
    .fill('nana123@email.com');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('nana123');

  await page.getByRole('button', { name: 'Sign in' })
    .click();


  // ================= MASUK MENU COA =================
  await page.getByRole('link', { name: 'COA' }).click();
  await page.getByRole('link', { name: 'Kategori COA' }).click();


  // ================= TAMBAH KATEGORI COA =================
  await page.getByRole('textbox', { name: 'Nama Kategori' })
    .fill('percobaan');

  await page.getByRole('button', { name: 'Simpan' })
    .click();

});