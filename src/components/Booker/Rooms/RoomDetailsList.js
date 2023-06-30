import classes from './RoomDetailsList.module.css';
import { useContext } from 'react';
import DataContext from '../../../store/data-context';
import ChildAge from './ChildAge';

const RoomDetailsList = (props) => {
  const room = props.room;

  const dataCTX = useContext(DataContext);

  const removeRoomsHandle = (id) => {
    dataCTX.roomRemove(id);
  };

  const addAdultHandler = (id) => {
    dataCTX.addAdult(id);
  };

  const removeAdultHandler = (id) => {
    dataCTX.removeAdult(id);
  };

  const addChildHandler = (id) => {
    dataCTX.addChild(id);
  };

  const removeChildHandler = (id) => {
    dataCTX.removeChild(id);
  };

  return (
    <li className={classes.roomOptionsList} key={room.id}>
      <p className={classes.roomHead}>{`Room ${props.roomNo + 1}`}</p>

      {props.roomNo !== 0 && (
        <button
          className={classes.roomDel}
          onClick={removeRoomsHandle.bind(null, room.id)}
        >
          Delete
        </button>
      )}

      <div className={classes.roomEdit}>
        <h3>
          Adult
          <br />
          <span>11+ years</span>
        </h3>
        <button onClick={removeAdultHandler.bind(null, room.id)}>-</button>
        <p className={classes.roomEditDisplay}>{room.adults}</p>
        <button onClick={addAdultHandler.bind(null, room.id)}>+</button>
      </div>

      <div className={classes.roomEdit}>
        <h3>
          Children
          <br />
          <span>0 - 11 years</span>
        </h3>
        <button onClick={removeChildHandler.bind(null, room.id)}>-</button>
        <p className={classes.roomEditDisplay}>{room.children}</p>
        <button onClick={addChildHandler.bind(null, room.id)}>+</button>
      </div>
      {room.childAges.map((item, i) => (
        <ChildAge key={i} index={i + 1} />
      ))}
    </li>
  );
};

export default RoomDetailsList;
