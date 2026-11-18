const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

// Simpan file database di folder backend
const dbPath = path.resolve(__dirname, 'database_siswa.sqlite');
const db = new DatabaseSync(dbPath);

// Inisialisasi tabel siswa
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS siswa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kode_siswa TEXT UNIQUE NOT NULL,
      nama_siswa TEXT NOT NULL,
      alamat_siswa TEXT NOT NULL,
      tgl_siswa TEXT NOT NULL,
      jurusan_siswa TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Periksa apakah tabel kosong, jika iya tambahkan data awal (seed data)
  const countStmt = db.prepare('SELECT COUNT(*) as total FROM siswa');
  const result = countStmt.get();

  if (result.total === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
      VALUES (?, ?, ?, ?, ?)
    `);

    const initialData = [
      ['SIS-001', 'Ahmad Pratama', 'Jl. Sudirman No. 45, Jakarta', '2006-03-15', 'Rekayasa Perangkat Lunak'],
      ['SIS-002', 'Siti Nurhaliza', 'Jl. Merdeka No. 12, Bandung', '2006-07-22', 'Teknik Komputer dan Jaringan'],
      ['SIS-003', 'Budi Santoso', 'Jl. Pahlawan No. 88, Surabaya', '2005-11-10', 'Multimedia'],
      ['SIS-004', 'Dewi Lestari', 'Jl. Diponegoro No. 17, Semarang', '2006-05-30', 'Sistem Informasi Jaringan dan Aplikasi'],
      ['SIS-005', 'Rian Hidayat', 'Jl. Gajah Mada No. 23, Yogyakarta', '2006-09-05', 'Desain Komunikasi Visual']
    ];

    for (const item of initialData) {
      insertStmt.run(...item);
    }
    console.log('Database berhasil diinisialisasi dengan 5 data awal.');
  }
}

initDatabase();

module.exports = db;
