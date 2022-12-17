import { Layer, LayerProps, Source } from 'react-map-gl';


const Route = ({ geojson, layerStyle }: any) => {

  const geojson2 = {...geojson, coordinates: geojson.coordinates.filter((_x: any, i: number) => i % 4)};
  return (
    <Source type="geojson" data={geojson2}>
      <Layer  {...layerStyle as LayerProps}/>
    </Source>
  );
};

export default Route;