import { test, expect } from '@playwright/test';

const EMAIL = 'Firqoh06';
const PASSWORD = 'FirqohNa06';
const UKM_NAME = 'Firqoh Shop';

test('Buat katalog - FINAL ANTI TIMEOUT', async ({ page }) => {
  // ======================
  // LOGIN
  // ======================
  await page.goto('https://ulo-nk-juragan.noretest.com/');

  await page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i }).fill(EMAIL);
  await page.getByRole('textbox', { name: /minimal 8 karakter/i }).fill(PASSWORD);

  await page.getByRole('button', { name: /masuk/i }).click();

  // tunggu URL berubah (jangan pakai waitForURL)
  await expect(page).toHaveURL(/beranda|dashboard|home/i, { timeout: 60000 });

  // ======================
  // MASUK MENU
  // ======================
  const daftarStok = page.getByRole('link', { name: /daftar stok/i });
  await expect(daftarStok).toBeVisible({ timeout: 15000 });
  await daftarStok.click();

  const buatKatalogTab = page.getByRole('tab', { name: /buat katalog/i });
  await expect(buatKatalogTab).toBeVisible({ timeout: 15000 });
  await buatKatalogTab.click();

  await expect(page.getByText(/pilih kategori/i)).toBeVisible({ timeout: 15000 });

  // ======================
  // PILIH UKM
  // ======================
  await page.getByRole('combobox', { name: /pilih ukm/i }).click();

  const ukmOption = page.getByRole('option', {
    name: new RegExp(UKM_NAME, 'i'),
  });

  await expect(ukmOption).toBeVisible({ timeout: 15000 });
  await ukmOption.click();

  // ======================
  // PILIH SEMUA
  // ======================
  const pilihSemua = page
    .locator('text=Pilih Semua')
    .locator('..')
    .locator('input[type="checkbox"]');

  await expect(pilihSemua).toBeAttached({ timeout: 15000 });

  if (!(await pilihSemua.isChecked())) {
    await pilihSemua.check();
  }

  // ======================
  // PILIH FORMAT
  // ======================
  await page.getByRole('radio', { name: /barcode/i }).check();

  // ======================
  // HANDLE POPUP
  // ======================
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: /buat katalog/i }).click(),
  ]);

  // ❗ WAJIB: jangan pakai networkidle / load
  await popup.waitForLoadState('domcontentloaded', { timeout: 60000 });

  // tunggu URL keluar dari about:blank
  await expect.poll(() => popup.url(), {
    timeout: 60000,
  }).not.toBe('about:blank');

  // validasi halaman katalog kebuka
  await expect(popup).toHaveURL(/katalog|barcode/i, { timeout: 60000 });

  // optional: pastikan ada isi
  await expect(popup.locator('body')).toBeVisible();
});