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
import { LineString } from 'geojson';


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
        if(!alert.route?.patterns) return [];
        
        const lines = alert.route.patterns.map((pattern: { patternGeometry: { points: string; }; }) => {
          return polyline.toGeoJSON(pattern.patternGeometry.points);
        });

        return { id: alert.id, description: alert.alertDescriptionText, severity: alert.alertSeverityLevel, lines };
      });
      console.log(routeData);
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
          return disruption.lines.map((line: LineString, index: number) => {
            const layerStyle = getLayerStyle(disruption.id + index, disruption.severity);
            return <Route key={index} layerStyle={layerStyle} line={line} />;
          });
        })
      }
    </Map>
  );
};

export default DisruptionMap;
