import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import style from '../hsl-map-style';
import './DisruptionMap.css';
import { useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';
import Route from './Route';
import sortBySeverity from '../utils/sortBySeverity';
import getLayerStyle from '../utils/getLayerStyle';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const DisruptionMap = ({ data }: { data: any}) => {
  const [routeDisruptions, setRouteDisruptions] = useState<any>([]);

  useEffect(() => {
    if(data?.alerts){
      const routeData = data.alerts.flatMap((alert: any) => {
        if(!alert.route?.patterns) return [];
        const line = alert.route.patterns.map((pattern: { patternGeometry: { points: string; }; }) => {
          return polyline.toGeoJSON(pattern.patternGeometry.points);
        });
        return { id: alert.id, description: alert.alertDescriptionText, severity: alert.alertSeverityLevel, line };
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
        routeDisruptions.map((disruption: { line: any[]; id: string; severity: string })  => {

          return disruption.line.map((line: any, index: any) => {
            const layerStyle = getLayerStyle(disruption.id + index, disruption.severity);
            return <Route key={index} layerStyle={layerStyle} geojson={line} />;
          });
        })
      }
    </Map>
  );
};

export default DisruptionMap;
