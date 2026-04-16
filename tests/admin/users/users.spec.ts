import { test, expect } from '@playwright/test';

test('Tambah User & UKM', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://admin.ukm.noretest.com/');

  await page.getByRole('textbox', { name: 'Email' }).fill('nana123@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('nana123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForLoadState('networkidle');

  // ================= MENU USERS =================
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('link', { name: 'Tambah User & UKM' }).click();

  await page.waitForURL('**/multi-user-ukm');

  // ================= INPUT YANG TERLIHAT =================
  const inputs = page.locator('input:visible');

  await inputs.nth(0).fill('Test User');           
  await inputs.nth(1).fill('testuser01');         
  await inputs.nth(2).fill('testuser01@email.com');
  await inputs.nth(3).fill('081234567890');       
  await inputs.nth(4).fill('password123');        
  await inputs.nth(5).fill('UKM Test');           

  // ================= SIMPAN =================
  await page.getByRole('button', { name: /simpan/i }).click();

});