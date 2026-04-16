import { test, expect } from '@playwright/test';

test('Tambah Kategori Bahan', async ({ page }) => {

  // =====================
  // 1. LOGIN
  // =====================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  const emailInput = page.getByRole('textbox', { name: /contoh: ulo@gmail.com/i });
  const passwordInput = page.getByRole('textbox', { name: /minimal 8 karakter/i });
  const loginButton = page.getByRole('button', { name: /masuk/i });

  await expect(emailInput).toBeVisible();
  await emailInput.fill('Firqoh06');

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill('FirqohNa06');

  await expect(loginButton).toBeEnabled();
  await loginButton.click();

  // =====================
  // 2. MASUK MENU BAHAN & RESEP
  // =====================
  const bahanMenu = page.getByRole('button', { name: /bahan & resep/i });
  await expect(bahanMenu).toBeVisible({ timeout: 10000 });
  await bahanMenu.click();

  // =====================
  // 3. PILIH TAB KATEGORI BAHAN
  // =====================
  const kategoriTab = page.getByRole('tab', { name: /kategori bahan/i });
  await expect(kategoriTab).toBeVisible();
  await kategoriTab.click();

  // =====================
  // 4. TAMBAH KATEGORI
  // =====================
  const tambahKategoriBtn = page.getByRole('button', { name: /tambah kategori/i });
  await expect(tambahKategoriBtn).toBeVisible();
  await tambahKategoriBtn.click();

  // =====================
  // 5. INPUT NAMA KATEGORI
  // =====================
  const inputKategori = page.getByRole('textbox', { name: /masukkan nama kategori/i });
  await expect(inputKategori).toBeVisible();

  // Hindari bentrok data (biar gak duplicate)
  const namaKategori = `Gula-${Date.now()}`;
  await inputKategori.fill(namaKategori);

  // =====================
  // 6. SIMPAN
  // =====================
  const simpanBtn = page.getByRole('button', { name: /simpan/i });
  await expect(simpanBtn).toBeEnabled();
  await simpanBtn.click();

  // =====================
  // 7. VALIDASI (OPSIONAL TAPI DISARANKAN)
  // =====================
  await expect(page.getByText(namaKategori)).toBeVisible({ timeout: 10000 });

});