import { test, expect } from '@playwright/test';

test('E2E Pembayaran & Piutang (FINAL FIX TOTAL)', async ({ page }) => {
  test.setTimeout(90000);

  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // LOGIN
  await page.getByRole('textbox', { name: /Contoh/i }).fill('Firqoh06');
  await page.getByRole('textbox', { name: /Minimal/i }).fill('FirqohNa06');
  await page.getByRole('button', { name: /Masuk/i }).click();

  await page.waitForLoadState('networkidle');

  // PESAN
  await page.getByRole('button', { name: /Pesan/i }).first().click();

  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toBeVisible();

  await dialog.getByText('bolen').click();
  await dialog.getByRole('button', { name: /Pesan/i }).click();

  await expect(dialog).toBeHidden();

  // PEMBAYARAN
  await page.getByRole('button', { name: /Pembayaran/i }).click();

  const customerInput = page.getByRole('textbox', { name: /Nama Pelanggan/i }).first();
  await customerInput.fill('fara');

  // 🔥 FIX: pilih dari dropdown
  const customerOption = page.locator('li').filter({ hasText: 'fara' }).first();
  await customerOption.waitFor({ state: 'visible', timeout: 5000 });
  await customerOption.click();

  await page.getByRole('checkbox', { name: /Piutang/i }).check();

  // jatuh tempo
  const jatuhTempo = page.getByRole('textbox', { name: /Jatuh Tempo/i });
  if (await jatuhTempo.count() > 0) {
    await jatuhTempo.fill('30/03/2026');
    await page.keyboard.press('Enter');
  }

  const tanggal = page.getByRole('textbox', { name: /Tanggal/i });
  await tanggal.fill('26/03/2026');
  await page.keyboard.press('Enter');

  // BAYAR
  await page.getByRole('button', { name: /^Bayar$/i }).click();

  // VALIDASI
  const popup = page.locator('.swal2-popup');
  await popup.waitFor({ state: 'visible', timeout: 10000 });

  const text = await popup.innerText();

  if (/error|gagal/i.test(text)) {
    throw new Error('❌ Transaksi gagal: ' + text);
  }

  await expect(popup).toContainText(/berhasil|sukses/i);

  await page.getByRole('button', { name: /OK/i }).click();
});