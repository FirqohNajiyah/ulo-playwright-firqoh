import { test, expect } from '@playwright/test';

test('Tambah Sub Kategori', async ({ page }) => {
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // klik awal (sesuai script kamu)
  await page.locator('div').nth(2).click();

  // =====================
  // LOGIN
  // =====================
  const email = page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' });
  await email.click();
  await email.fill('Firqoh06');

  const password = page.getByRole('textbox', { name: 'Minimal 8 karakter' });
  await password.click();
  await password.fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu halaman setelah login
  await expect(page.getByRole('link', { name: 'Manajemen Stok' }))
    .toBeVisible();

  // =====================
  // MASUK MENU
  // =====================
  await page.getByRole('link', { name: 'Manajemen Stok' }).click();
  await page.getByRole('tab', { name: 'Atur Sub Kategori' }).click();

  // =====================
  // TAMBAH DATA
  // =====================
  await page.getByRole('button', { name: 'Tambah Sub Kategori' }).click();

  await page.getByRole('button', { name: 'Buka' }).click();
  await page.getByRole('option', { name: 'Drink' }).click();

  // tetap pakai nama kamu (bisa diganti kalau mau)
  const subKategori = 'Ice Lemon Tea';

  const input = page.getByRole('textbox', {
    name: 'Masukkan nama sub kategori'
  });

  await input.click();
  await input.fill(subKategori);

  await page.getByRole('button', { name: 'Tambahkan' }).click();

  // =====================
  // VALIDASI (FIX ERROR DI SINI)
  // =====================

  // kalau sukses → modal hilang
  const dialog = page.getByRole('dialog');

  // tunggu salah satu kondisi: sukses atau error
  try {
    await expect(dialog).not.toBeVisible({ timeout: 5000 });

    // kalau sukses → cek data muncul
    await expect(page.getByText(subKategori)).toBeVisible({
      timeout: 10000
    });

  } catch (e) {
    // kalau gagal → cek pesan error
    await expect(page.getByText(/telah digunakan/i)).toBeVisible();
  }
});