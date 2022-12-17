import './App.css';
import mapboxgl from 'mapbox-gl';
import DisruptionInfo from './components/DisruptionInfo';
import DisruptionMap from './components/DisruptionMap';
import { gql, useQuery } from '@apollo/client';

if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const GET_DISRUPTIONS = gql`
  query {
    alerts {
      id
      alertSeverityLevel
      alertDescriptionText
      route {
        patterns {
          patternGeometry {
            points
            length
          }
        }
        longName
      }
      trip {
        shapeId
      }
      stop {
        lat
        lon
      }
    }
  }
`;

const App = () => {
  const { data, loading, error} = useQuery(GET_DISRUPTIONS);
  return (
    <div className="App">
      <DisruptionInfo data={data} loading={loading} error={error} />
      <DisruptionMap data={data} />
    </div>
  );
};

export default App;
