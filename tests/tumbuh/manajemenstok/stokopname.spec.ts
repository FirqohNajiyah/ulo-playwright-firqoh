import { test, expect } from '@playwright/test';

test('Stok Opname Stabil', async ({ page }) => {

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
  // 2. MASUK MENU MANAJEMEN STOK
  // =====================
  const stokMenu = page.getByRole('button', { name: /manajemen stok/i });
  await expect(stokMenu).toBeVisible({ timeout: 10000 });
  await stokMenu.click();

  // =====================
  // 3. TAB STOK OPNAME
  // =====================
  const opnameTab = page.getByRole('tab', { name: /stok opname/i });
  await expect(opnameTab).toBeVisible();
  await opnameTab.click();

  // =====================
  // 4. MULAI OPNAME
  // =====================
  const mulaiBtn = page.getByRole('button', { name: /mulai opname/i });
  await expect(mulaiBtn).toBeEnabled();
  await mulaiBtn.click();

  // =====================
  // 5. TUNGGU TABEL MUNCUL
  // =====================
  const tableRows = page.locator('tbody tr');
  await expect(tableRows.first()).toBeVisible({ timeout: 10000 });

  // =====================
  // 6. ISI DATA (LEBIH AMAN)
  // =====================

  // Brownis Lumer
  const rowLumer = page.getByRole('row', { name: /brownis lumer/i });
  const inputLumer = rowLumer.getByPlaceholder('0');

  await expect(inputLumer).toBeVisible();
  await inputLumer.fill('1');

  // Brownis Kering
  const rowKering = page.getByRole('row', { name: /brownis kering/i });
  const inputKering = rowKering.getByPlaceholder('0');

  await expect(inputKering).toBeVisible();
  await inputKering.fill('19');

  // Croissant
  const rowCroissant = page.getByRole('row', { name: /croissant/i });
  const inputCroissant = rowCroissant.getByPlaceholder('0');

  await expect(inputCroissant).toBeVisible();
  await inputCroissant.fill('29');

  // =====================
  // 7. PROSES OPNAME
  // =====================
  const prosesBtn = page.getByRole('button', { name: /proses opname/i });

  await expect(prosesBtn).toBeEnabled({ timeout: 10000 });
  await prosesBtn.click();

  // =====================
  // 8. VALIDASI (OPSIONAL)
  // =====================
  await expect(page.getByText(/berhasil|sukses/i)).toBeVisible({ timeout: 10000 });

});