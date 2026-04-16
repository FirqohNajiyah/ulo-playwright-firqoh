import { test, expect } from '@playwright/test';

test('Tambah Kategori', async ({ page }) => {
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // Login
  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  // ✅ Validasi masuk ke halaman penjualan
  await expect(page).toHaveURL(/transaksi/i);

  // Tunggu halaman stabil
  await page.waitForLoadState('networkidle');

  // Klik Manajemen Stok
  await page.getByRole('link', { name: /manajemen stok/i }).click();

  // Klik Atur Kategori
  const tabKategori = page.getByRole('tab', { name: /atur kategori/i });
  await expect(tabKategori).toBeVisible();
  await tabKategori.click();

  // Tambah kategori
  await page.getByRole('button', { name: /tambah kategori/i }).click();

  const inputKategori = page.getByRole('textbox', {
    name: /masukkan nama kategori/i,
  });

  await expect(inputKategori).toBeVisible();
  await inputKategori.fill('Manisan');

  await page.getByRole('button', { name: /tambahkan/i }).click();

  // Validasi berhasil
  await expect(page.locator('body')).toContainText(/manisan/i);
});