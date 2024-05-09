import React, { useState, useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

function App() {
  const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const [items, setItems] = useState(initialItems);

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    setItems(shuffled);
  };

  useEffect(() => {
    const interval = setInterval(shuffleItems, 2000);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="App p-5">
      <h1 className="text-xl font-bold mb-4">Animated Item List</h1>
      <Flipper flipKey={items.join("")}>
        <ul>
          {items.map(item => (
            <Flipped key={item} flipId={item}>
              <li className="bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-pink-500/60 rounded-lg p-3 m-2 blur-sm shadow-lg">
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
