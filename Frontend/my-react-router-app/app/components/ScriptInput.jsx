import { useState } from "react";
import axios from "axios";

export default function ScriptInput({ setScript }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setScript(text); // Store script for practice
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded-md"
        rows="5"
        placeholder="Paste your script here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Start Rehearsing
      </button>
    </div>
  );
}
