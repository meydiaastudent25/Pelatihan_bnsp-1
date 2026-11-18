-- ============================================================
-- SQL Schema & Seed Data untuk Data Siswa
-- Cocok untuk MySQL / MariaDB / SQLite
-- ============================================================

CREATE TABLE IF NOT EXISTS siswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_siswa VARCHAR(50) NOT NULL UNIQUE,
  nama_siswa VARCHAR(100) NOT NULL,
  alamat_siswa TEXT NOT NULL,
  tgl_siswa DATE NOT NULL,
  jurusan_siswa VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Data Awal (Dummy Data)
INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) VALUES
('SIS-001', 'Ahmad Pratama', 'Jl. Sudirman No. 45, Jakarta', '2006-03-15', 'Rekayasa Perangkat Lunak'),
('SIS-002', 'Siti Nurhaliza', 'Jl. Merdeka No. 12, Bandung', '2006-07-22', 'Teknik Komputer dan Jaringan'),
('SIS-003', 'Budi Santoso', 'Jl. Pahlawan No. 88, Surabaya', '2005-11-10', 'Multimedia'),
('SIS-004', 'Dewi Lestari', 'Jl. Diponegoro No. 17, Semarang', '2006-05-30', 'Sistem Informasi Jaringan dan Aplikasi'),
('SIS-005', 'Rian Hidayat', 'Jl. Gajah Mada No. 23, Yogyakarta', '2006-09-05', 'Desain Komunikasi Visual');
