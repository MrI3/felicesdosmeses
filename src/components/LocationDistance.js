import React, { useState, useEffect } from 'react';

const LocationDirection = ({ targetLatitude, targetLongitude }) => {
  const [userPosition, setUserPosition] = useState({ latitude: 0, longitude: 0 });
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    let watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        const newBearing = calculateBearing(position.coords.latitude, position.coords.longitude, targetLatitude, targetLongitude);
        setBearing(newBearing);
      },
      (error) => {
        console.error('Error occurred: ' + error.message);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [targetLatitude, targetLongitude]);

  function calculateBearing(startLat, startLng, destLat, destLng){
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
              Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    const bearing = Math.atan2(y, x);
    return (toDegrees(bearing) + 360) % 360;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

  return (
    <div style={{ transform: `rotate(${bearing}deg)`, width: '150px', height: '100px', backgroundColor:'red'}}>
      {/* Arrow image or CSS-styled arrow here */}
    </div>
  );
};

export default LocationDirection;
