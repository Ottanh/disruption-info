import './App.css';
import mapboxgl from 'mapbox-gl';
import DisruptionInfo from './components/DisruptionInfo';
import DisruptionMap from './components/DisruptionMap';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header';

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
      <div className="Info-container">
        <Header />
        <DisruptionInfo data={data} loading={loading} error={error} />
      </div>
      <DisruptionMap data={data} />
    </div>
  );
};

export default App;
