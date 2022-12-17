import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import style from '../hsl-map-style';
import './DisruptionMap.css';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const DisruptionMap = () => {
  return (
    <Map
      initialViewState={{
        longitude: 24.92399127219203,
        latitude: 60.20098737761848,
        zoom: 10
      }}
      mapStyle={style}
      style={{'width':'50%'}}
      attributionControl={false}
    />
  );
};

export default DisruptionMap;
