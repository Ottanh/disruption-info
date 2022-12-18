import { FeatureCollection, Feature } from 'geojson';

export interface Paint {
  'line-width': number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'line-opacity': any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'line-color'?: any;
}

export interface Layout {
  'line-join': string;
  'line-cap': string;
}

export interface RouteStyle {
  id: string;
  type: string;
  layout: Layout;
  paint: Paint;
}

export interface PatternGeometry {
  points: string;
  length: number;
}

export interface Alert {
  id: string;
  alertSeverityLevel: string;
  alertDescriptionText: string;
  effectiveStartDate: number;
  effectiveEndDate: number;
  route: {
    id: string;
    patterns: [{
      patternGeometry: PatternGeometry
    }]
    longName: string;
  }
  stop: {
    lat: number
    lon: number
  }
}

export interface RouteDisruption {
  id: string;
  description: string;
  severity: string;
  route: Feature | FeatureCollection;
}
