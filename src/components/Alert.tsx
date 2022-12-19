import { AlertType, Route } from '../types';
import './Alert.css';


const Alert = ({ alert }: { alert: Omit<AlertType, 'route'> & { route: Route[] }}) => {

  let alertType;
  if(alert.alertSeverityLevel === 'INFO'){
    alertType = 'Alert-info';
  } else if(alert.alertSeverityLevel === 'WARNING'){
    alertType = 'Alert-warning';
  } else {
    alertType = 'Alert-severe';
  }

  const startdate = (new Date(alert.effectiveStartDate * 1000)).toLocaleString();
  const enddate = (new Date(alert.effectiveEndDate * 1000)).toLocaleString();

  return(
    <div className={alertType}> 
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
};

export default Alert;