const mongoose = require("mongoose");

const sertifikatMBKMSchema = new mongoose.Schema({
    namaPerusahaan: String,
    posisi: String,
    tahunKegiatan: String,
    nim: String,
    studentName: String,
    fotoSertifikat: String,
    dokumenPendukung: String,
    status: {
        type: String,
        enum: ["pending", "rejected", "approved"],
        default: "pending"
    },
    type: {
        type: String,
        default: "magang_studi_independen"
    },
    imageUrl:  String,
    metadataUrl: String
});

const sertifikatMBKMModel = mongoose.model("SertifikatMBKM", sertifikatMBKMSchema);
module.exports = sertifikatMBKMModel;