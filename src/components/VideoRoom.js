import React, { useEffect, useRef } from 'react';
import { WherebyProvider } from '@whereby.com/browser-sdk/react';

const VideoRoom = ({ roomName, apiKey }) => {
  const containerRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      clientRef.current = new WherebyProvider({
        apiKey: apiKey,
        roomName: roomName,
        parentNode: containerRef.current,
        // Optional configurations
      });

      clientRef.current.on('room:join', () => {
        console.log('Joined the room');
      });

      clientRef.current.on('error', (error) => {
        console.error('Whereby SDK Error:', error);
      });

      return () => {
        if (clientRef.current) {
          clientRef.current.destroy();
        }
      };
    }
  }, [apiKey, roomName]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '600px', marginTop: '20px' }}
    ></div>
  );
};

export default VideoRoom;
