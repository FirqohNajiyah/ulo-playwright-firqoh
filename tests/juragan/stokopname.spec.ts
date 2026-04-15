import { test, expect } from '@playwright/test';

test('Stok opname - FINAL STABIL', async ({ page }) => {
  // ======================
  // 1. LOGIN
  // ======================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page).toHaveURL(/beranda/i);

  // ======================
  // 2. MASUK MENU STOK OPNAME
  // ======================
  await page.getByRole('link', { name: /stok opname/i }).click();

  // tunggu tabel muncul (WAJIB)
  await expect(page.locator('table')).toBeVisible();

  // ======================
  // 3. DATA PRODUK
  // ======================
  const produkList = [
    { nama: 'Brownis Lumer', qty: '2' },
    { nama: 'Brownis kering', qty: '22' },
    { nama: 'croissant', qty: '25' },
    { nama: 'Ice Cream', qty: '37' },
    { nama: 'Sorbet', qty: '29' },
  ];

  // ======================
  // 4. INPUT STOK (FIX TOTAL)
  // ======================
  for (const produk of produkList) {
    // cari row berdasarkan text (tidak perlu full string)
    const row = page.locator('tr').filter({ hasText: produk.nama }).first();

    const input = row.locator('input').first();

    await input.waitFor({ state: 'visible' });
    await input.fill(produk.qty);
  }

  // ======================
  // 5. PROSES OPNAME
  // ======================
  await page.getByRole('button', { name: /proses opname/i }).click();

  // ======================
  // 6. VALIDASI
  // ======================
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/berhasil|sukses/i)).toBeVisible();
});

