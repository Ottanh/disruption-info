import { gql, useQuery } from '@apollo/client';
import './DisruptionInfo.css';

const GET_DISRUPTIONS = gql`
  query {
    alerts {
      id
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

const DisruptionInfo = () => {
  const { data, loading, error} = useQuery(GET_DISRUPTIONS);

  if(loading){
    return(
      <div>
        Loading...
      </div>
    );
  }

  if(error){
    return(
      <div>
        {error.message}
      </div>
    );
  }

  console.log(data.alerts);


  return (
    <div className="DisruptionInfo">
      {data.alerts.map((alert: any) => (
        <div className="Alert" key={alert.id}> {alert.alertDescriptionText}</div>
      ))}
    </div>
  );
  
};

export default DisruptionInfo;
