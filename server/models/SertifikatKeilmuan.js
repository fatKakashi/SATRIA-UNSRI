const mongoose = require('mongoose');

const sertifikatKeilmuanSchema = new mongoose.Schema({
    namaKegiatan: String,
    tahunKegiatan: String,
    penyelenggara: String,
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
        default: "seminar_keilmuan"
    },
    imageUrl:  String,
    metadataUrl: String,    
});

const sertifikatKeilmuanModel = mongoose.model("SertifikatKeilmuan", sertifikatKeilmuanSchema);
module.exports = sertifikatKeilmuanModel;