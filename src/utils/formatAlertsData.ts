import polyline from '@mapbox/polyline';
import lodash from 'lodash';
import { AlertType } from '../types';
import { Feature, FeatureCollection } from 'geojson';
import sortBySeverity from './sortBySeverity';


export const mergeAlerts = (alerts: AlertType[]) => {
  let alertsCombined = alerts.map((alert: AlertType) => {
    return { ...alert, route: [alert.route] };
  });

  // merge alerts with same description text and concat their routes
  alertsCombined = lodash.uniqWith(alertsCombined, (pre, cur) => {
    if (pre.alertDescriptionText == cur.alertDescriptionText) {
      cur.route = cur.route.concat(pre.route);
      return true;
    }
    return false;
  });

  return alertsCombined;
};

export const getFeatureCollection = (alerts: AlertType[]) => {
  const features = alerts.flatMap((alert: AlertType, index: number) => {
    if(!alert.route?.patterns) return [];  //return if route has no geopatterns

    const polylines = alert.route.patterns.map((pattern) => {
      const line = polyline.decode(pattern.patternGeometry.points);
      line.forEach(coordinates => coordinates.reverse()); //mapbox requires coordinates as (lon, lat)
      return line;
    });
  
    const feature: Feature = {
        type: 'Feature',
        id: index,  //id has to be int
        geometry: {
          type: 'MultiLineString', 
          coordinates: polylines
        },
        properties: {
          disruptionId: alert.id,
          routeLongName: alert.route.longName,
          severity: alert.alertSeverityLevel
        }
    };
    return feature;
  });

  features.sort(sortBySeverity); //affects which order polylines get rendered
  const collection: FeatureCollection = {
    type: 'FeatureCollection',
    features
  };

  return collection;
};

