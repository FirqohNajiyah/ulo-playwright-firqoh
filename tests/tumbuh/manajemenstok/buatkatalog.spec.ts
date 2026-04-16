import { test, expect } from '@playwright/test';

test('Buat Katalog - Valid', async ({ page }) => {
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // =====================
  // LOGIN
  // =====================
  await page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' })
    .fill('Firqoh06');

  await page.getByRole('textbox', { name: 'Minimal 8 karakter' })
    .fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  await expect(page.getByRole('button', { name: 'Manajemen Stok' }))
    .toBeVisible();

  // =====================
  // MASUK MENU
  // =====================
  await page.getByRole('button', { name: 'Manajemen Stok' }).click();
  await page.getByRole('tab', { name: 'Buat Katalog' }).click();

  // =====================
  // PILIH PRODUK
  // =====================
  const produkList = [
    'Brownies Lumer',
    'Chiffon Cake',
    'Bolen pisang',
    'Eclair',
    'Cheesecake',
    'Cookies'
  ];

  for (const produk of produkList) {
    await page.getByRole('button', { name: 'Buka' }).click();
    await page.getByRole('option', { name: produk }).click();
  }

  // =====================
  // PILIH TIPE
  // =====================
  await page.locator('.MuiCollapse-wrapperInner > .MuiBox-root').click();
  await page.getByRole('radio', { name: 'Menu' }).check();

  // =====================
  // MONITOR API (VALIDASI UTAMA)
  // =====================
  const responsePromise = page.waitForResponse(res =>
    res.url().toLowerCase().includes('katalog') && res.status() === 200
  );

  // =====================
  // KLIK BUAT KATALOG
  // =====================
  await page.getByRole('button', { name: 'Buat Katalog' }).click();

  // =====================
  // VALIDASI API
  // =====================
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();

  // =====================
  // VALIDASI UI (OPTIONAL)
  // =====================
  // tidak ada error muncul
  await expect(page.getByText(/error|gagal/i)).not.toBeVisible();

  // tombol masih ada (halaman tidak crash)
  await expect(page.getByRole('button', { name: 'Buat Katalog' }))
    .toBeVisible();
});