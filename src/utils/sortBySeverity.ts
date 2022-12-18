/* eslint-disable @typescript-eslint/no-explicit-any */

const sortBySeverity = (a: any, b: any ) => {
  if(a.properties.severity === 'INFO' && b.properties.severity === 'WARNING' || a.properties.severity === 'WARNING' && b.properties.severity === 'SEVERE' ){
    return -1;
  }
  if(b.properties.severity === 'INFO' && a.properties.severity === 'WARNING' || b.properties.severity === 'WARNING' && a.properties.severity === 'SEVERE' ){
    return 1;
  }
  return 0;
};


export default sortBySeverity;