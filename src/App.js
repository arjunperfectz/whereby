import React from 'react';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Whereby Demo</h1>
      <div style={{ marginBottom: '40px' }}>
        <h2>Create a Room</h2>
        <CreateRoom />
      </div>
      <div>
        <h2>Join a Room</h2>
        <JoinRoom />
      </div>
    </div>
  );
};

export default App;
