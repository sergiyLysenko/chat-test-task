import { useState } from "react";
import io from 'socket.io-client';
import "./App.css";

const socket = io.connect('http://localhost:3001');

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>sdf</h2>
    </div>
  );
}

export default App;
