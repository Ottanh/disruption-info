import { LineString } from 'geojson';

export interface Paint {
  'line-width': number;
  'line-opacity': number;
  'line-color'?: string;
}

export interface Layout {
  'line-join': string;
  'line-cap': string;
}

export interface LayerStyle {
  id: string;
  type: string;
  layout: Layout;
  paint: Paint;
}

export interface Alert {
  id: string;
  alertSeverityLevel: string;
  alertDescriptionText: string;
  route: {
    patterns: [{
      patternGeometry: {
        points: string;
        length: number;
      }
    }]
    longName: string;
  }
  trip: {
    shapeId: string;
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
  lines: LineString[];
}
