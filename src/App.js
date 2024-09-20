import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import MyComponent from './components/MyComponent';

const apiKey = process.env.REACT_APP_WHEREBY_API_KEY;

function App() {
  const [hostRoomUrl, setHostRoomUrl] = useState('');
  const [participantRoomUrl, setParticipantRoomUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoom = async () => {
    setLoading(true);
    setError(null);

    try {
      const body = {
        // Define room properties as needed
        endDate: "2024-09-21T20:31:09.102Z",
        fields:["hostRoomUrl"]
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
      console.log("Response:", response.data);

      const { roomUrl, hostRoomUrl } = response.data;
      setParticipantRoomUrl(roomUrl);
      setHostRoomUrl(hostRoomUrl);
      console.log('Participant Room URL:', roomUrl);
      console.log('Host Room URL:', hostRoomUrl);
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinParticipant = () => {
    if (!participantRoomUrl) {
      setError('No room available to join. Please create a room first.');
      return;
    }
    // Logic to join as participant can be handled here
    // For example, redirect or show participant embed
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(participantRoomUrl)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy the URL:', error);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>Hitch Hatch! connect with your partner</h1>
      </header>

      <main>
        <section className="create-room-section">
          <h2>Create a New Meeting</h2>
          <button onClick={createRoom} disabled={loading}>
            {loading ? 'Creating Room...' : 'Create Room'}
          </button>
          {error && <p className="error">{error}</p>}
        </section>

        {hostRoomUrl && (
          <section className="host-section">
            <h2>Host View</h2>
            <p>
              Share this URL with participants to join the meeting:
              <br />
              <button onClick={handleCopyToClipboard}>
              copy
            </button>
            </p>
            <MyComponent
              roomUrl={hostRoomUrl}
              role="host"
              apiKey={apiKey}
              onApiReady={(api) => {
                console.log('Whereby API Ready (Host)', api);
              }}
              onRoomLeft={() => {
                console.log('Host left the room');
                setHostRoomUrl('');
                setParticipantRoomUrl('');
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
