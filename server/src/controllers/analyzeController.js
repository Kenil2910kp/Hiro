import axios from "axios";
import History from "../models/History.js";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:9000";

export const analyzeGithub = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "GitHub URL is required" });
    }

    console.log("📡 Calling Python AI service (GitHub)...");

    const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze/github`, { url });

    const result = aiResponse.data;
    console.log("✅ AI response received");

    const repoName = url.split("/").slice(-1)[0];

    await History.create({
      userId: req.userId,
      repoPath: repoName,
      mermaid: result.mermaid,
      description: result.description,
      projectName: result.project_name,
      projectType: result.project_type,
      languages: result.languages,
      fileCount: result.file_count,
      cached: result.cached,
      createdAt: new Date(),
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Analyze GitHub error:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.detail || "Analysis failed" });
    }
    res.status(500).json({ error: "Analysis failed" });
  }
};

export const analyzeCode = async (req, res) => {
  try {
    const { code, filename } = req.body;

    if (!code) return res.status(400).json({ error: "Code is required" });
    if (!filename) return res.status(400).json({ error: "Filename is required" });

    console.log("📡 Calling Python AI service (code snippet)...");

    const aiResponse = await axios.post(`${AI_SERVICE_URL}/analyze/code`, { code, filename });

    const result = aiResponse.data;
    console.log("✅ AI response received");

    await History.create({
      userId: req.userId,
      repoPath: filename,
      mermaid: result.mermaid,
      description: result.description,
      projectName: result.project_name,
      projectType: result.project_type,
      languages: result.languages,
      fileCount: result.file_count,
      cached: result.cached,
      createdAt: new Date(),
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Analyze code error:", error.message);
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.detail || "Analysis failed" });
    }
    res.status(500).json({ error: "Analysis failed" });
  }
};