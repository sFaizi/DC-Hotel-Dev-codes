import { useContext, useRef } from 'react';
import classes from './Rooms.module.css';
import RoomDetailsList from './RoomDetailsList';
import DataContext from '../../../store/data-context';

const Rooms = () => {
  const inputFocus = useRef(null);
  const dataCTX = useContext(DataContext);

  const propagationHandle = (e) => {
    e.stopPropagation();
  };

  const roomEditorHandle = (e) => {
    e.preventDefault();
    dataCTX.roomEditorToggle();
  };

  const quickSelectHandle = (dataset) => {
    dataCTX.quickSelect(dataset);
  };

  const roomHandler = () => {
    dataCTX.roomAdd();
  };
  const quickOptionToggler = () => {
    dataCTX.showQuickOptions();
  };

  return (
    <div className={classes.rooms} onClick={propagationHandle}>
      <input
        onClick={roomEditorHandle}
        placeholder={`${dataCTX.totalRooms} ${
          dataCTX.totalRooms > 1 ? 'Rooms' : 'Room'
        }, ${dataCTX.totalAdults} ${
          dataCTX.totalAdults > 1 ? 'Adults' : 'Adult'
        } ${
          dataCTX.totalChildren > 0
            ? `, ${
                dataCTX.totalChildren > 1
                  ? `${dataCTX.totalChildren} Children`
                  : `${dataCTX.totalChildren} Child`
              }`
            : ''
        }`}
        ref={inputFocus}
      ></input>

      {dataCTX.roomEditorVisible && (
        <ul className={classes.roomOptions}>
          <div className={classes.quickSelect}>
            <h5>Quick Select</h5>
            {dataCTX.addRoomEditorVisible && (
              <button
                className={classes.quickSelectBtn}
                onClick={quickOptionToggler}
              >
                Show Options
              </button>
            )}
          </div>
          {!dataCTX.addRoomEditorVisible && (
            <div className={classes.quickSelectMenu}>
              <h4
                onClick={quickSelectHandle.bind(this, {
                  id: 'q1',
                  rooms: 1,
                  adults: 1,
                })}
              >
                1 Room, 1 Adult
              </h4>
              <h4
                onClick={quickSelectHandle.bind(this, {
                  id: 'q2',
                  rooms: 1,
                  adults: 2,
                })}
              >
                1 Room, 2 Adults
              </h4>
              <h4
                onClick={quickSelectHandle.bind(this, {
                  id: 'q3',
                  rooms: 2,
                  adults: 4,
                })}
              >
                2 Rooms, 4 Adults
              </h4>

              {/* {
                <h4
                  onClick={quickSelectHandle.bind(this, {
                    id: 'q4',
                    rooms: dataCTX.totalRooms,
                    adults: dataCTX.totalAdults,
                    children: dataCTX.totalChildren,
                  })}
                >
                  {`${dataCTX.totalRooms} Rooms, ${dataCTX.totalAdults} Adults, ${dataCTX.totalChildren} children`}
                </h4>
              } */}
            </div>
          )}

          {dataCTX.addRoomEditorVisible &&
            dataCTX.rooms.map((room, index) => (
              <RoomDetailsList room={room} roomNo={index} key={room.id} />
            ))}
          {
            <button className={classes.addRoom} onClick={roomHandler}>
              {dataCTX.addRoomEditorVisible
                ? `${
                    dataCTX.totalRooms < 6
                      ? '+ Add another room'
                      : 'Not more than 6 rooms'
                  }`
                : 'Add more rooms and travellers'}
            </button>
          }
        </ul>
      )}
    </div>
  );
};

export default Rooms;
