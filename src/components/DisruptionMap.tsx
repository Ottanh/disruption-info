import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import style from '../hsl-map-style';
import './DisruptionMap.css';
import { useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';
import Route from './Route';
import sortBySeverity from '../utils/sortBySeverity';
import getLayerStyle from '../utils/getLayerStyle';
import { Alert, RouteDisruption } from '../types';
import { MultiLineString } from 'geojson';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

interface Props {
  data: {
    alerts: Alert[]
  }
}

const DisruptionMap = ({ data }:  Props) => {
  const [routeDisruptions, setRouteDisruptions] = useState<RouteDisruption[]>([]);

  useEffect(() => {
    if(data?.alerts){
      const routeData = data.alerts.flatMap((alert: Alert) => {
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

        return { id: alert.id, description: alert.alertDescriptionText, severity: alert.alertSeverityLevel, route };
      });
      routeData.sort(sortBySeverity);
      setRouteDisruptions(routeData);
    }
  }, [data]);


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
    >

      {routeDisruptions.length > 0 && 
        routeDisruptions.map((disruption: RouteDisruption)  => {
          const layerStyle = getLayerStyle(disruption.id, disruption.severity);
          if(disruption.route) {
            return <Route key={disruption.id} layerStyle={layerStyle} route={disruption.route} />;
          }
        })
      }
    </Map>
  );
};

export default DisruptionMap;
