import { ApolloError } from '@apollo/client';
import { useStateValue } from '../state';
import { Alert } from '../types';
import './DisruptionInfo.css';

import lodash from 'lodash';

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

  let alerts = data.alerts.map((alert) => {
    return { ...alert, route: [alert.route] };
  });

  alerts = lodash.uniqWith(alerts, (pre, cur) => {
    if (pre.alertDescriptionText == cur.alertDescriptionText) {
      cur.route = cur.route.concat(pre.route);
      return true;
    }
    return false;
  });
  
  const renderInfo = () => {
    return alerts.map((alert) => {
      let filterValue;
      for(let i = 0; i < filter.length; i++) {
        for(let j = 0; j < alert.route.length; j++){
          if(filter[i] === alert.route[j]?.longName){
            filterValue = true;
          }
        }
      }

      if(filter.length === 0 || filterValue){
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
    });
  };

  return (
    <div className="DisruptionInfo">
      {renderInfo()}
    </div>
  );
};

export default DisruptionInfo;
