import Map, { Layer, LayerProps, Source } from 'react-map-gl';
import mapboxgl, { MapboxEvent, Map as MapType, MapboxGeoJSONFeature } from 'mapbox-gl';
import style from '../hsl-map-style';
import './DisruptionMap.css';
import { useEffect, useRef, useState } from 'react';
import polyline from '@mapbox/polyline';
import sortBySeverity from '../utils/sortBySeverity';
import getRouteStyle from '../utils/getRouteStyle';
import { Alert } from '../types';
import { MultiLineString, Feature, FeatureCollection } from 'geojson';
import { setFilter, useStateValue } from '../state';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const DisruptionMap = () => {
  const mapRef = useRef<MapType>();
  const [featureCollection, setFeatureCollection] = useState<FeatureCollection>();
  const [, setForceRerender] = useState(0);
  const [hoveredRouteIds, setHoveredRouteIds] = useState<string[]>([]);
  const [{ filter, alerts }, dispatch] = useStateValue();

  useEffect(() => {
    if(alerts){
      const features = alerts.flatMap((alert: Alert, index: number) => {
        const route: MultiLineString = {
          'type': 'MultiLineString', 
          'coordinates': []
        };
        if(!alert.route?.patterns) return [];
        
        const lines = alert.route.patterns.map((pattern) => {
          const line = polyline.decode(pattern.patternGeometry.points);
          line.forEach(coordinates => coordinates.reverse());
          return line;
        });
        route.coordinates = lines;

        const feature: Feature = {
            'type': 'Feature',
            'id': index, //id has to be int
            'geometry': route,
            'properties': {
              'disruptionId': alert.id,
              'routeLongName': alert.route.longName,
              'severity': alert.alertSeverityLevel
            }
        };
        return feature;
      });

      features.sort(sortBySeverity);
      const collection: FeatureCollection = {
        type: 'FeatureCollection',
        features
      };
      setFeatureCollection(collection);
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
      initialViewState={{
        longitude: 24.92399127219203,
        latitude: 60.20098737761848,
        zoom: 10
      }}
      mapStyle={style}
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
