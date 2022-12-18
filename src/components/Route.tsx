import { Layer, LayerProps, Source, useMap } from 'react-map-gl';
import { FeatureCollection, Feature } from 'geojson';
import { RouteStyle } from '../types';
import { useState } from 'react';

interface Props {
  route: FeatureCollection | Feature;
  routeStyle: RouteStyle
  id: string
}

const Route = ({ route, routeStyle, id }: Props) => {
  const {current: map} = useMap();
  const [hoveredRouteIds, setHoveredRouteIds] = useState<string[]>([]);

  if(map){
    map.on('mouseenter', id , function(e) {
      e.features?.forEach((feature) => {
        if(feature.id){
          setHoveredRouteIds(hoveredRouteIds.concat(feature.id.toString()));
        }
        map.setFeatureState(
          feature,
          { hover: true }
        );
      });

    });
    
    map.on('mouseleave', id , function() {
      hoveredRouteIds.forEach((hoveredRouteId) => {
        map.setFeatureState(
          {source: id, id: hoveredRouteId},
          { hover: false }
        );
      });
    });
  }

  return (
    <Source type="geojson" data={route} id={id}>
      <Layer  {...routeStyle as LayerProps}/>
    </Source>
  );
};

export default Route;