import { useState } from "react";
import axios from "axios";

export default function VoicePlayback({ script }) {
  const [audioUrl, setAudioUrl] = useState("");

  const handleGenerateVoice = async () => {
    const { data } = await axios.post("http://localhost:5000/generate-voice", { text: script });
    setAudioUrl(data.audio_url);
  };

  return (
    <div>
      <button onClick={handleGenerateVoice} className="bg-purple-500 text-white px-4 py-2 rounded-md">
        Generate AI Voice
      </button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
}
