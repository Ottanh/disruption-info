import { RouteStyle, Paint } from '../types';

const getRouteStyle = (id: string, severity: string): RouteStyle => {
  const layerStyle = {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
  };
  const paint: Paint = {
    'line-width': 4,
    'line-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      0.15
    ]
  };
  if(severity === 'INFO'){
    paint['line-color'] = [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#49b0ff',
      '#229fff'
    ];
  } else if(severity === 'WARNING'){
    paint['line-color'] = [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#FFFF6E',
      '#ffff47'
    ];
  } else {
    paint['line-color'] = [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#ff2c40',
      '#FF6775'
    ];
  }

  return {...layerStyle, id, paint};
};


export default getRouteStyle;