import { test, expect } from '@playwright/test';

test('Tambah UKM / Toko baru', async ({ page }) => {

  // ================= LOGIN =================
  await page.goto('https://admin.ukm.noretest.com/');

  await page.getByRole('textbox', { name: 'Email' })
    .fill('nana123@email.com');

  await page.getByRole('textbox', { name: 'Password' })
    .fill('nana123');

  await page.getByRole('button', { name: /sign in/i }).click();

  // tunggu dashboard load
  await page.waitForLoadState('networkidle');


  // ================= MENU UKM UTAMA =================
  const menuUKM = page.getByRole('link', { name: 'UKM' }).first();
  await expect(menuUKM).toBeVisible();
  await menuUKM.click();

  // tunggu submenu muncul
  await page.waitForTimeout(1000);


  // ================= SUBMENU UKM =================
  const subMenuUKM = page.getByRole('link', { name: 'UKM' }).nth(1);
  await expect(subMenuUKM).toBeVisible();
  await subMenuUKM.click();


  // ================= TOMBOL TAMBAH =================
  const tombolTambah = page.locator('button:has-text("Tambah")');
  await expect(tombolTambah).toBeVisible({ timeout: 10000 });
  await tombolTambah.click();


  // ================= ISI FORM =================
  await page.getByRole('textbox', { name: 'Nama Toko' })
    .fill('Catty Patty');

  await page.getByRole('textbox', { name: 'Alamat Toko' })
    .fill('Jl. Cipto No42');

  await page.getByRole('textbox', { name: 'UID Toko' })
    .fill('CP001');

  await page.getByRole('textbox', { name: 'Keterangan Toko' })
    .fill('Kelontong');

  await page.getByRole('textbox', { name: 'Deskripsi Toko' })
    .fill('Jual Makanan Kucing');

  await page.getByRole('textbox', { name: 'Nomor Telepon Toko' })
    .fill('085737488953');

  await page.getByRole('textbox', { name: 'Jenis Usaha UKM' })
    .fill('Kelontong');


  // ================= PILIH SKALA USAHA =================
  await page.getByTitle('Pilih', { exact: true }).click();
  await page.getByRole('treeitem', { name: 'Sedang' }).click();


  // ================= OMZET =================
  await page.getByRole('textbox', { name: 'Perkiraan Omzet pertahun' })
    .fill('7500000');


  // ================= SIMPAN =================
  const tombolSimpan = page.locator('button:has-text("Simpan")');
  await expect(tombolSimpan).toBeVisible();
  await tombolSimpan.click();


  // ================= VALIDASI (OPSIONAL) =================
  // contoh jika ada toast notifikasi
  // await expect(page.getByText(/berhasil/i)).toBeVisible();

});