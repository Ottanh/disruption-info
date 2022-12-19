import { useStateValue } from '../state';
import './DisruptionInfo.css';
import { mergeAlerts } from '../utils/formatAlertsData';

const DisruptionInfo = () => {
  const [{ filter, alerts },] = useStateValue();
  const alertsCombined = mergeAlerts(alerts);
  
  const renderInfo = () => {
    return alertsCombined.map((alert) => {
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

        const startdate = (new Date(alert.effectiveStartDate * 1000)).toLocaleString();
        const enddate = (new Date(alert.effectiveEndDate * 1000)).toLocaleString();
        return (
        <div className={alerType} key={alert.id} > 
          <div className="Disruption-time">
            From {startdate} to {enddate}
          </div>
          <div>
            {alert.alertDescriptionText}
          </div>
          <div className="Route-list-container">
            <span className="Route-list-title">Routes affected</span>
            <ul className="Route-list">
            {alert.route.map((route) => {
              if(route?.longName)
                return <li key={route.id}>{route.longName}</li>;
            })}
            </ul> 
          </div>
          
        </div>);
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
