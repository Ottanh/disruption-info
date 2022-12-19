import './App.css';
import DisruptionInfo from './components/AlertList';
import DisruptionMap from './components/Map';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header';
import { setAlerts, useStateValue } from './state';
import { useEffect } from 'react';

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
    console.log(document.documentElement);
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
