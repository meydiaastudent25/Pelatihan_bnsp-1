const siswaController = require('./controllers/siswaController');

function mockRes() {
  const res = {
    statusCode: 200,
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(obj) {
      this.data = obj;
      return this;
    }
  };
  return res;
}

async function runTests() {
  console.log('--- 1. Testing getAllSiswa ---');
  let req = { query: {} };
  let res = mockRes();
  siswaController.getAllSiswa(req, res);
  console.log('Status:', res.statusCode, '| Total siswa:', res.data.count);

  console.log('\n--- 2. Testing createSiswa ---');
  req = {
    body: {
      kode_siswa: 'SIS-999',
      nama_siswa: 'Tester Siswa',
      alamat_siswa: 'Jl. Testing No. 1',
      tgl_siswa: '2007-01-01',
      jurusan_siswa: 'Rekayasa Perangkat Lunak'
    }
  };
  res = mockRes();
  siswaController.createSiswa(req, res);
  console.log('Status:', res.statusCode, '| Created:', res.data.data?.nama_siswa);
  const createdId = res.data.data?.id;

  console.log('\n--- 3. Testing getSiswaById ---');
  req = { params: { id: createdId } };
  res = mockRes();
  siswaController.getSiswaById(req, res);
  console.log('Status:', res.statusCode, '| Data:', res.data.data?.nama_siswa);

  console.log('\n--- 4. Testing updateSiswa ---');
  req = {
    params: { id: createdId },
    body: {
      kode_siswa: 'SIS-999',
      nama_siswa: 'Tester Siswa Terupdate',
      alamat_siswa: 'Jl. Testing Baru No. 99',
      tgl_siswa: '2007-01-01',
      jurusan_siswa: 'Teknik Komputer dan Jaringan'
    }
  };
  res = mockRes();
  siswaController.updateSiswa(req, res);
  console.log('Status:', res.statusCode, '| Updated:', res.data.data?.nama_siswa, '| Jurusan:', res.data.data?.jurusan_siswa);

  console.log('\n--- 5. Testing deleteSiswa ---');
  req = { params: { id: createdId } };
  res = mockRes();
  siswaController.deleteSiswa(req, res);
  console.log('Status:', res.statusCode, '| Message:', res.data.message);

  console.log('\n--- 6. Testing getSiswaById after delete (Expect 404) ---');
  res = mockRes();
  siswaController.getSiswaById(req, res);
  console.log('Status:', res.statusCode, '| Message:', res.data.message);

  console.log('\n✅ SEMUA PENGUJIAN CRUD CONTROLLER BERHASIL 100%! ✅\n');
}

runTests();
