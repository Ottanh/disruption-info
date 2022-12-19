import './App.css';
import mapboxgl from 'mapbox-gl';
import DisruptionInfo from './components/DisruptionInfo';
import DisruptionMap from './components/DisruptionMap';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header';
import { setAlerts, useStateValue } from './state';
import { useEffect } from 'react';


if(process.env.REACT_APP_MAPBOX_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
}

const GET_DISRUPTIONS = gql`
  query {
    alerts {
      id
      alertSeverityLevel
      alertDescriptionText
      effectiveStartDate
      effectiveEndDate
      route {
        id
        patterns {
          patternGeometry {
            points
            length
          }
        }
        longName
      }
      stop {
        lat
        lon
      }
    }
  }
`;

const App = () => {
  const { data, error} = useQuery(GET_DISRUPTIONS);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    if(data){
      dispatch(setAlerts(data.alerts));
    }
  }, [data]);
  
  if(error){
    return (
      <div className="App">
        {error.message}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Info-container">
        <Header />
        <DisruptionInfo  />
      </div>
      <DisruptionMap />
    </div>
  );
};

export default App;
