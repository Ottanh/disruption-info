import './App.css';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import style from './hsl-map-style';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}


function App() {

  return (
    <div className="App">
      hello
      <Map
        initialViewState={{
          longitude: 24.92399127219203,
          latitude: 60.20098737761848,
          zoom: 9
        }}
        mapStyle={style}
        attributionControl={false}
      />
    </div>
  );
}

export default App;
