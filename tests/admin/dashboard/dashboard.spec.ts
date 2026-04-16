import { test, expect } from '@playwright/test';

test('Login dan akses dashboard Statistik ULO', async ({ page }) => {
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

  // ================= MASUK DASHBOARD =================
  await page.goto(
    'https://admin.ukm.noretest.com/statsUloDashboard?year=2023&quarter=1'
  );

  // tunggu page stabil
  await page.waitForLoadState('networkidle');

  // ✅ tunggu heading yang UNIQUE (fix strict mode)
  const dashboardHeading = page.getByRole('heading', {
    name: 'Statistik ULO',
    exact: true,
  });

  await expect(dashboardHeading).toBeVisible({ timeout: 15000 });

  // ================= INTERAKSI SELECT2 =================
  const dropdown = page.locator('.select2-selection').first();

  await expect(dropdown).toBeVisible({ timeout: 15000 });
  await dropdown.click();

  // 👉 OPTIONAL: pilih option jika diperlukan
  // await page.getByRole('option').first().click();

  // ================= RESET FILTER =================
  await page.getByRole('button', { name: /reset/i }).click();

  // ================= VALIDASI =================
  await expect(page).toHaveURL(/statsUloDashboard/);
});