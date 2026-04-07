import { test, expect } from '@playwright/test';

test('Tambah Bahan Stabil', async ({ page }) => {

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
  // 2. MASUK MENU BAHAN
  // =====================
  const bahanMenu = page.getByRole('button', { name: /bahan & resep/i });
  await expect(bahanMenu).toBeVisible({ timeout: 10000 });
  await bahanMenu.click();

  // =====================
  // 3. TAMBAH BAHAN
  // =====================
  const tambahBahanBtn = page.getByRole('button', { name: /tambah bahan/i });
  await expect(tambahBahanBtn).toBeVisible();
  await tambahBahanBtn.click();

  // =====================
  // 4. PILIH JENIS (BAHAN DASAR)
  // =====================
  const bahanDasar = page.getByRole('menuitem', { name: /bahan dasar/i });
  await expect(bahanDasar).toBeVisible();
  await bahanDasar.click();

  // =====================
  // 5. INPUT NAMA BAHAN (ANTI DUPLICATE)
  // =====================
  const namaInput = page.getByRole('textbox', { name: /contoh: susu/i });
  await expect(namaInput).toBeVisible();

  const namaBahan = `Tapioka-${Date.now()}`;
  await namaInput.fill(namaBahan);

  // =====================
  // 6. PILIH KATEGORI
  // =====================
  const kategoriBtn = page.getByRole('button', { name: /pilih kategori/i });
  await expect(kategoriBtn).toBeVisible();
  await kategoriBtn.click();

  const kategoriOption = page.getByRole('option', { name: /tepung/i });
  await expect(kategoriOption).toBeVisible({ timeout: 10000 });
  await kategoriOption.click();

  // =====================
  // 7. PILIH SATUAN
  // =====================
  const satuanBtn = page.getByRole('button', { name: /pilih satuan/i });
  await expect(satuanBtn).toBeVisible();
  await satuanBtn.click();

  const satuanOption = page.getByRole('option', { name: /kilogram/i });
  await expect(satuanOption).toBeVisible();
  await satuanOption.click();

  // =====================
  // 8. INPUT STOK AWAL
  // =====================
  const stokInput = page.getByPlaceholder('Contoh: 2');
  await expect(stokInput).toBeVisible();
  await stokInput.fill('15');

  // =====================
  // 9. INPUT HARGA
  // =====================
  const hargaInput = page.getByRole('textbox', { name: /contoh: 10.000/i });
  await expect(hargaInput).toBeVisible();

  // hindari format aneh → pakai angka normal
  await hargaInput.fill('10500');

  // =====================
  // 10. SIMPAN
  // =====================
  const simpanBtn = page.getByRole('button', { name: /simpan/i });
  await expect(simpanBtn).toBeEnabled();
  await simpanBtn.click();

  // =====================
  // 11. VALIDASI
  // =====================
  await expect(page.getByText(namaBahan)).toBeVisible({ timeout: 10000 });

});