import { LayerStyle, Paint } from '../types';

const getLayerStyle = (id: string, severity: string): LayerStyle => {
  const layerStyle = {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
  };
  const paint: Paint = {
    'line-width': 4,
    'line-opacity': 0.2
  };
  if(severity === 'INFO'){
    paint['line-color'] = '#229fff';
  } else if(severity === 'WARNING'){
    paint['line-color'] = '#FFFF6E';
  } else {
    paint['line-color'] = '#FF6775';
  }

  return {...layerStyle, id, paint};
};

export default getLayerStyle;