import * as dotenv from "dotenv";
import express from "express";
import { main } from "./main";
dotenv.config();

const app = express();
app.use(express.json());

// POST /run - trigger the agent with optional variables
app.post("/run", async (req, res) => {
  const {
    firstName = "John",
    lastName = "Doe",
    dateOfBirth = "1990-01-01",
    medicalId = "91927885",
  } = req.body || {};

  console.log(`  Running agent for ${firstName} ${lastName}`);
  try {
    await main({ firstName, lastName, dateOfBirth, medicalId });
    res.json({ success: true, message: "Form submitted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server + schedule every 5 minutes
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`POST /run to trigger the agent`);
});

setInterval(() => {
  console.log(" Scheduled run starting...");
  main({ firstName: "John", lastName: "Doe", dateOfBirth: "1990-01-01", medicalId: "91927885" });
}, 5 * 60 * 1000);