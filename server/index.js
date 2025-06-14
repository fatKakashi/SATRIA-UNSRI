const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const puppeteer = require("puppeteer");
const { uploadFileToIPFS, uploadJSONToIPFS } = require("./ipfsHelper"); // Import our helper

const AccountsModel = require("./models/Accounts");
const StudentsModel = require("./models/Students");
const SertifikatPrestasiModel = require("./models/SertifikatPrestasi");
const SertifikatOrganisasiModel = require("./models/SertifikatOrganisasi");
const sertifikatKeilmuanModel = require("./models/SertifikatKeilmuan");
const sertifikatMBKMModel = require("./models/SertifikatMBKM");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

mongoose
  .connect("mongodb://localhost:27017/SATRIA_UNSRI")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

// Define the login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AccountsModel.findOne({ username, password });
    if (user) {
      res.status(200).json({
        message: "Login success",
        username: user.username,
        nim: user.nim,
      });
    } else {
      res.status(401).json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Define the route to fetch student data
app.get("/checkdatamahasiswa/:nim", async (req, res) => {
  const { nim } = req.params;
  try {
    const student = await StudentsModel.findOne({ nim });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.post(
  "/api/sertifikat/prestasi-lomba",
  upload.fields([
    { name: "fotoSertifikat", maxCount: 1 },
    { name: "dokumenPendukung", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { nim, ...certificateData } = req.body;
      const student = await StudentsModel.findOne({ nim });
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }
      const newSertifikat = new SertifikatPrestasiModel({
        ...certificateData,
        nim,
        studentName: student.name,
        fotoSertifikat: req.files.fotoSertifikat
          ? req.files.fotoSertifikat[0].path
          : null,
        dokumenPendukung: req.files.dokumenPendukung
          ? req.files.dokumenPendukung[0].path
          : null,
      });

      await newSertifikat.save();
      res.status(201).json(newSertifikat);
    } catch (error) {
      console.error("Error saving certificate:", error);
      res.status(500).send({ message: "An error occurred", error });
    }
  }
);

app.post(
  "/api/sertifikat/organisasi",
  upload.fields([
    { name: "fotoSertifikat", maxCount: 1 },
    { name: "dokumenPendukung", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { nim, ...certificateData } = req.body;
      const student = await StudentsModel.findOne({ nim });
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }
      const newSertifikat = new SertifikatOrganisasiModel({
        ...certificateData,
        nim,
        studentName: student.name,
        fotoSertifikat: req.files.fotoSertifikat
          ? req.files.fotoSertifikat[0].path
          : null,
        dokumenPendukung: req.files.dokumenPendukung
          ? req.files.dokumenPendukung[0].path
          : null,
      });
      await newSertifikat.save();
      res.status(201).json(newSertifikat);
    } catch (error) {
      console.error("Error saving certificate:", error);
      res.status(500).send({ message: "An error occurred", error });
    }
  }
);

app.post(
  "/api/sertifikat/magang-studi-independen",
  upload.fields([
    { name: "fotoSertifikat", maxCount: 1 },
    { name: "dokumenPendukung", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { nim, ...certificateData } = req.body;
      const student = await StudentsModel.findOne({ nim });
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }
      const newSertifikat = new sertifikatMBKMModel({
        ...certificateData,
        nim,
        studentName: student.name,
        fotoSertifikat: req.files.fotoSertifikat
          ? req.files.fotoSertifikat[0].path
          : null,
        dokumenPendukung: req.files.dokumenPendukung
          ? req.files.dokumenPendukung[0].path
          : null,
      });
      await newSertifikat.save();
      res.status(201).json(newSertifikat);
    } catch (error) {
      console.error("Error saving certificate:", error);
      res.status(500).send({ message: "An error occurred", error });
    }
  }
);

app.post(
  "/api/sertifikat/seminar-keilmuan",
  upload.fields([
    { name: "fotoSertifikat", maxCount: 1 },
    { name: "dokumenPendukung", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { nim, ...certificateData } = req.body;
      const student = await StudentsModel.findOne({ nim });
      if (!student) {
        return res.status(404).send({ message: "Student not found" });
      }
      const newSertifikat = new sertifikatKeilmuanModel({
        ...certificateData,
        nim,
        studentName: student.name,
        fotoSertifikat: req.files.fotoSertifikat
          ? req.files.fotoSertifikat[0].path
          : null,
        dokumenPendukung: req.files.dokumenPendukung
          ? req.files.dokumenPendukung[0].path
          : null,
      });
      await newSertifikat.save();
      res.status(201).json(newSertifikat);
    } catch (error) {
      console.error("Error saving certificate:", error);
      res.status(500).send({ message: "An error occurred", error });
    }
  }
);

// Endpoint to fetch all submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const prestasi = await SertifikatPrestasiModel.find();
    const organisasi = await SertifikatOrganisasiModel.find();
    const keilmuan = await sertifikatKeilmuanModel.find();
    const mbkm = await sertifikatMBKMModel.find();

    const submissions = [...prestasi, ...organisasi, ...keilmuan, ...mbkm].map(
      (submission) => {
        return {
          ...submission._doc,
          fotoSertifikat: submission.fotoSertifikat.replace(/\\/g, "/"),
          dokumenPendukung: submission.dokumenPendukung.replace(/\\/g, "/"),
        };
      }
    );

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.get("/api/submissions/approved", async (req, res) => {
  try {
    const prestasi = await SertifikatPrestasiModel.find({
      status: "approved",
      minted: { $ne: true },
    });
    const organisasi = await SertifikatOrganisasiModel.find({
      status: "approved",
      minted: { $ne: true },
    });
    const keilmuan = await sertifikatKeilmuanModel.find({
      status: "approved",
      minted: { $ne: true },
    });
    const mbkm = await sertifikatMBKMModel.find({
      status: "approved",
      minted: { $ne: true },
    });

    const submissions = [...prestasi, ...organisasi, ...keilmuan, ...mbkm].map(
      (submission) => {
        return {
          ...submission._doc,
          fotoSertifikat: submission.fotoSertifikat
            ? submission.fotoSertifikat.replace(/\\/g, "/")
            : null,
          dokumenPendukung: submission.dokumenPendukung
            ? submission.dokumenPendukung.replace(/\\/g, "/")
            : null,
        };
      }
    );

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching approved submissions:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.put("/api/submissions/:id/minted", async (req, res) => {
  const { id } = req.params;

  try {
    const submission =
      (await SertifikatPrestasiModel.findById(id)) ||
      (await SertifikatOrganisasiModel.findById(id)) ||
      (await sertifikatKeilmuanModel.findById(id)) ||
      (await sertifikatMBKMModel.findById(id));

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submission.minted = true;
    await submission.save();

    res.status(200).json(submission);
  } catch (error) {
    console.error("Error updating minted status:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Backend: New endpoint to get ALL minted certificates
app.get("/api/submissions/minted", async (req, res) => {
  try {
    const prestasi = await SertifikatPrestasiModel.find({ minted: true });
    const organisasi = await SertifikatOrganisasiModel.find({ minted: true });
    const keilmuan = await sertifikatKeilmuanModel.find({ minted: true });
    const mbkm = await sertifikatMBKMModel.find({ minted: true });

    const submissions = [...prestasi, ...organisasi, ...keilmuan, ...mbkm].map(
      (submission) => ({
        ...submission._doc,
        fotoSertifikat: submission.fotoSertifikat?.replace(/\\/g, "/"),
        dokumenPendukung: submission.dokumenPendukung?.replace(/\\/g, "/"),
      })
    );

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching all minted submissions:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.get("/api/submissions/minted/:nim", async (req, res) => {
  const { nim } = req.params;

  try {
    const prestasi = await SertifikatPrestasiModel.find({
      nim,
      minted: true,
    });
    const organisasi = await SertifikatOrganisasiModel.find({
      nim,
      minted: true,
    });
    const keilmuan = await sertifikatKeilmuanModel.find({
      nim,
      minted: true,
    });
    const mbkm = await sertifikatMBKMModel.find({
      nim,
      minted: true,
    });

    const submissions = [...prestasi, ...organisasi, ...keilmuan, ...mbkm].map(
      (submission) => {
        return {
          ...submission._doc,
          fotoSertifikat: submission.fotoSertifikat
            ? submission.fotoSertifikat.replace(/\\/g, "/")
            : null,
          dokumenPendukung: submission.dokumenPendukung
            ? submission.dokumenPendukung.replace(/\\/g, "/")
            : null,
        };
      }
    );

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching minted submissions:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Updated approval endpoint integrating IPFS upload
app.put("/api/submissions/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // find the submission across all collections
    const submission =
      (await SertifikatPrestasiModel.findById(id)) ||
      (await SertifikatOrganisasiModel.findById(id)) ||
      (await sertifikatKeilmuanModel.findById(id)) ||
      (await sertifikatMBKMModel.findById(id));

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // update status
    submission.status = status;
    await submission.save();

    // when approved, generate, upload, and attach metadata
    if (status === "approved") {
      // determine which front-end URL to screenshot
      let certificateUrl;
      switch (submission.type) {
        case "prestasi_lomba":
          certificateUrl = `http://localhost:5173/sertifikat-prestasi/${id}`;
          break;
        case "organisasi":
          certificateUrl = `http://localhost:5173/sertifikat-organisasi/${id}`;
          break;
        case "seminar_keilmuan":
          certificateUrl = `http://localhost:5173/sertifikat-seminar/${id}`;
          break;
        case "magang_studi_independen":
          certificateUrl = `http://localhost:5173/sertifikat-magang/${id}`;
          break;
        default:
          throw new Error("Unknown certificate type");
      }

      console.log(`Generating certificate from: ${certificateUrl}`);
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-web-security",
        ],
        defaultViewport: { width: 1200, height: 800 },
      });
      const page = await browser.newPage();
      await page.goto(certificateUrl, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      await page.waitForFunction(() => document.readyState === "complete", {
        timeout: 30000,
      });
      await new Promise((r) => setTimeout(r, 1000));

      const certificateElement = await page.$("#certificate-container");
      if (!certificateElement)
        throw new Error("Certificate container not found");
      const box = await certificateElement.boundingBox();
      const imageBuffer = await page.screenshot({
        type: "png",
        clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      });
      await browser.close();

      // save & upload image
      const imageName = `certificate-${id}-${uuidv4()}.png`;
      const imagePath = path.join(uploadDir, imageName);
      fs.writeFileSync(imagePath, imageBuffer);
      const imageResult = await uploadFileToIPFS(imagePath);

      // build metadata dynamically
      const { type, studentName } = submission;
      const image = imageResult.gatewayUrl;
      let metadata;

      switch (type) {
        case "prestasi_lomba": {
          const {
            namaKegiatan,
            prestasiLomba,
            namaPrestasi,
            penyelenggara,
            tahunKegiatan,
            tingkat,
          } = submission;
          metadata = {
            name: `${studentName} – ${namaPrestasi}`,
            description: `Achieved ${namaPrestasi} at ${namaKegiatan} (${prestasiLomba}), organized by ${penyelenggara}`,
            image,
            external_url: image,
            attributes: [
              { trait_type: "Type", value: "prestasi_lomba" },
              { trait_type: "Student Name", value: studentName },
              { trait_type: "Category", value: prestasiLomba },
              { trait_type: "Event Name", value: namaKegiatan },
              { trait_type: "Achievement", value: namaPrestasi },
              { trait_type: "Organizer", value: penyelenggara },
              { trait_type: "Level", value: tingkat },
              { trait_type: "Year", value: tahunKegiatan || "N/A" },
            ],
          };
          break;
        }
        case "organisasi": {
          const { namaOrganisasi, jabatan, tingkat, tahunKegiatan } =
            submission;
          metadata = {
            name: `${studentName} – ${jabatan} of ${namaOrganisasi}`,
            description: `Served as ${jabatan} in ${namaOrganisasi}`,
            image,
            external_url: image,
            attributes: [
              { trait_type: "Type", value: "organisasi" },
              { trait_type: "Student Name", value: studentName },
              { trait_type: "Organization", value: namaOrganisasi },
              { trait_type: "Position", value: jabatan },
              { trait_type: "Level", value: tingkat },
              { trait_type: "Year", value: tahunKegiatan || "N/A" },
            ],
          };
          break;
        }
        case "seminar_keilmuan": {
          const { namaKegiatan, penyelenggara, tahunKegiatan } = submission;
          metadata = {
            name: `${studentName} – Seminar: ${namaKegiatan}`,
            description: `Participated in "${namaKegiatan}" by ${penyelenggara}`,
            image,
            external_url: image,
            attributes: [
              { trait_type: "Type", value: "seminar_keilmuan" },
              { trait_type: "Student Name", value: studentName },
              { trait_type: "Seminar Name", value: namaKegiatan },
              { trait_type: "Organizer", value: penyelenggara },
              { trait_type: "Year", value: tahunKegiatan || "N/A" },
            ],
          };
          break;
        }
        case "magang_studi_independen": {
          const { namaPerusahaan, posisi, tahunKegiatan } = submission;
          metadata = {
            name: `${studentName} – Internship at ${namaPerusahaan}`,
            description: `Interned as ${posisi} at ${namaPerusahaan}`,
            image,
            external_url: image,
            attributes: [
              { trait_type: "Type", value: "magang_studi_independen" },
              { trait_type: "Student Name", value: studentName },
              { trait_type: "Company", value: namaPerusahaan },
              { trait_type: "Position", value: posisi },
              { trait_type: "Year", value: tahunKegiatan || "N/A" },
            ],
          };
          break;
        }
        default:
          metadata = {
            name: `${studentName}'s Certificate`,
            description: `Certificate for ${type}`,
            image,
            external_url: image,
            attributes: [
              { trait_type: "Student Name", value: studentName },
              { trait_type: "Type", value: type },
              { trait_type: "Year", value: submission.tahunKegiatan || "N/A" },
            ],
          };
      }

      // upload metadata and save URLs
      const metadataResult = await uploadJSONToIPFS(metadata);
      submission.imageUrl = image;
      submission.metadataUrl = metadataResult.ipfsUri;
      submission.imageGatewayUrl = image;
      submission.metadataGatewayUrl = metadataResult.gatewayUrl;
      await submission.save();

      console.log(`Metadata uploaded to IPFS: ${metadataResult.ipfsUri}`);
      console.log(`Gateway URL: ${metadataResult.gatewayUrl}`);
    }

    res.status(200).json(submission);
  } catch (error) {
    console.error("Error updating submission status:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
