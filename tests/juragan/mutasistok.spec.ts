import { test, expect } from '@playwright/test';

test('Mutasi stok - FINAL FIX STEP', async ({ page }) => {
  // LOGIN
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page).toHaveURL(/beranda/i);

  // MASUK MENU
  await page.getByRole('link', { name: /mutasi stok/i }).click();
  await page.getByRole('tab', { name: /mutasi stok/i }).click();

  // PILIH PRODUK
  const lanjutBtn = page.getByRole('button', { name: /lanjutkan/i }).first();
  await expect(lanjutBtn).toBeVisible();
  await lanjutBtn.click();

  // ✅ tunggu step berikutnya muncul (INI KUNCI)
  await expect(page.getByText(/stok masuk|kategori/i)).toBeVisible();

  // COMBOBOX (pakai placeholder, bukan role)
  const kategori = page.getByPlaceholder(/kategori/i);
  await kategori.click({ force: true });

  // pilih option
  const stokMasuk = page.getByRole('option', { name: /stok masuk/i });
  await expect(stokMasuk).toBeVisible();
  await stokMasuk.click();

  // INPUT
  const qty = page.getByRole('spinbutton');
  await expect(qty).toBeVisible();
  await qty.fill('18');

  // SIMPAN
  await page.getByRole('button', { name: /simpan/i }).click();

  // VALIDASI
  await page.waitForLoadState('networkidle');
  await expect(page.getByText(/berhasil|sukses/i)).toBeVisible();
});