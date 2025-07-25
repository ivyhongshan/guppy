import React, { useState } from 'react';

const LLmChatBox = ({ sendMessage }) => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      let responseText = '';
      if (sendMessage) {
        // Use mock for Storybook
        responseText = await sendMessage(message);
      } else {
        // Real backend API call
        const res = await fetch(`http://localhost:3000/anagine/llm/chat?prompt=${encodeURIComponent(message)}`);
        const data = await res.json();
        responseText = data?.response?.message?.content || '[No response]';
      }
      setReply(responseText);
    } catch (error) {
      console.error('LLM fetch error:', error);
      setReply('Error: Failed to fetch response.');
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '1rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Ask the LLM</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '8px' }}
        placeholder="Type your prompt here..."
      />
      <button onClick={handleSend} disabled={loading} style={{ marginTop: '8px' }}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      {reply && (
        <div style={{ marginTop: '1rem', background: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
          <strong>LLM Reply:</strong>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default LLmChatBox;

