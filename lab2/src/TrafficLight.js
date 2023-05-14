import Light from "./Light";
// import hooks
import React, { useState, useEffect } from "react";

// list of duration values for each color
const lightDurations = [1000, 1200, 1500];

const TrafficLight = ({ initialPosition }) => {
  // init light position
  const [lightPosition, setLightPosition] = useState(initialPosition);

  // use useEffect hook to update the color index
  useEffect(() => {
    // use a timer to update the color index every few seconds
    const timer = setTimeout(() => {
      // set light position 
      setLightPosition((lightPosition + 1) % 3);
    }, lightDurations[lightPosition]);

    // return a cleanup function to stop the timer
    return () => {
      clearTimeout(timer);
    };
  });

  // sets the color index to the given value
  const handleLightClick = (position) => {
    setLightPosition(position);
  };

  // render and add Light components with the colors and active states
  return (
    <div className="traffic-light">
      <Light
        color="#f00" //red
        active={lightPosition === 0}
        onClick={() => handleLightClick(1)} // if red light component is clicked, set  color index to 1
      />
      <Light
        color="#ff0" // yellow
        active={lightPosition === 2}
        onClick={() => handleLightClick(2)} 
      />
      <Light
        color="#0c0" // green
        active={lightPosition === 1}
        onClick={() => handleLightClick(1)} 
      />
    </div>
  );
};


export default TrafficLight;
