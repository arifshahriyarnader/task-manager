require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

const GROQ_API_URL = process.env.GROQ_API_URL;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post("/generate", async (req, res) => {
  const { userPrompt } = req.body;

  try {
    const groqResponse = await axios.post(
      GROQ_API_URL,
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that writes a short task title and description in the format:\nTitle: ...\nDescription: ...",
          },
          {
            role: "user",
            content: `Generate a short task title and description for: ${userPrompt}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    const response = groqResponse.data.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    console.error("Groq AI Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "AI generation failed",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
