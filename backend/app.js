const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// In-memory sessions store: sessionId -> array [{ question, answer }]
let sessions = {};

// Dummy data returned as answer
const dummyAnswer = {
  table: {
    headers: ["Project", "Deadline", "Status", "Progress"],
    rows: [
      ["App Redesign", "2025-12-01", "In Progress", "60%"],
      ["API Development", "2025-11-15", "Complete", "100%"],
      ["Marketing Campaign", "2026-01-10", "Not Started", "0%"],
    ],
    description: "Current projects status and progress overview."
  }
};


// Start new chat
app.post("/api/start", (req, res) => {
  const sessionId = uuidv4();
  sessions[sessionId] = [];
  res.json({ sessionId, title: `Session ${Object.keys(sessions).length}` });
});

// Ask question in a session
app.post("/api/question", (req, res) => {
  const { sessionId, question } = req.body;
  if (!sessions[sessionId]) {
    return res.status(400).json({ error: "Invalid session ID" });
  }
  sessions[sessionId].push({ question, answer: dummyAnswer });
  res.json({ answer: dummyAnswer });
});

// List sessions
app.get("/api/sessions", (req, res) => {
  const result = Object.entries(sessions).map(([id], idx) => ({
    sessionId: id,
    title: `Session ${idx + 1}`
  }));
  res.json(result);
});

// Fetch chat history of a session
app.get("/api/session/:id", (req, res) => {
  const sessionId = req.params.id;
  if (!sessions[sessionId]) {
    return res.status(404).json({ error: "Session not found" });
  }
  res.json(sessions[sessionId]);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
