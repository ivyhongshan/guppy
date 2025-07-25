import React, { useState } from 'react';

const LLmChatBox_filter = ({ filteredData = [], sendMessage }) => {
  console.log(' Received filteredData in chatbox:', filteredData);
  const [userInput, setUserInput] = useState('');
  const [llmReply, setLlmReply] = useState('');

  const getPrompt = () => {
    if (filteredData.length > 0) {
      const summary = filteredData.slice(0, 5).map((item, idx) =>
        `(${idx + 1}) Subject: ${item.subject_id}, Project: ${item.project}, Race: ${item.race}, Vital Status: ${item.vital_status}`
      ).join('\n');

      return `${userInput}\n\nLLM sees the following filtered data:\n${summary}`;
    } else {
      return `${userInput}\n\n(There is no data selected.)`;
    }
  };

  const handleSend = async () => {
  const prompt = getPrompt();
  console.log('?? Final prompt sent to LLM:', prompt);  // ADD THIS
  const reply = await sendMessage(prompt);
  setLlmReply(reply);
};

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Ask the LLM</h2>
      <textarea
        rows={4}
        cols={80}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <br />
      <button onClick={handleSend}>Send</button>
      <div style={{ marginTop: '1rem', backgroundColor: '#f7f7f7', padding: '1rem' }}>
        <strong>LLM Reply:</strong>
        <pre>{llmReply}</pre>
      </div>
    </div>
  );
};


export default LLmChatBox_filter;

