import { test, expect } from '@playwright/test';

test('Tambah kategori - rapi & stabil', async ({ page }) => {
  // ======================
  // 1. LOGIN
  // ======================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page).toHaveURL(/beranda/i);

  // ======================
  // 2. MASUK MENU KATEGORI
  // ======================
  await page.getByRole('link', { name: /daftar kategori/i }).click();

  // ======================
  // 3. TAMBAH KATEGORI
  // ======================
  await page.getByRole('button', { name: /tambah kategori/i }).click();

  const inputKategori = page.getByRole('textbox', {
    name: /masukkan nama kategori/i,
  });

  await expect(inputKategori).toBeVisible();
  await inputKategori.fill('kebersihan');

  await page.getByRole('button', { name: /tambahkan/i }).click();

  // ======================
  // 4. VALIDASI
  // ======================
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/kebersihan/i)).toBeVisible();
});