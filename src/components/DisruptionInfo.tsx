import { ApolloError } from '@apollo/client';
import { Alert } from '../types';
import './DisruptionInfo.css';

interface Props {
  data: {
    alerts: Alert[]
  };
  loading: boolean;
  error?: ApolloError;
}


const DisruptionInfo = ({ data, loading, error }: Props) => {
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

  return (
    <div className="DisruptionInfo">
      {data.alerts.map((alert: Alert) => (
        <div className="Alert" key={alert.id}> {alert.alertDescriptionText}</div>
      ))}
    </div>
  );
  
};

export default DisruptionInfo;
