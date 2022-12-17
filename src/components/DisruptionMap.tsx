import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import style from '../hsl-map-style';
import './DisruptionMap.css';
import { useEffect, useState } from 'react';
import polyline from '@mapbox/polyline';
import Route from './Route';
import sortBySeverity from '../utils/sortBySeverity';

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


  const layerStyle = {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#888',
      'line-width': 8
    }
  };

  console.log(routeDisruptions);


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

          const paint: any = {
            'line-width': 4,
            'line-opacity': 0.2
          };
          if(disruption.severity === 'INFO'){
            paint['line-color'] = '#229fff';
          } else if(disruption.severity === 'WARNING'){
            paint['line-color'] = '#FFFF6E';
          } else {
            paint['line-color'] = '#FF6775';
          }

          return disruption.line.map((line: any, index: any) => {
            const style = {...layerStyle, id: disruption.id + index, paint};
            return <Route key={index} layerStyle={style} geojson={line} />;
          });
        })
      }
    </Map>
  );
};

export default DisruptionMap;
