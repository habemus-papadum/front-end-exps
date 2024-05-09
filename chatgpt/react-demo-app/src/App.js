import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

function App() {
  const [items, setItems] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/ws');
    websocket.onmessage = (event) => {
      setItems(JSON.parse(event.data));
    };
    setWs(websocket);
    return () => websocket.close();
  }, []);

  const stopUpdates = () => {
    ws.send('stop');
  };

  return (
    <div className="App p-5">
      <h1 className="text-xl font-bold mb-4">Animated Item List</h1>
      <button onClick={stopUpdates} className="bg-red-500 text-white p-2 rounded mb-4">Stop Updates</button>
      <Flipper flipKey={items.join("")}>
        <ul>
          {items.map((item, index) => (
            <Flipped key={item} flipId={item}>
              <li className="bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-pink-500/60 rounded-lg p-3 m-2 blur-md shadow-lg">
                {item}
              </li>
            </Flipped>
          ))}
        </ul>
      </Flipper>
    </div>
  );
}

export default App;
