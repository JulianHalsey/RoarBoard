import React, { useState } from 'react';
import axios from 'axios';

function Clubs() {
  const [userMessage, setUserMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSendMessage = async () => {
    if (!userMessage) return;

    // Add user message to responses
    setResponses((prev) => [...prev, { text: userMessage, sender: 'user' }]);

    // Call DeepAI API using Axios
    try {
      const response = await axios.post('https://api.deepai.org/api/text-generator', {
        text: userMessage,  // The user's message goes as the 'text' parameter
      }, {
        headers: {
          'Api-Key': 'a5470e98-114e-4329-9e9d-f5b1718fd8c1',  // This thr DeepAI API key
        },
      });

      const aiResponse = response.data.output;
      setResponses((prev) => [...prev, { text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error('Error contacting AI:', error);
      setResponses((prev) => [...prev, { text: 'Error contacting AI. Please try again later.', sender: 'ai' }]);
    }

    setUserMessage(''); // Clear input
  };

  return (
    <>
      <h3>Toggle which clubs you would like to subscribe to:</h3>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="SWEClub" />
        <label className="form-check-label" htmlFor="SWEClub">Software Engineering Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="BBCLub" />
        <label className="form-check-label" htmlFor="BBCLub">Basketball Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="HealthClub" />
        <label className="form-check-label" htmlFor="HealthClub">Health Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="SoccerClub" />
        <label className="form-check-label" htmlFor="SoccerClub">Soccer Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="WritingClub" />
        <label className="form-check-label" htmlFor="WritingClub">Writing Club</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="FBClub" />
        <label className="form-check-label" htmlFor="FBClub">Football Club</label>
      </div>

      <h3>Chat with the Club AI</h3>
      <div className="chat-container" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {responses.map((resp, index) => (
          <div key={index} className={resp.sender === 'user' ? 'user-message' : 'ai-message'}>
            <strong>{resp.sender === 'user' ? 'You:' : 'AI:'}</strong> {resp.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
}

export default Clubs;
