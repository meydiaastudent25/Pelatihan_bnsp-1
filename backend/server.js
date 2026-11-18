const express = require('express');
const cors = require('cors');
require('dotenv').config();

const siswaRoutes = require('./routes/siswaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger sederhana
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root endpoint untuk health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Backend Data Siswa (Express.js) berjalan normal.',
    endpoints: {
      getAllSiswa: 'GET /api/siswa',
      getSiswaById: 'GET /api/siswa/:id',
      createSiswa: 'POST /api/siswa',
      updateSiswa: 'PUT /api/siswa/:id',
      deleteSiswa: 'DELETE /api/siswa/:id'
    }
  });
});

// Routing API siswa
app.use('/api/siswa', siswaRoutes);

// Handling 404 Route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server: ' + err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Server Backend Siswa berjalan di:`);
  console.log(`-> Local: http://localhost:${PORT}`);
  console.log(`-> API Endpoint: http://localhost:${PORT}/api/siswa`);
  console.log(`===============================================`);
});

module.exports = app;
