import './App.css';
import mapboxgl from 'mapbox-gl';
import DisruptionInfo from './components/DisruptionInfo';
import DisruptionMap from './components/DisruptionMap';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const App = () => {
  return (
    <div className="App">
      <DisruptionInfo />
      <DisruptionMap />
    </div>
  );
};

export default App;
