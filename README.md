# Backend API CRUD Data Siswa (Express.js)

Backend RESTful API untuk mengelola data siswa (CRUD: Create, Read, Update, Delete) yang dibangun menggunakan **Express.js** dan database **SQLite** (menggunakan modul bawaan `node:sqlite` sehingga ringan, cepat, dan tanpa konfigurasi eksternal yang rumit).

## Struktur Data Siswa
Sesuai dengan spesifikasi:
1. `id` (INTEGER PRIMARY KEY)
2. `kode_siswa` (TEXT UNIQUE)
3. `nama_siswa` (TEXT)
4. `alamat_siswa` (TEXT)
5. `tgl_siswa` (TEXT / DATE)
6. `jurusan_siswa` (TEXT)
7. `created_at` (DATETIME)
8. `updated_at` (DATETIME)

## Struktur Folder
```text
backend/
├── controllers/
│   └── siswaController.js   # Logika bisnis CRUD siswa
├── routes/
│   └── siswaRoutes.js       # Definisi endpoint routing API
├── db.js                    # Koneksi & inisialisasi tabel database
├── database.sql             # Skrip SQL DDL & Dummy Data (kompatibel MySQL/SQLite)
├── database_siswa.sqlite    # File database SQLite
├── test.js                  # Skrip unit test pengujian CRUD
├── server.js                # Entry point server Express
├── package.json
├── .env.example
├── .env
└── README.md
```

## Cara Menjalankan Backend

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server:**
   ```bash
   npm start
   ```
   Server akan berjalan di `http://localhost:5000`.

3. **Mode Pengembangan (Watch/Auto Reload):**
   ```bash
   npm run dev
   ```

4. **Jalankan Unit Test CRUD:**
   ```bash
   npm test
   ```

## Dokumentasi Endpoint REST API

| Method | Endpoint | Deskripsi | Status Code |
|---|---|---|---|
| `GET` | `/` | Health check & info endpoint | `200 OK` |
| `GET` | `/api/siswa` | Mengambil semua data siswa (mendukung `?search=` dan `?jurusan=`) | `200 OK` |
| `GET` | `/api/siswa/:id` | Mengambil detail satu siswa berdasarkan ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/siswa` | Menambahkan data siswa baru | `201 Created` / `400 Bad Request` / `409 Conflict` |
| `PUT` | `/api/siswa/:id` | Mengubah/mengupdate data siswa | `200 OK` / `400 Bad Request` / `404 Not Found` / `409 Conflict` |
| `DELETE` | `/api/siswa/:id` | Menghapus data siswa berdasarkan ID | `200 OK` / `404 Not Found` |

### Contoh Request Body (POST / PUT):
```json
{
  "kode_siswa": "SIS-006",
  "nama_siswa": "Anisa Rahmawati",
  "alamat_siswa": "Jl. Melati No. 15, Bandung",
  "tgl_siswa": "2006-08-14",
  "jurusan_siswa": "Rekayasa Perangkat Lunak"
}
```
