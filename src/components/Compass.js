import arrow from "../assets/img/arrow.png";
import React, { useState, useEffect } from 'react';

const Compass = () => {
  const [angle, setAngle] = useState(0);

  const handleOrientation = (event) => {
    const { alpha, beta, gamma } = event;

    // Convert degrees to radians
    const alphaRad = alpha * (Math.PI / 180);
    const betaRad = beta * (Math.PI / 180);
    const gammaRad = gamma * (Math.PI / 180);

    // Calculate the direction of the arrow
    const x = Math.cos(alphaRad) * Math.cos(betaRad);
    const y = Math.sin(alphaRad) * Math.cos(betaRad);
    const z = Math.sin(betaRad);

    // Adjust for gamma (left/right tilt)
    const xh = x * Math.cos(gammaRad) + z * Math.sin(gammaRad);
    const yh = y;

    // Convert back to degrees for CSS rotation
    const angle = Math.atan2(yh, xh) * (180 / Math.PI);

    // Set the angle for the arrow
    setAngle(angle);
  };

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  return (
    <div style={{ transform: `rotate(${angle - 180}deg)` }}>
      <img src={arrow} alt="Arrow pointing south" />
    </div>
  );
};

export default Compass;