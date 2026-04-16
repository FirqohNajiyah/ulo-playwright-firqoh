import { test, expect } from '@playwright/test';

test.describe('Sub Kategori Flow', () => {

  test('Tambah Sub Kategori', async ({ page }) => {

    // =====================
    // 1. LOGIN
    // =====================
    await page.goto('https://ulo-nk-juragan.noretest.com/');

    await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i })
      .fill('Firqoh06');

    await page.getByRole('textbox', { name: /minimal 8 karakter/i })
      .fill('FirqohNa06');

    await page.getByRole('button', { name: /masuk/i }).click();


    // =====================
    // 2. NAVIGATE KE SUB KATEGORI
    // =====================
    await page.getByRole('link', { name: /daftar sub kategori/i }).click();


    // =====================
    // 3. TAMBAH SUB KATEGORI
    // =====================
    await page.getByRole('button', { name: /tambah sub kategori/i }).click();

    // pilih toko
    await page.getByRole('button', { name: /buka/i }).click();
    await page.getByRole('option', { name: 'Firqoh Shop' }).click();

    // pilih kategori
    await page.getByRole('combobox', { name: /pilih kategori/i }).click();
    await page.getByRole('option', { name: 'kebersihan' }).click();

    // input nama sub kategori
    await page.getByRole('textbox', { name: /nama sub kategori/i })
      .fill('Pel');

    // submit
    await page.getByRole('button', { name: /tambahkan/i }).click();


    // =====================
    // 4. ASSERTION (OPSIONAL TAPI DISARANKAN)
    // =====================
    await expect(page.getByText('Pel')).toBeVisible();
  });

});