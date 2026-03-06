import { test, expect } from '@playwright/test';

test('Tambah user baru', async ({ page }) => {

  await page.goto('https://admin.ukm.noretest.com/');

  // LOGIN
  await page.getByRole('textbox', { name: 'Email' }).fill('nana123@email.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('nana123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForLoadState('networkidle');

  // MENU USERS
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('link', { name: 'Tambah User & UKM' }).click();

  await expect(page.getByRole('heading', { name: 'Tambah User & UKM' })).toBeVisible();

  // FORM
  await page.getByLabel('Nama').fill('Dela');
  await page.getByLabel('Username').fill('dela06');
  await page.getByLabel('Email').fill('dela06@email.com');
  await page.getByLabel('No Telepon').fill('085747400942');
  await page.getByLabel('Password').fill('dela123');

  // SIMPAN
  await page.getByRole('button', { name: 'Simpan' }).click();

});