import { useContext } from 'react';
import DataContext from '../store/data-context';

const CloseWrapper = (props) => {
  const dataCTX = useContext(DataContext);

  const closeActivity = () => {
    dataCTX.closeActivities();
  };

  return <div onClick={closeActivity}>{props.children}</div>;
};

export default CloseWrapper;
