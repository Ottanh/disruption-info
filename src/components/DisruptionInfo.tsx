import { ApolloError } from '@apollo/client';
import { useStateValue } from '../state';
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
  const [{ filter }, ] = useStateValue();

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
      {data.alerts.map((alert: Alert) => {
        if(alert.id === filter || filter === null){
          let alerType;
          if(alert.alertSeverityLevel === 'INFO'){
            alerType = 'Alert-info';
          } else if(alert.alertSeverityLevel === 'WARNING'){
            alerType = 'Alert-warning';
          } else {
            alerType = 'Alert-severe';
          }
          return <div className={alerType} key={alert.id} > {alert.alertDescriptionText}</div>;
        }
      })}
    </div>
  );
  
};

export default DisruptionInfo;
