import { test, expect } from '@playwright/test';

test('Tambah user karyawan berhasil', async ({ page }) => {
  // ===== helper data unik (anti duplicate) =====
  const unique = Date.now();
  const username = `dilanda${unique}@mail.com`;
  const email = `dilala${unique}@gmail.com`;

  // ================= LOGIN =================
  await page.goto('https://admin.ukm.noretest.com/login');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('textbox', { name: /email/i })
    .fill('nana123@email.com');

  await page.getByRole('textbox', { name: /password/i })
    .fill('nana123');

  await Promise.all([
    page.waitForURL(url => !url.toString().includes('/login')),
    page.getByRole('button', { name: /sign in/i }).click(),
  ]);

  // ================= MENU USERS =================
  await page.getByRole('link', { name: /users/i }).click();
  await page.getByRole('link', { name: /karyawan/i }).click();

  // ================= TAMBAH =================
  await page.getByRole('button', { name: /tambah/i }).click();

  await page.getByRole('textbox', { name: /username/i })
    .fill(username);

  await page.getByRole('textbox', { name: /^email$/i })
    .fill(email);

  await page.getByRole('textbox', { name: /alamat/i })
    .fill('papanrejo');

  await page.getByRole('textbox', { name: /nomor telepon/i })
    .fill('085747400942');

  await page.getByRole('textbox', { name: /^password$/i })
    .fill('dilandamusibah');

  // ================= SIMPAN =================
  await page.getByRole('button', { name: /simpan/i }).click();

});
