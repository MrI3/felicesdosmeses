import React, { useState, useEffect } from 'react';

const DeviceOrientationExample = () => {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0, absolute: false });
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleOrientation = (event) => {
      const { alpha, beta, gamma, absolute } = event;
      setOrientation({ alpha, beta, gamma, absolute });
    };

    const handleMotion = (event) => {
      const { x, y, z } = event.acceleration;
      setAcceleration({ x, y, z });
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('devicemotion', handleMotion, true);
    };
  }, []);

  return (
    <div>
      <h2>Device Orientation</h2>
      <p>Absolute: {orientation.absolute ? 'Yes' : 'No'}</p>
      <p>Alpha: {orientation.alpha}</p>
      <p>Beta: {orientation.beta}</p>
      <p>Gamma: {orientation.gamma}</p>

      <h2>Device Motion</h2>
      <p>Acceleration X: {acceleration.x}</p>
      <p>Acceleration Y: {acceleration.y}</p>
      <p>Acceleration Z: {acceleration.z}</p>
    </div>
  );
};

export default DeviceOrientationExample;
