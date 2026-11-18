const db = require('../db');

// GET /api/siswa - Mendapatkan semua data siswa (dengan opsional pencarian)
exports.getAllSiswa = (req, res) => {
  try {
    const { search, jurusan } = req.query;
    let query = 'SELECT * FROM siswa';
    const params = [];
    const conditions = [];

    if (search && search.trim() !== '') {
      const keyword = `%${search.trim()}%`;
      conditions.push('(kode_siswa LIKE ? OR nama_siswa LIKE ? OR alamat_siswa LIKE ?)');
      params.push(keyword, keyword, keyword);
    }

    if (jurusan && jurusan.trim() !== '') {
      conditions.push('jurusan_siswa = ?');
      params.push(jurusan.trim());
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY id DESC';

    const stmt = db.prepare(query);
    const data = params.length > 0 ? stmt.all(...params) : stmt.all();

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data siswa',
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Error getAllSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data siswa: ' + error.message
    });
  }
};

// GET /api/siswa/:id - Mendapatkan detail satu siswa berdasarkan ID
exports.getSiswaById = (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM siswa WHERE id = ?');
    const siswa = stmt.get(Number(id));

    if (!siswa) {
      return res.status(404).json({
        success: false,
        message: `Data siswa dengan ID ${id} tidak ditemukan`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Detail data siswa ditemukan',
      data: siswa
    });
  } catch (error) {
    console.error('Error getSiswaById:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail siswa: ' + error.message
    });
  }
};

// POST /api/siswa - Menambahkan data siswa baru
exports.createSiswa = (req, res) => {
  try {
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

    // Validasi input wajib diisi
    if (!kode_siswa || !nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
      return res.status(400).json({
        success: false,
        message: 'Semua field (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) wajib diisi!'
      });
    }

    // Cek apakah kode_siswa sudah digunakan
    const checkStmt = db.prepare('SELECT id FROM siswa WHERE kode_siswa = ?');
    const existing = checkStmt.get(kode_siswa.trim());
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Kode siswa '${kode_siswa.trim()}' sudah terdaftar. Gunakan kode siswa lain.`
      });
    }

    const insertStmt = db.prepare(`
      INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      kode_siswa.trim(),
      nama_siswa.trim(),
      alamat_siswa.trim(),
      tgl_siswa.trim(),
      jurusan_siswa.trim()
    );

    // Ambil data yang baru dibuat
    const getNewStmt = db.prepare('SELECT * FROM siswa WHERE id = ?');
    const newSiswa = getNewStmt.get(result.lastInsertRowid);

    return res.status(201).json({
      success: true,
      message: 'Data siswa berhasil ditambahkan',
      data: newSiswa
    });
  } catch (error) {
    console.error('Error createSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan data siswa: ' + error.message
    });
  }
};

// PUT /api/siswa/:id - Memperbarui data siswa
exports.updateSiswa = (req, res) => {
  try {
    const { id } = req.params;
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

    // Cek apakah siswa yang akan diupdate ada
    const checkIdStmt = db.prepare('SELECT * FROM siswa WHERE id = ?');
    const current = checkIdStmt.get(Number(id));
    if (!current) {
      return res.status(404).json({
        success: false,
        message: `Data siswa dengan ID ${id} tidak ditemukan`
      });
    }

    // Validasi field wajib
    if (!kode_siswa || !nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
      return res.status(400).json({
        success: false,
        message: 'Semua field (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) wajib diisi!'
      });
    }

    // Cek apakah kode_siswa baru dipakai siswa lain
    const checkKodeStmt = db.prepare('SELECT id FROM siswa WHERE kode_siswa = ? AND id != ?');
    const duplicate = checkKodeStmt.get(kode_siswa.trim(), Number(id));
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Kode siswa '${kode_siswa.trim()}' sudah digunakan oleh siswa lain.`
      });
    }

    const updateStmt = db.prepare(`
      UPDATE siswa
      SET kode_siswa = ?,
          nama_siswa = ?,
          alamat_siswa = ?,
          tgl_siswa = ?,
          jurusan_siswa = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(
      kode_siswa.trim(),
      nama_siswa.trim(),
      alamat_siswa.trim(),
      tgl_siswa.trim(),
      jurusan_siswa.trim(),
      Number(id)
    );

    const getUpdatedStmt = db.prepare('SELECT * FROM siswa WHERE id = ?');
    const updatedSiswa = getUpdatedStmt.get(Number(id));

    return res.status(200).json({
      success: true,
      message: 'Data siswa berhasil diperbarui',
      data: updatedSiswa
    });
  } catch (error) {
    console.error('Error updateSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data siswa: ' + error.message
    });
  }
};

// DELETE /api/siswa/:id - Menghapus data siswa
exports.deleteSiswa = (req, res) => {
  try {
    const { id } = req.params;

    const checkIdStmt = db.prepare('SELECT * FROM siswa WHERE id = ?');
    const current = checkIdStmt.get(Number(id));
    if (!current) {
      return res.status(404).json({
        success: false,
        message: `Data siswa dengan ID ${id} tidak ditemukan`
      });
    }

    const deleteStmt = db.prepare('DELETE FROM siswa WHERE id = ?');
    deleteStmt.run(Number(id));

    return res.status(200).json({
      success: true,
      message: `Data siswa '${current.nama_siswa}' (Kode: ${current.kode_siswa}) berhasil dihapus`,
      deletedId: Number(id)
    });
  } catch (error) {
    console.error('Error deleteSiswa:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus data siswa: ' + error.message
    });
  }
};
