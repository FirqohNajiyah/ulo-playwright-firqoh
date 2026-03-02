import { test, expect } from '@playwright/test';

test('Registrasi Tumbuh berhasil dengan data valid', async ({ page }) => {
  await page.goto('https://ulo-nk-tumbuh.noretest.com/');

  // buka halaman daftar
  await page.getByRole('link', { name: 'Daftar Sekarang' }).click();

  // isi form registrasi
  await page.getByRole('textbox', { name: 'Contoh: Budi Saputra' }).fill('Darawati');
  await page.getByRole('textbox', { name: 'Contoh: budi93', exact: true }).fill('Dara20');
  await page.getByRole('textbox', { name: 'Contoh: budi93@gmail.com' }).fill('dara20@gmail.com');

  await page.getByPlaceholder('831xxxxxx').fill('85747400942');

  await page.getByRole('textbox', { name: 'Pilih Provinsi' }).click();
  await page.getByRole('option', { name: 'JAWA TENGAH' }).click();

  await page.getByRole('textbox', { name: 'Pilih Kota' }).click();
  await page.getByRole('option', { name: 'KOTA SEMARANG' }).click();

  await page
    .getByRole('textbox', { name: 'Contoh: Jalan Merdeka Raya no. 45' })
    .fill('Jalan Dr.Cipto no 23');

  await page.locator('#password').fill('Dara2024');
  await page.locator('#passwordUlang').fill('Dara2024');

  await page.getByRole('textbox', { name: 'Contoh: Budi Shop' }).fill('Dara PetShop');

  // captcha di-skip (harus dibypass di staging)

  // klik daftar
  await page.getByRole('button', { name: 'Daftar' }).click();

  // ASSERTION (WAJIB)
  await expect(
    page.getByRole('button', { name: 'Kembali ke halaman Masuk' })
  ).toBeVisible();
});