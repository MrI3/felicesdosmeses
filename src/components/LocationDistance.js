import React, { useState, useEffect } from 'react';

const LocationDistance = ({ targetLatitude, targetLongitude }) => {
  const [distance, setDistance] = useState({ north: 0, south: 0, east: 0, west: 0 });
  const [error, setError] = useState('');
  const [bestAccuracy, setBestAccuracy] = useState(Number.MAX_VALUE);
  const [bestPosition, setBestPosition] = useState(null);

  useEffect(() => {
    let watchId;

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
    } else {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          if (accuracy < bestAccuracy && bestAccuracy <= 200) {
            setBestAccuracy(accuracy);
            setBestPosition({ latitude, longitude });
          }
        },
        (err) => {
          setError('Error occurred: ' + err.message);
        },
        { enableHighAccuracy: true }
      );
    }

    const intervalId = setInterval(() => {
      if (bestPosition) {
        console.log(bestPosition);
        calculateDistance(bestPosition.latitude, bestPosition.longitude);
      }
    }, 100); // Update every second

    // Cleanup function to clear the watchPosition and interval
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      clearInterval(intervalId);
    };
  }, [bestPosition]);

  const calculateDistance = (userLatitude, userLongitude) => {
    const earthRadius = 6371e3; // meters

    const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
      const toRadians = degree => degree * Math.PI / 180;
      const deltaLat = toRadians(lat2 - lat1);
      const deltaLon = toRadians(lon2 - lon1);

      const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return earthRadius * c;
    };

    const distances = {
      north: (targetLatitude > userLatitude) ? calculateHaversineDistance(userLatitude, userLongitude, targetLatitude, userLongitude) : 0,
      south: (targetLatitude < userLatitude) ? calculateHaversineDistance(userLatitude, userLongitude, targetLatitude, userLongitude) : 0,
      east: (targetLongitude > userLongitude) ? calculateHaversineDistance(userLatitude, userLongitude, userLatitude, targetLongitude) : 0,
      west: (targetLongitude < userLongitude) ? calculateHaversineDistance(userLatitude, userLongitude, userLatitude, targetLongitude) : 0,
    };

    setDistance(distances);
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Best Accuracy: {bestAccuracy.toFixed(2)} meters</p>
          <p>Distance to the North: {distance.north.toFixed(2)} meters</p>
          <p>Distance to the South: {distance.south.toFixed(2)} meters</p>
          <p>Distance to the East: {distance.east.toFixed(2)} meters</p>
          <p>Distance to the West: {distance.west.toFixed(2)} meters</p>
        </div>
      )}
    </div>
  );
};

export default LocationDistance;
