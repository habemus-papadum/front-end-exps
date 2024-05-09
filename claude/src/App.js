import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = [...data].sort(() => Math.random() - 0.5); // Random shuffle
      setData(newData);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <div className="App">
      <DataTable data={data} />
    </div>
  );
}

export default App;