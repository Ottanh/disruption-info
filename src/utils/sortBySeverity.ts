
const sortBySeverity = (a: { severity: string; }, b: { severity: string; }) => {
    if(a.severity === 'INFO' && b.severity === 'WARNING' || a.severity === 'WARNING' && b.severity === 'SEVERE' ){
      return -1;
    }
    if(b.severity === 'INFO' && a.severity === 'WARNING' || b.severity === 'WARNING' && a.severity === 'SEVERE' ){
      return 1;
    }
    return 0;
};


export default sortBySeverity;