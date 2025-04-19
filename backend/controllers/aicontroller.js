const openai = require("openai");

openai.apiKey = process.env.OPENAI_API_KEY;

const summarizeText = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Summarize this transcription text." },
      { role: "user", content: text }
    ]
  });
  return response.choices[0].message.content;
};

module.exports = { summarizeText };
