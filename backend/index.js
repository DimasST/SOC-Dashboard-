// backend/index.js
import express from "express";
import cors from "cors";

import getAllSensorsRouter from "./api/sensors/getAllSensors.js";
import getDesktopSensorsRouter from "./api/sensors/getDesktopDevice.js";
import getSlaLogsRouter from "./api/sla-logs/route.js"; // <== tambahkan ini

import { syncSensors } from "./jobs/prtgSync.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/sensors/desktop", getDesktopSensorsRouter);
app.use("/api/sensors", getAllSensorsRouter);
app.use("/api/sla-logs", getSlaLogsRouter); // <== tambahkan ini

// Sync PRTG saat server mulai dan setiap 10 menit
const TEN_MINUTES = 10 * 60 * 1000;
syncSensors();
setInterval(() => {
  console.log("⏳ Menjalankan sync data dari PRTG...");
  syncSensors();
}, TEN_MINUTES);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
