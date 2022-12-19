import Map, { Layer, LayerProps, Source } from 'react-map-gl';
import mapboxgl, { MapboxEvent, Map as MapType, MapboxGeoJSONFeature } from 'mapbox-gl';
import './Map.css';
import { useEffect, useRef, useState } from 'react';
import getRouteStyle from '../utils/getRouteStyle';
import { FeatureCollection } from 'geojson';
import { setFilter, useStateValue } from '../state';
import { getFeatureCollection } from '../utils/formatAlertsData';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const DisruptionMap = () => {
  const mapRef = useRef<MapType>();
  const [featureCollection, setFeatureCollection] = useState<FeatureCollection>();
  const [, setForceRerender] = useState(0);
  const [hoveredRouteIds, setHoveredRouteIds] = useState<string[]>([]);
  const [{ filter, alerts, mapstyle }, dispatch] = useStateValue();


  useEffect(() => {
    if(alerts){
      setFeatureCollection(getFeatureCollection(alerts));
    }
  }, [alerts]);

  useEffect(() => {
    if(mapRef.current){
      mapRef.current.on('mouseenter', 'routes', function(e) {

        e.features?.forEach((feature: MapboxGeoJSONFeature) => {
          if(feature.id && !hoveredRouteIds.includes(feature.id.toString())){
            setHoveredRouteIds(hoveredRouteIds.concat(feature.id.toString()));
          }
          if(mapRef.current){
            mapRef.current.setFeatureState(
              feature,
              { hover: true }
            );
          }
        });
      });
      
      mapRef.current.on('mouseleave', 'routes', function() {
        hoveredRouteIds.forEach((hoveredRouteId) => {
          if(mapRef.current){
            mapRef.current.setFeatureState(
              {source: 'routes-source', id: hoveredRouteId},
              { hover: false }
            );
          }
        });
        setHoveredRouteIds([]);
      });

      
      mapRef.current.on('click', 'routes', function(e) {
        if(!e.features) return;
        const ids: string[] = e.features.map((feature) => {
          return feature.properties?.routeLongName;
        });
        dispatch(setFilter(ids));
      }); 

      mapRef.current.on('click',  function() {
        if(filter.length > 0){
          dispatch(setFilter([]));
        }
      }); 

    }
  },[mapRef.current, hoveredRouteIds]);
  
  const onLoad = (event: MapboxEvent) => {
    mapRef.current = event.target;
    setForceRerender(1);
  };

  return (
    <Map
      id="map"
      initialViewState={{
        longitude: 24.92399127219203,
        latitude: 60.20098737761848,
        zoom: 10
      }}
      mapStyle={mapstyle}
      style={{'width':'50%'}}
      attributionControl={false}
      onLoad={onLoad}
    
      interactiveLayerIds={['routes']}
    >
      <Source type="geojson" data={featureCollection} id={'routes-source'}>
        <Layer  {...getRouteStyle() as LayerProps}/>
      </Source>
    </Map>
  );
};

export default DisruptionMap;
