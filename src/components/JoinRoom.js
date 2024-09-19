import React, { useState } from 'react';
import VideoRoom from './VideoRoom';

const JoinRoom = () => {
  const [inputRoomName, setInputRoomName] = useState('');
  const [currentRoomName, setCurrentRoomName] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinRoom = () => {
    if (inputRoomName.trim() === '') {
      alert('Please enter a valid room name.');
      return;
    }
    setCurrentRoomName(inputRoomName.trim());
    setIsJoined(true);
  };

  return (
    <div>
      <input
        type="text"
        value={inputRoomName}
        onChange={(e) => setInputRoomName(e.target.value)}
        placeholder="Enter room name"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      {isJoined && currentRoomName && (
        <div>
          <p>
            Joining Room:{' '}
            <a
              href={`https://whereby.com/${currentRoomName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://whereby.com/{currentRoomName}
            </a>
          </p>
          <VideoRoom
            roomName={currentRoomName}
            apiKey={process.env.REACT_APP_WHEREBY_API_KEY}
          />
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
