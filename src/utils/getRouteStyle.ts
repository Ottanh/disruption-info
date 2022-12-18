import { RouteStyle, Paint } from '../types';


const getRouteStyle = (): RouteStyle => {
  const layerStyle = {
    id: 'routes',
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
      0.2
    ],
    'line-color': [
      'match', ['get','severity'],
      'INFO', [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#49b0ff',
        '#229fff'
      ],
      'WARNING', [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#FFFF6E',
        '#ffff47'
      ],
      'SEVERE',[
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff2c40',
        '#FF6775'
      ],
      'white'
    ],
  };

  return {...layerStyle, paint};
};

export const getRouteHighlightStyle = (): RouteStyle => {
  const layerStyle = {
    id: 'routes',
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
      1
    ],
    'line-color': [
      'match', ['get','severity'],
      'INFO', [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#49b0ff',
        '#229fff'
      ],
      'WARNING', [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#FFFF6E',
        '#ffff47'
      ],
      'SEVERE',[
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        '#ff2c40',
        '#FF6775'
      ],
      'white'
    ],
  };

  return {...layerStyle, paint};
};


export default getRouteStyle;



