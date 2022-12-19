import { useStateValue } from '../state';
import './AlertList.css';
import { mergeAlerts } from '../utils/formatAlertsData';
import Alert from './Alert';

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

      if(filter.length === 0 || filterValue) {
        return <Alert key={alert.id} alert={alert} />;
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
