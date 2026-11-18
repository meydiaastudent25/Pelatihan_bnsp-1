const express = require('express');
const router = express.Router();
const siswaController = require('../controllers/siswaController');

// Definisi route CRUD untuk data siswa
router.get('/', siswaController.getAllSiswa);
router.get('/:id', siswaController.getSiswaById);
router.post('/', siswaController.createSiswa);
router.put('/:id', siswaController.updateSiswa);
router.delete('/:id', siswaController.deleteSiswa);

module.exports = router;
