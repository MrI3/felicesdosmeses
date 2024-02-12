import './App.css';
import HelloWorld from './components/HelloWorld';
import LocationDistance from './components/LocationDistance';
import DeviceOrientationExample from './components/Orientation';

function App() {
  return (
    <>
      <HelloWorld holaMundo="Yes"></HelloWorld>
      <LocationDistance targetLatitude={20.084991} targetLongitude={-98.719700} desiredAccuracy={20}></LocationDistance>
      <DeviceOrientationExample></DeviceOrientationExample>
    </>
  );
}

export default App;
