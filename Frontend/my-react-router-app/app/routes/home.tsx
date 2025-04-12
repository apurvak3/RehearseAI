// routes/home.tsx

import { useState } from "react";
import ScriptInput from "../components/ScriptInput";
import VoiceRecorder from "../components/VoiceRecorder";
import VoicePlayback from "../components/VoicePlayback";


export default function Home() {
  const [script, setScript] = useState("");
  const [transcription, setTranscription] = useState("");

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold text-center">RehearseAI 🎭</h1>
      <ScriptInput setScript={setScript} />
      <VoicePlayback script={script} />
      <VoiceRecorder setTranscription={setTranscription} />
      <p className="mt-4 text-gray-700">Transcription: {transcription}</p>
    </div>
  );
}


