import { test, expect } from '@playwright/test';

const EMAIL = 'nana123@email.com';
const PASSWORD = 'nana123';
const ACCOUNT_NUMBER = '1-100007';
const ACCOUNT_NAME = 'bon';

test('COA - Tambah akun baru', async ({ page }) => {
  // ======================
  // LOGIN
  // ======================
  await page.goto('https://admin.ukm.noretest.com/');

  await page.getByRole('textbox', { name: 'Email' }).fill(EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);

  await page.getByRole('button', { name: /sign in/i }).click();

  // 🔥 GANTI INI (lebih stabil dari waitForURL)
  await expect(page).toHaveURL(/dashboard/, { timeout: 60000 });

  // optional: pastikan dashboard beneran muncul
  await expect(page.getByText(/dashboard/i)).toBeVisible();

  // ======================
  // NAVIGATE KE COA
  // ======================
  await page.getByRole('link', { name: /coa/i }).first().click();
  await page.getByRole('link', { name: /coa/i }).last().click();

  // ======================
  // ISI FORM
  // ======================
  await page.getByRole('textbox', { name: 'Nomor Akun' }).fill(ACCOUNT_NUMBER);
  await page.getByRole('textbox', { name: 'Nama Akun' }).fill(ACCOUNT_NAME);

  // kategori
  await page.getByTitle('Pilih Kategori').click();
  await page.getByRole('treeitem', { name: 'Kas & Bank' }).click();

  // tipe saldo
  await page.getByTitle('Pilih Tipe Saldo').click();
  await page.getByRole('treeitem', { name: 'Kredit' }).click();

  // ======================
  // SIMPAN
  // ======================
  await page.getByRole('button', { name: /simpan/i }).click();

  // optional: verifikasi berhasil
  await expect(page.getByText(ACCOUNT_NAME)).toBeVisible();
});