import React, { useState, useEffect } from 'react';
import arrow from "../assets/img/arrow.png";

const Compass = () => {
  const [degree, setDegree] = useState(0);

  const handleOrientation = (event) => {
    const { alpha } = event;
    // Assuming alpha returns the degree from North, we adjust it to point South
    // South is 180 degrees from North
    const southDirection = (alpha + 180) % 360;
    setDegree(southDirection);
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
    <>
      <div style={{ transform: `rotate(${degree}deg)` }}>
        <img src={arrow} alt="Arrow pointing south" />
      </div>
    </>
  );
};

export default Compass;
