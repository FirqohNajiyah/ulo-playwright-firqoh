import { test, expect } from '@playwright/test';

test('Buat Resep Stabil Tanpa Error', async ({ page }) => {

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
  // 2. MASUK MENU
  // =====================
  const bahanMenu = page.getByRole('button', { name: /bahan & resep/i });
  await expect(bahanMenu).toBeVisible({ timeout: 10000 });
  await bahanMenu.click();

  // =====================
  // 3. TAB RESEP
  // =====================
  const resepTab = page.getByRole('tab', { name: /^resep$/i });
  await expect(resepTab).toBeVisible();
  await resepTab.click();

  // =====================
  // 4. BUAT RESEP
  // =====================
  const buatResepBtn = page.getByRole('button', { name: /buat resep/i });
  await expect(buatResepBtn).toBeVisible();
  await buatResepBtn.click();

  // =====================
  // 5. DIALOG MUNCUL
  // =====================
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // =====================
  // 6. PILIH DATA (INI KUNCI BIAR LANJUTKAN AKTIF)
  // =====================
  const firstRow = dialog.locator('tbody tr').first();
  await expect(firstRow).toBeVisible({ timeout: 10000 });
  await firstRow.click();

  // =====================
  // 7. LANJUTKAN (SUDAH ENABLED)
  // =====================
  const lanjutBtn = dialog.getByRole('button', { name: /lanjutkan/i });
  await expect(lanjutBtn).toBeEnabled({ timeout: 10000 });
  await lanjutBtn.click();

  // =====================
  // 8. DROPDOWN "BUKA" (FIX STRICT MODE)
  // =====================
  const bukaDropdown = dialog.getByRole('button', { name: /buka/i }).first();
  await expect(bukaDropdown).toBeVisible();
  await bukaDropdown.click();

  // =====================
  // 9. PILIH PRODUK
  // =====================
  const produkOption = page.getByRole('option', { name: /brownis kering/i });
  await expect(produkOption).toBeVisible({ timeout: 10000 });
  await produkOption.click();

  // =====================
  // 10. INPUT QTY
  // =====================
  const qtyInput = dialog.getByPlaceholder('0');
  await expect(qtyInput).toBeVisible();
  await qtyInput.fill('2');

  // =====================
  // 11. TAMBAHKAN
  // =====================
  const tambahBtn = dialog.getByRole('button', { name: /tambahkan/i });
  await expect(tambahBtn).toBeEnabled();
  await tambahBtn.click();

  // =====================
  // 12. VALIDASI
  // =====================
  await expect(page.getByText(/brownis kering/i)).toBeVisible({ timeout: 10000 });

});