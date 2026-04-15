import { test, expect } from '@playwright/test';

test('Buat katalog - FINAL STABIL NO TIMEOUT', async ({ page }) => {
  // ======================
  // 1. LOGIN
  // ======================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  await expect(page).toHaveURL(/beranda/i);

  // ======================
  // 2. MASUK MENU BUAT KATALOG
  // ======================
  await page.getByRole('link', { name: /daftar stok/i }).click();
  await page.getByRole('tab', { name: /buat katalog/i }).click();

  // VALIDASI HALAMAN (BUKAN TABLE)
  await expect(page.getByText(/pilih kategori/i)).toBeVisible();

  // ======================
  // 3. PILIH UKM
  // ======================
  await page.getByRole('combobox', { name: /pilih ukm/i }).click();
  await page.getByRole('option', { name: /firqoh shop/i }).click();

  // ======================
  // 4. PILIH SEMUA (FIX MUI CHECKBOX)
  // ======================
  const pilihSemua = page
    .locator('text=Pilih Semua')
    .locator('..')
    .locator('input[type="checkbox"]');

  await expect(pilihSemua).toBeVisible();

  if (!(await pilihSemua.isChecked())) {
    await pilihSemua.check();
  }

  // ======================
  // 5. PILIH FORMAT
  // ======================
  await page.getByRole('radio', { name: /barcode/i }).check();

  // ======================
  // 6. BUAT KATALOG (POPUP)
  // ======================
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: /buat katalog/i }).click(),
  ]);

  // ======================
  // 7. VALIDASI POPUP (FIX TIMEOUT)
  // ======================
  // ❌ jangan pakai 'load'
  // await popup.waitForLoadState('load');

  // ✅ pakai ini
  await popup.waitForLoadState('domcontentloaded');

  // validasi popup sudah kebuka
  await expect(popup).toHaveURL(/katalog|barcode/i);
});