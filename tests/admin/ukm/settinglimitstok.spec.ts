import { test, expect } from '@playwright/test';

test('Setting Limit Stok UKM', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://admin.ukm.noretest.com/');

  await page.getByRole('textbox', { name: 'Email' })
    .fill('nana123@email.com');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('nana123');

  await page.getByRole('button', { name: /sign in/i })
    .click();

  // tunggu halaman selesai load
  await page.waitForLoadState('networkidle');


  // ================= MENU UKM =================
  await page.getByRole('link', { name: /UKM/i })
    .first()
    .click();


  // ================= SUB MENU =================
  await page.getByRole('link', { name: /Setting Limit Stok/i })
    .click();


  // ================= PILIH UKM =================
  await page.getByTitle('Pilih UKM')
    .click();

  await page.getByRole('treeitem', { name: 'Firqoh Shop' })
    .click();


  // ================= INPUT LIMIT STOK =================
  const limitStok = page.getByPlaceholder('Limit Stok');

  await expect(limitStok).toBeVisible();
  await limitStok.fill('600');


  // ================= SIMPAN =================
  await page.getByRole('button', { name: /simpan/i })
    .click();

});