import React, { useState } from 'react';
import axios from 'axios';
import VideoRoom from './VideoRoom';

const CreateRoom = () => {
  const [roomUrl, setRoomUrl] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isRoomCreated, setIsRoomCreated] = useState(false);

  const handleCreateRoom = async () => {
    try {
      console.log(">>>",process.env.REACT_APP_WHEREBY_API_KEY);
      
      const response = await axios.post(
        'https://api.whereby.com/v1/rooms',
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzI2NzgwNjUzLCJvcmdhbml6YXRpb25JZCI6MjY5ODE4LCJqdGkiOiI4ZGYwYzQ2Ny00NDRmLTQxMDktOTA0My1mZTY0ZTBlMzQ3ZjYifQ.OHxzsJyLqlYZGS4tLyG_g6Qygyaf1MzHcUOZam6swLk`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { room_url } = response.data;
      setRoomUrl(room_url);

      const extractedRoomName = room_url.split('/').pop();
      setRoomName(extractedRoomName);
      setIsRoomCreated(true);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room. Check console for details.');
    }
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create and Embed Room</button>
      {isRoomCreated && roomName && (
        <div>
          <p>
            Room URL:{' '}
            <a
              href={roomUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {roomUrl}
            </a>
          </p>
          <VideoRoom
            roomName={roomName}
            apiKey={process.env.REACT_APP_WHEREBY_API_KEY}
          />
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
