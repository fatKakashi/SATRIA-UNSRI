const mongoose = require('mongoose');

const sertifikatPrestasiSchema = new mongoose.Schema({
    prestasiLomba: {
        type: String,
        enum: ["akademik", "non-akademik"],
    },
    namaKegiatan: String,
    tahun: String,
    penyelenggara: String,
    nim: String,
    studentName: String,
    namaPrestasi: String,
    fotoSertifikat: String,
    dokumenPendukung: String,
    tingkat: {
        type: String,
        enum: ["universitas", "nasional", "internasional"], // Ensure 'Nasional' is included here
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "approved"],
        default: "pending"
    },
    type: {
        type: String,
        default: "prestasi_lomba"
    },
    imageUrl:  String,
});

const sertifikatPrestasiModel = mongoose.model("SertifikatPrestasi", sertifikatPrestasiSchema);
module.exports = sertifikatPrestasiModel;