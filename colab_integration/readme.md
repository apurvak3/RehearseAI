# RehearseAI — Colab Integration Guide

This folder contains Jupyter notebooks for AI processing in RehearseAI.

## Files:

- `whisper_transcription.ipynb`: 
  Transcribes an audio file into raw text using OpenAI Whisper API.

- `llama_polish_transcript.ipynb`: 
  Enhances the raw transcription using Huggingface Llama 3 model.

- `send_to_backend.ipynb`: 
  Sends the polished final transcript to the backend server to be stored in MongoDB.

## Setup:

1. Upload audio to Google Drive.
2. Run `whisper_transcription.ipynb` to generate raw text.
3. Run `llama_polish_transcript.ipynb` to polish the text.
4. Run `send_to_backend.ipynb` to save data into MongoDB.

---
**Note:** Make sure your backend is running locally at `http://localhost:5000`.
