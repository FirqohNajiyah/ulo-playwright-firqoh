import { test, expect } from '@playwright/test';

test('Tambah bundling berhasil', async ({ page }) => {
  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  const emailInput = page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' });
  const passwordInput = page.getByRole('textbox', { name: 'Minimal 8 karakter' });

  await emailInput.fill('Firqoh06');
  await passwordInput.fill('FirqohNa06');
  await page.getByRole('button', { name: 'Masuk' }).click();

  // (opsional) pastikan login berhasil
  await expect(page.getByRole('button', { name: 'Tambah Barang' })).toBeVisible();

  // ================= MASUK MENU BUNDLING =================
  await page.getByRole('button', { name: 'Tambah Barang' }).click();
  await page.getByRole('menuitem', { name: 'Bundling/Paket' }).click();

  // ================= PILIH PRODUK =================
  await page
    .locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(8) .MuiButtonBase-root')
    .click();

  await page
    .locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(5) .MuiButtonBase-root')
    .click();

  await page.getByRole('button', { name: 'Lanjutkan' }).click();

  // ================= ISI JUMLAH ITEM =================
  await page.locator('input[name="item.0.jumlahItem"]').fill('1');
  await page.locator('input[name="item.1.jumlahItem"]').fill('1');

  // ================= FORM BUNDLING =================
  await page.locator('#namaBundling').fill('creamy taste');

  // pilih multiple harga
  await page.getByText('Multiple Harga', { exact: true }).click();

  await page.locator('#mui-135').fill('5.5000');
  await page
    .getByRole('textbox', { name: 'Masukkan Keterangan Harga' })
    .fill('bundling 1:1');

  await page.locator('#deskripsiBundling').fill('enak');

  // ================= PILIH KATEGORI =================
  await page.getByRole('button').nth(3).click();
  await page.getByRole('option', { name: 'Dessert sweet' }).click();

  await page.getByRole('button').nth(4).click();
  await page.getByRole('option', { name: 'Ice Cream' }).click();

  // ================= SIMPAN =================
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('button', { name: 'Ya, tutup' }).click();

  // (opsional) assertion sukses
  // await expect(page.getByText('berhasil')).toBeVisible();
});