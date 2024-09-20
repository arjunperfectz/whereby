// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MyComponent from './components/MyComponent';

const apiKey = process.env.REACT_APP_WHEREBY_API_KEY;

function App() {
  const [roomUrl, setRoomUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const body = {
        endDate: "2024-09-21T20:31:09.102Z",
        fields: ["roomUrl"],
        roomMode: "normal", // One-to-one call
        participantLimit: 2, // Limit to 2 participants
      };
      const response = await axios.post(
        'https://api.whereby.dev/v1/meetings',
        body,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { roomUrl } = response.data;
      setRoomUrl(roomUrl);
      window.location.href = roomUrl;
      console.log('Room URL:', roomUrl);
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Hitch Hatch! Connect with your partner</h1>
      </header>

      <main>
        <section className="create-room-section">
          <button onClick={createRoom} disabled={loading}>
            {loading ? 'Creating Room...' : 'Start'}
          </button>
          {error && <p className="error">{error}</p>}
        </section>

        {roomUrl && (
          <section className="room-section">
            <MyComponent
              roomUrl={roomUrl}
              onApiReady={(api) => {
                console.log('Whereby API Ready', api);
              }}
              onRoomLeft={() => {
                console.log('Left the room');
                setRoomUrl('');
              }}
            />
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
