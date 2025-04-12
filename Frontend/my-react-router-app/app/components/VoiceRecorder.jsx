import { useState } from "react";
import axios from "axios";

export default function VoiceRecorder({ setTranscription }) {
  const [recording, setRecording] = useState(false);

  const handleStartRecording = () => {
    setRecording(true);
    // Use MediaRecorder API to capture audio
  };

  const handleStopRecording = async () => {
    setRecording(false);
    const formData = new FormData();
    formData.append("audio", /* Your Recorded Audio */);
    
    const { data } = await axios.post("http://localhost:5000/transcribe", formData);
    setTranscription(data.transcription);
  };

  return (
    <div>
      <button onClick={recording ? handleStopRecording : handleStartRecording}
        className="bg-green-500 text-white px-4 py-2 rounded-md">
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
