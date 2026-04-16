import { test, expect } from '@playwright/test';

test('Mulai & Akhiri Shift', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  const email = page.getByRole('textbox', { name: 'Contoh: ulo@gmail.com' });
  const password = page.getByRole('textbox', { name: 'Minimal 8 karakter' });

  await expect(email).toBeVisible();
  await email.fill('Firqoh06');

  await expect(password).toBeVisible();
  await password.fill('FirqohNa06');

  await page.getByRole('button', { name: 'Masuk' }).click();

  // tunggu halaman setelah login
  await page.waitForLoadState('networkidle');
  const shiftBtn = page.getByRole('button', { name: /Shift/ });
  await expect(shiftBtn).toBeVisible();


  // ================= MULAI SHIFT =================
  await shiftBtn.click();

  const kasAwal = page.getByRole('textbox', { name: 'Masukan kas awal, Contoh' });
  await expect(kasAwal).toBeVisible();
  await kasAwal.fill('200000'); // hindari format titik

  const mulaiShift = page.getByRole('button', { name: 'Mulai Shift' });
  await expect(mulaiShift).toBeEnabled();
  await mulaiShift.click();


  // ================= AKHIRI SHIFT =================
  const akhiriShift = page.getByRole('button', { name: 'Akhiri Shift' });
  await expect(akhiriShift).toBeVisible();
  await akhiriShift.click();


  // ================= INPUT KAS AKHIR =================
  // ❌ jangan pakai #mui-58 (dynamic)
  // ✅ pakai locator berdasarkan label

  const kasAkhir = page.getByRole('textbox').last(); // fallback kalau tidak ada label unik
  await expect(kasAkhir).toBeVisible();
  await kasAkhir.fill('250000');


  // ================= KONFIRM AKHIRI SHIFT =================
  const konfirmasiAkhiri = page.getByRole('button', { name: 'Akhiri Shift' }).last();

  await expect(konfirmasiAkhiri).toBeEnabled();
  await konfirmasiAkhiri.click();

});