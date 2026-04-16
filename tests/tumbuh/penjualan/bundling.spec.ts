import { test, expect } from '@playwright/test';

test('Tambah bundling produk full flow', async ({ page }) => {

  const BASE_URL = 'https://ulo-nk-tumbuh.noretest.com/';
  const EMAIL = 'Firqoh06';
  const PASSWORD = 'FirqohNa06';

  const NAMA_BUNDLING = 'Paket Manisan Hemat';
  const HARGA = '50000';

  // LOGIN
  await page.goto(BASE_URL);

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page.getByRole('button', { name: /tambah barang/i }))
    .toBeVisible({ timeout: 15000 });

  // MASUK BUNDLING
  await page.getByRole('button', { name: /tambah barang/i }).click();
  await page.getByRole('menuitem', { name: /bundling/i }).click();

  // PILIH PRODUK (FIX TOTAL)
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible({ timeout: 10000 });

  await page.waitForLoadState('networkidle');

  const checkboxes = modal.locator('input[type="checkbox"], .MuiCheckbox-root');

  await expect(checkboxes.first()).toBeVisible({ timeout: 15000 });

  await checkboxes.first().click({ force: true });
  await checkboxes.first().click({ force: true });

  await page.waitForTimeout(500);

  // LANJUTKAN
  const lanjutkanBtn = page.getByRole('button', { name: /lanjutkan/i });

  await expect(lanjutkanBtn).toBeEnabled({ timeout: 15000 });
  await lanjutkanBtn.click();

  // ISI FORM
  const namaBundling = page.getByRole('textbox', { name: /nama bundling|nama paket/i });
  await expect(namaBundling).toBeVisible();
  await namaBundling.fill(NAMA_BUNDLING);

  const harga = page.getByRole('textbox', { name: /harga/i });
  await harga.fill(HARGA);

  // SIMPAN
  await page.getByRole('button', { name: /simpan|tambahkan/i }).click();

  // VALIDASI
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toContainText(/paket manisan hemat/i, {
    timeout: 15000,
  });
});
