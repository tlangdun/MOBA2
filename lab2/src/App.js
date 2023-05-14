import './App.css';
import React from "react";
import TrafficLight from "./TrafficLight";

function App() {
  return (
    <div className="App">
      
      <TrafficLight initialPosition={0} />
      <TrafficLight initialPosition={1} />
    </div>
  );
}

export default App;







