const getLayerStyle = (id: string, severity: string) => {
  const layerStyle = {
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
  };
  const paint: {
    'line-width': number;
    'line-opacity': number;
    'line-color'?: string;
  } = {
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