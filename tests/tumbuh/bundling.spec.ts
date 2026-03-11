import { test, expect } from '@playwright/test';

test('Tambah bundling produk', async ({ page }) => {

  // LOGIN
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' }).fill('Firqoh06');
  await page.getByRole('textbox', { name: 'Minimal 8 karakter' }).fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  await expect(page.getByRole('button', { name: 'Tambah Barang' })).toBeVisible();


  // MENU BUNDLING
  await page.getByRole('button', { name: 'Tambah Barang' }).click();
  await page.getByRole('menuitem', { name: 'Bundling/Paket' }).click();


  // PILIH PRODUK
  const produkCheckbox = page.locator('input[type="checkbox"]').nth(2);

  await expect(produkCheckbox).toBeVisible({ timeout: 20000 });

  await produkCheckbox.click({ force: true });


  // TUNGGU BUTTON AKTIF
  const lanjutkan = page.getByRole('button', { name: 'Lanjutkan' });

  await expect(lanjutkan).toBeEnabled({ timeout: 15000 });

  await lanjutkan.click();

});