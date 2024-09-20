import React from 'react';
import "@whereby.com/browser-sdk/embed";  // Importing the SDK for embedding

const MyComponent = ({ roomUrl, role, apiKey, onApiReady, onRoomLeft }) => {
  return (
    <whereby-embed
      room={roomUrl}
      api-key={apiKey}
      style={{ width: '100%', height: '600px' }}
      onApiReady={onApiReady}
      onRoomLeft={onRoomLeft}
      // Additional event handlers can be added here
    />
  );
};

export default MyComponent;
