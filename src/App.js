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
      };
      const response = await axios.post(
        'https://api.whereby.dev/v1/meetings',body,
        
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("response>>>>",response);
      

      const { roomUrl } = response.data;
      setRoomUrl(roomUrl);
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
      <h1>Whereby Video Call App</h1>
      <button onClick={createRoom} disabled={loading}>
        {loading ? 'Creating Room...' : 'Create Room'}
      </button>

      {error && <p className="error">{error}</p>}

      {roomUrl && (
        <div className="room-section">
          <p>
            Room URL: <a href={roomUrl} target="_blank" rel="noopener noreferrer">{roomUrl}</a>
          </p>
          <MyComponent roomUrl={roomUrl}
            apiKey={apiKey}
            onApiReady={(api) => {
              console.log('Whereby API Ready', api);
            }}
            onRoomLeft={() => {
              console.log('Left the room');
              setRoomUrl('');
            }}
            // Additional event handlers can be added here
          />
        </div>
      )}
    </div>
  );
}

export default App;
