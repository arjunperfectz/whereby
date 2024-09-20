import React from 'react';
import "@whereby.com/browser-sdk/embed";  // Importing the SDK for embedding

const MyComponent = ({ roomUrl, onApiReady, onRoomLeft }) => {
  return (
    <whereby-embed
      room={roomUrl}
      style={{ width: '100%', height: '600px' }}
      onApiReady={onApiReady}
      onRoomLeft={onRoomLeft}
    />
  );
};

export default MyComponent;
