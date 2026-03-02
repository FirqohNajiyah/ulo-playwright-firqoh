import { test, expect } from '@playwright/test';

test('Tambah Barang Bundling berhasil', async ({ page }) => {

  // ================== DATA ==================
  const username = 'Firqoh06';
  const password = 'FirqohNa06';

  // ================== LOGIN ==================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  await page.getByRole('textbox', {
    name: 'Contoh: ulo@gmail.com'
  }).fill(username);

  await page.getByRole('textbox', {
    name: 'Minimal 8 karakter'
  }).fill(password);

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu dashboard stabil
  await page.waitForLoadState('networkidle');

  // ================== MASUK MENU ==================
  await page.getByRole('button', { name: 'Tambah Barang' }).click();
  await page.getByRole('menuitem', { name: 'Bundling/Paket' }).click();

  // ================== PILIH PRODUK ==================
  await page.getByRole('row', { name: /Croissant/i })
    .getByRole('button')
    .click();

  await page.getByRole('row', { name: /es teh/i })
    .getByRole('button')
    .click();

  await page.getByRole('button', { name: 'Lanjutkan' }).click();

  // ================== TUNGGU MODAL ==================
  const dialog = page.getByRole('dialog');

  await expect(dialog).toBeVisible();

  await expect(
    dialog.getByRole('heading', {
      name: 'Tambah Barang Bundling/Paket'
    })
  ).toBeVisible();

  // ⚠️ penting → tunggu render React selesai
  await page.waitForLoadState('networkidle');

  // ================== INPUT DATA ==================

  // Nama bundling
  const namaBundling = dialog.locator('#namaBundling');

  await expect(namaBundling).toBeVisible();
  await expect(namaBundling).toBeEditable();

  await namaBundling.fill('Sweet Bundling');

  // ================== HARGA ==================

  // tunggu section Multiple Harga muncul
await expect(
  dialog.getByText('Multiple Harga', { exact: true })
).toBeVisible({ timeout: 15000 });

// input harga
const harga = dialog.locator('#MultipleHarga');

await expect(harga).toBeVisible();
await expect(harga).toBeEditable();

await harga.fill('35000');

  // ================== DESKRIPSI ==================
  const deskripsi = dialog.locator('#deskripsiBundling');

  await expect(deskripsi).toBeVisible();
  await deskripsi.fill('Ice Tea W Croissant');

  // ================== PILIH KATEGORI ==================

  await dialog.getByLabel('Kategori').click();
  await page.getByRole('option', { name: 'Dessert sweet' }).click();

  await dialog.getByLabel('Sub Kategori').click();
  await page.getByRole('option', { name: 'Waffle' }).click();

  // ================== SIMPAN ==================
  await dialog.getByRole('button', { name: 'Simpan' }).click();

  // ================== HANDLE MODAL ==================
  await page.getByRole('button', { name: 'Batal' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();

  // ================== TUTUP ==================
  await dialog.getByRole('button', { name: /tutup|close/i }).click();

  await page.getByRole('button', { name: 'Ya, tutup' }).click();
});