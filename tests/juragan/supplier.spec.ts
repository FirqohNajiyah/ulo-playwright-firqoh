import { test, expect } from '@playwright/test';

test.describe('Supplier Flow', () => {

  test('Tambah Supplier', async ({ page }) => {

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
    // 2. NAVIGASI KE SUPPLIER
    // =====================
    await page.getByRole('button', { name: /ukm/i }).click();
    await page.getByRole('link', { name: /supplier/i }).click();


    // =====================
    // 3. TAMBAH SUPPLIER
    // =====================
    await page.getByRole('button', { name: /tambah supplier/i }).click();

    // pilih toko
    await page.getByRole('button', { name: /buka/i }).click();
    await page.getByRole('option', { name: 'Firqoh Shop' }).click();

    // input nama supplier
    await page.getByRole('textbox', { name: /masukkan nama supplier/i })
      .fill('dola');

    // input no hp
    await page.getByPlaceholder('831xxxxxx')
      .fill('85747400942');

    // submit
    await page.getByRole('button', { name: /tambahkan/i }).click();


    // =====================
    // 4. ASSERTION (OPSIONAL)
    // =====================
    await expect(page.getByText('dola')).toBeVisible();
  });

});