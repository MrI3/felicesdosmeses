import './App.css';
import HelloWorld from './components/HelloWorld';
import LocationDistance from './components/LocationDistance';

function App() {
  return (
    <>
      <HelloWorld holaMundo="Yes"></HelloWorld>
      <LocationDistance targetLatitude={20.084991} targetLongitude={-98.719700} desiredAccuracy={20}></LocationDistance>
    </>
  );
}

export default App;
