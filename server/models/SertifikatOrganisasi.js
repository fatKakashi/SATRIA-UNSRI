const mongoose = require("mongoose");

const sertifikatOrganisasiSchema = new mongoose.Schema({
    namaOrganisasi: String,
    jabatan: String,
    tingkat: {
        type: String,
        enum: ["universitas", "nasional", "internasional"],
    },
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
        default: "organisasi"
    },
    imageUrl:  String,
    metadataUrl: String,
    minted: { type: Boolean, default: false },
});

const SertifikatOrganisasiModel = mongoose.model("SertifikatOrganisasi", sertifikatOrganisasiSchema);
module.exports = SertifikatOrganisasiModel;


