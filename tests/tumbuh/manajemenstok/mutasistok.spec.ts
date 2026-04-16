import { test, expect } from '@playwright/test';

test('Mutasi Stok - Stok Keluar', async ({ page }) => {
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // =====================
  // LOGIN
  // =====================
  await page.getByRole('textbox', { name: /contoh/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /minimal/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /masuk/i }).click();

  // VALIDASI LOGIN
  const menuStok = page.getByRole('link', { name: /manajemen stok/i });
  await expect(menuStok).toBeVisible({ timeout: 15000 });

  // =====================
  // NAVIGASI
  // =====================
  await menuStok.click();
  await page.getByRole('tab', { name: /mutasi stok/i }).click();

  // tunggu tabel muncul
  const rows = page.locator('[role="row"]');
  await expect(rows.first()).toBeVisible({ timeout: 15000 });

  // =====================
  // TAMBAH DATA
  // =====================
  const tambahBtn = page.getByRole('button', { name: /tambah/i });
  await expect(tambahBtn).toBeVisible();
  await tambahBtn.click();

  // =====================
  // PILIH ITEM (LEBIH AMAN)
  // =====================
  const itemRow = page.locator('[role="row"]').nth(1);
  await expect(itemRow).toBeVisible();

  // klik checkbox di dalam row
  const checkbox = itemRow.locator('input[type="checkbox"]');
  await checkbox.check();

  // =====================
  // LANJUTKAN
  // =====================
  const lanjutkanBtn = page.getByRole('button', { name: /lanjutkan/i });
  await expect(lanjutkanBtn).toBeEnabled({ timeout: 20000 });
  await lanjutkanBtn.click();

  // =====================
  // PILIH JENIS
  // =====================
  await page.getByRole('button', { name: /stok masuk/i }).click();
  await page.getByRole('option', { name: /stok keluar/i }).click();

  // =====================
  // INPUT QTY
  // =====================
  const qtyInput = page.locator('input[type="number"]').first();
  await expect(qtyInput).toBeVisible();
  await qtyInput.fill('3');

  // =====================
  // SIMPAN
  // =====================
  const simpanBtn = page.getByRole('button', { name: /simpan/i });
  await expect(simpanBtn).toBeEnabled();
  await simpanBtn.click();

  // =====================
  // VALIDASI
  // =====================
  await expect(page.getByText(/berhasil|sukses/i)).toBeVisible({
    timeout: 10000,
  });
});