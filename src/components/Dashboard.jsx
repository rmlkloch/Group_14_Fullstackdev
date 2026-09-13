import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5002'}/api/boards`)
      .then((res) => res.json())
      .then((data) => {
        setBoards(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Boards</h2>
      <ul>
        {boards.map(board => (
          <li key={board.id}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
}
