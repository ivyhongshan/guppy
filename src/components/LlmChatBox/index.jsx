import React, { useState } from "react";

export default function LlmChatBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const buildContextPrompt = () => {
  let context = "";

  for (const [key, values] of Object.entries(selectedFilters)) {
    if (values?.length > 0) {
      context += `Selected ${key}: ${values.join(", ")}. `;
    }
  }

  return `${context}User question: ${prompt}`;
};

  const handleSend = async () => {
    const fullPrompt = buildContextPrompt();

    const res = await fetch(`http://localhost:3000/anagine/llm/chat?prompt=${encodeURIComponent(fullPrompt)}`);
    const json = await res.json();
    setResponse(json.message?.content || "[No response]");
  };


  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
      <h3>Ask the LLM</h3>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        cols={60}
        placeholder="Type your prompt..."
      />
      <br />
      <button onClick={handleSend}>Send</button>
      <pre style={{ backgroundColor: "#f4f4f4", padding: "1rem" }}>{response}</pre>
    </div>
  );
}

