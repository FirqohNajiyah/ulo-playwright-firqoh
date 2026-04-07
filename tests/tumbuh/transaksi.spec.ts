import { test, expect } from '@playwright/test';

test('Transaksi pesan berhasil', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' })
    .fill('Firqoh06');

  await page.getByRole('textbox', { name: 'Minimal 8 karakter' })
    .fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu produk muncul
  await page.locator('.MuiCard-root').first().waitFor();


  // ================= PILIH PRODUK =================
  const produk = page.locator('.MuiCard-root').first();
  await expect(produk).toBeVisible();

  await produk.getByRole('button', { name: 'Pesan' }).click();


  // ================= TUNGGU MODAL =================
  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible();


  // ================= (TIDAK PERLU TAMBAH QTY) =================
  // qty sudah default 1 dan tombol + disabled → langsung lanjut


  // ================= KONFIRMASI PESAN =================
  const tombolPesan = modal.getByRole('button', { name: /^pesan$/i });
  await expect(tombolPesan).toBeEnabled();
  await tombolPesan.click();


  // ================= PEMBAYARAN =================
  const tombolPembayaran = page.getByRole('button', { name: /pembayaran/i });
  await expect(tombolPembayaran).toBeVisible();
  await tombolPembayaran.click();

  const nominal = page.getByRole('button', { name: '100.000' });
  await expect(nominal).toBeVisible();
  await nominal.click();

  const tombolBayarAwal = page.getByRole('button', { name: /^bayar$/i }).first();
  await expect(tombolBayarAwal).toBeEnabled();
  await tombolBayarAwal.click();


  // ================= INPUT NOMOR HP =================
  const nomorHP = page.getByRole('textbox').last();
  await expect(nomorHP).toBeVisible();
  await nomorHP.fill('85747400942');


  // ================= POPUP PEMBAYARAN =================
  const popupPromise = page.waitForEvent('popup');

  const tombolBayarFinal = page.getByRole('button', { name: /^bayar$/i }).last();
  await tombolBayarFinal.click();

  const popupPage = await popupPromise;
  await popupPage.waitForLoadState();


  // ================= KONFIRMASI =================
  const tombolOK = page.getByRole('button', { name: /^ok$/i });
  await expect(tombolOK).toBeVisible();
  await tombolOK.click();

});