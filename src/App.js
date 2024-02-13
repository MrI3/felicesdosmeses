import React from 'react';
import './App.css';
import HelloWorld from './components/HelloWorld';
import LocationDistance from './components/LocationDistance';
import DeviceOrientationExample from './components/Orientation';
import Compass from './components/Compass';

function App() {
  const [target, setTarget] = React.useState({targetLatitude:20.095035, targetLongitude: -98.711939, desiredAccuracy: 50});

  return (
    <>
      <Compass></Compass>
      {/*
      <HelloWorld holaMundo="Yes"></HelloWorld>
      <LocationDistance targetLatitude={20.095035} targetLongitude={-98.711939} desiredAccuracy={50}></LocationDistance>
      <DeviceOrientationExample></DeviceOrientationExample>
      <div style={{display:'flex', flexDirection: 'row'}}>
        <h3>Target Latitude</h3>
        <input type='number' value={target.targetLatitude} onChange={(e) => setTarget({targetLatitude:e.target.value})}/>
      </div>
     */} 
    </>
  );
}

export default App;
