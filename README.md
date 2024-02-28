# KONFLIX – Movie Web Application (KONFLIX Team)

## Deskripsi

KONFLIX adalah aplikasi web yang didukung oleh kecerdasan buatan (AI) yang menyediakan informasi tentang film, ulasan pengguna, rekomendasi, whistlist, watchlist dan fitur terkait film lainnya.

## Struktur Direktori

MovieListe/: Berisi Folder frontend dan backend.
frontend/: Berisi kode untuk antarmuka pengguna (UI) yang akan diakses melalui browser.
backend/: Berisi kode untuk logika aplikasi, interaksi dengan database, dan penyediaan data ke frontend.

## Instalasi

Frontend
1. Masuk ke direktori frontend: cd frontend.
2. Install dependensi yang diperlukan: npm install.
3. Jalankan aplikasi frontend: npm run dev.
4. Aplikasi frontend akan diakses melalui browser di http://localhost:5173.

Backend
1. Masuk ke direktori backend: cd backend.
2. Install dependensi yang diperlukan: npm install.
3. Atur konfigurasi database dengan cara npx prisma migrate dev.
4. Jalankan server backend: npm start.
5. Aplikasi frontend akan diakses melalui browser di http://localhost:4200.

## Penggunaan

1. Jika belum memiliki akun maka daftar melalui registrasi.
2. jika sudah akan langsung masuk ke halaman beranda
3. Anda akan mendapatkan fitur rekomendasi film, wacthlist, whistlist, dan detail aktor.

## Pengembang

- KONFLIX Team

## FAQ (Pertanyaan yang Sering Diajukan)

### Apakah Konfilx menyediakan fitur streaming film?

Tidak, Filmpire hanya menyediakan informasi tentang film dan fitur terkait lainnya. Anda perlu menggunakan layanan streaming film lainnya untuk menonton film.

### Bagaimana cara melaporkan bug?

Anda dapat melaporkan bug dengan membuat isu baru di repositori proyek ini di GitHub.

## Rujukan/API

Filmpire menggunakan beberapa API pihak ketiga untuk mendapatkan data tentang film dan ulasan pengguna.

- [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)
- [IMDb API](https://www.imdb.com/interfaces/)

## Cara Berkontribusi

Untuk berkontribusi pada dokumentasi ini, cukup buat pull request dengan perubahan yang diusulkan.

## Catatan

Dokumentasi ini terus diperbarui sesuai dengan perkembangan proyek KONFLIX.
