import { ApolloError } from '@apollo/client';
import './DisruptionInfo.css';

const DisruptionInfo = ({ data, loading, error }: { data: any, loading: boolean, error: ApolloError | undefined}) => {
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
      {data.alerts.map((alert: any) => (
        <div className="Alert" key={alert.id}> {alert.alertDescriptionText}</div>
      ))}
    </div>
  );
  
};

export default DisruptionInfo;
