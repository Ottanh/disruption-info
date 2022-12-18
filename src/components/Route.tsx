import { Layer, LayerProps, Source } from 'react-map-gl';
import { MultiLineString } from 'geojson';
import { LayerStyle } from '../types';

interface Props {
  route: MultiLineString;
  layerStyle: LayerStyle
}

const Route = ({ route, layerStyle }: Props) => {
  return (
    <Source type="geojson" data={route}>
      <Layer  {...layerStyle as LayerProps}/>
    </Source>
  );
};

export default Route;