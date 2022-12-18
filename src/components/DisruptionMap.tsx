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
import { useStateValue } from '../state';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

interface Props {
  data: {
    alerts: Alert[]
  }
}

const DisruptionMap = ({ data }:  Props) => {
  const [featureCollection, setFeatureCollection] = useState<FeatureCollection>();
  const mapRef = useRef<MapType>();
  const [, setForceRerender] = useState(0);

  const [hoveredRouteIds, setHoveredRouteIds] = useState<string[]>([]);
  const [{ filter }, dispatch] = useStateValue();

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
        console.log(hoveredRouteIds);
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

      /*
      mapRef.current.on('click', function(e) {
        console.log(e.features);
        //dispatch(setFilter([id]));
        //console.log(e.features);
      }); */

    }
  },[mapRef.current, hoveredRouteIds]);
  
  useEffect(() => {
    if(data?.alerts){
      const features = data.alerts.flatMap((alert: Alert, index: number) => {
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
  }, [data]);


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
