import { Layer, LayerProps, Source } from 'react-map-gl';
import { LineString } from 'geojson';
import { LayerStyle } from '../types';

interface Props {
  line: LineString;
  layerStyle: LayerStyle
}

const Route = ({ line, layerStyle }: Props) => {
  return (
    <Source type="geojson" data={line}>
      <Layer  {...layerStyle as LayerProps}/>
    </Source>
  );
};

export default Route;