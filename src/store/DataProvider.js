import { useReducer } from 'react';
import DataContext from './data-context';

const defaultData = {
  rooms: [{ id: 'default1', adults: 2, children: 0, childAges: [] }],
  totalRooms: 1,
  totalAdults: 2,
  totalChildren: 0,
  roomEditorVisible: false,
  addRoomEditorVisible: false,
};

const defaultActiveData = (current, roomEditor, addRoom) => {
  return {
    rooms: current.rooms,
    totalRooms: current.totalRooms,
    totalAdults: current.totalAdults,
    totalChildren: current.totalChildren,
    roomEditorVisible: roomEditor,
    addRoomEditorVisible: addRoom,
  };
};

const calcData = (arr, elm = 'adults') => {
  const data = arr.reduce((prev, curr) => {
    return prev + curr[elm];
  }, 0);
  return data;
};

const targetItem = (obj, comparativeValue) => {
  const itemIndex = obj.findIndex((item) => item.id === comparativeValue);
  return obj[itemIndex];
};

const dataReducer = (state, action) => {
  // For toggling the visibility of Room editing options
  if (action.type === 'ToggleEditorVisibility') {
    const current = state;
    return {
      rooms: current.rooms,
      totalRooms: current.totalRooms,
      totalAdults: current.totalAdults,
      totalChildren: current.totalChildren,
      roomEditorVisible: !current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  // For adding a new room section
  if (action.type === 'ROOM') {
    const current = state;
    if (current.totalRooms < 6) {
      let addedRoom = current.rooms;
      if (current.rooms.length >= 1 && current.addRoomEditorVisible === true) {
        addedRoom.push({
          id: action.id,
          adults: 0,
          children: 0,
          childAges: [],
        });
      }
      return {
        rooms: addedRoom,
        totalRooms: current.rooms.length,
        totalAdults: calcData(current.rooms, 'adults'),
        totalChildren: current.totalChildren,
        roomEditorVisible: current.roomEditorVisible,
        addRoomEditorVisible: true,
      };
    } else {
      return defaultActiveData(current, current.roomEditorVisible, true);
    }
  }

  // For Quick room select options
  if (action.type === 'QuickSelect') {
    const current = state;
    let updatedRooms = current.rooms;
    let updatedAdults;
    if (action.rooms === 2) {
      updatedRooms = [
        { id: action.id, adults: 2, children: 0, childAges: [] },
        { id: 'q4', adults: 2, children: 0, childAges: [] },
      ];
    } else {
      updatedRooms = [
        { id: action.id, adults: action.adults, children: 0, childAges: [] },
      ];
    }
    updatedAdults = calcData(updatedRooms, 'adults');

    return {
      rooms: updatedRooms,
      totalRooms: updatedRooms.length,
      totalAdults: updatedAdults,
      totalChildren: 0,
      roomEditorVisible: current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  if (action.type === 'QuickOptions') {
    const current = state;
    return {
      rooms: current.rooms,
      totalRooms: current.totalRooms,
      totalAdults: current.totalAdults,
      totalChildren: current.totalChildren,
      roomEditorVisible: true,
      addRoomEditorVisible: false,
    };
  }

  // To remove whole room section
  if (action.type === 'Remove') {
    const current = state;
    const room = targetItem(current.rooms, action.id);
    const updatedrooms = current.rooms.filter((item) => item.id !== room.id);

    return {
      rooms: updatedrooms,
      totalRooms: updatedrooms.length,
      totalAdults: calcData(updatedrooms, 'adults'),
      totalChildren: calcData(updatedrooms, 'children'),
      roomEditorVisible: current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  // for adding a new adult
  if (action.type === 'add-adult') {
    const current = state;

    const room = targetItem(current.rooms, action.id);
    if (room.adults + room.children < 12 && room.adults < 8) room.adults += 1;
    const updatedAdults = calcData(current.rooms, 'adults');

    return {
      rooms: current.rooms,
      totalRooms: current.rooms.length,
      totalAdults: updatedAdults,
      totalChildren: current.totalChildren,
      roomEditorVisible: current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  // for removing adult
  if (action.type === 'remove-adult') {
    const current = state;
    const room = targetItem(current.rooms, action.id);
    if (room.adults > 1) room.adults -= 1;
    const updatedAdults = calcData(current.rooms, 'adults');

    return {
      rooms: current.rooms,
      totalRooms: current.rooms.length,
      totalAdults: updatedAdults,
      totalChildren: current.totalChildren,
      roomEditorVisible: current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  // for adding child
  if (action.type === 'add-child') {
    const current = state;
    const room = targetItem(current.rooms, action.id);
    if (room.adults + room.children < 12 && room.children < 6) {
      room.children += 1;
      room.childAges.push('temporary value');
    }
    const updatedchildren = calcData(current.rooms, 'children');

    return {
      rooms: current.rooms,
      totalRooms: current.rooms.length,
      totalAdults: current.totalAdults,
      totalChildren: updatedchildren,
      roomEditorVisible: current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  // for remove child
  if (action.type === 'remove-child') {
    const current = state;
    const room = targetItem(current.rooms, action.id);
    if (room.children > 0) room.children -= 1;
    room.childAges.pop();
    const updatedchildren = calcData(current.rooms, 'children');

    return {
      rooms: current.rooms,
      totalRooms: current.rooms.length,
      totalAdults: current.totalAdults,
      totalChildren: updatedchildren,
      roomEditorVisible: current.roomEditorVisible,
      addRoomEditorVisible: current.addRoomEditorVisible,
    };
  }

  if (action.type === 'CloseAll') {
    const current = state;
    return {
      rooms: current.rooms,
      totalRooms: current.totalRooms,
      totalAdults: current.totalAdults,
      totalChildren: current.totalChildren,
      roomEditorVisible: false,
      addRoomEditorVisible: false,
    };
  }

  return defaultData;
};

const DataProvider = (props) => {
  const [data, dispatchData] = useReducer(dataReducer, defaultData);

  const roomHandler = () => {
    dispatchData({
      type: 'ROOM',
      id: Date.now(),
    });
  };

  const roomEditorHandle = () => {
    dispatchData({ type: 'ToggleEditorVisibility' });
  };

  const quickSelectHandle = (dataset) => {
    dispatchData({
      type: 'QuickSelect',
      id: dataset.id,
      adults: dataset.adults,
      rooms: dataset.rooms,
    });
  };

  const roomRemoveHandle = (id) => {
    dispatchData({ type: 'Remove', id });
  };

  const addAdultHandle = (id) => {
    dispatchData({ type: 'add-adult', id });
  };

  const removeAdultHandle = (id) => {
    dispatchData({ type: 'remove-adult', id });
  };

  const addChildHandle = (id) => {
    dispatchData({ type: 'add-child', id });
  };

  const removeChildHandle = (id) => {
    dispatchData({ type: 'remove-child', id });
  };

  const closeActivitiesHandle = () => {
    dispatchData({ type: 'CloseAll' });
  };

  const showQuickOptionsHandle = () => {
    dispatchData({ type: 'QuickOptions' });
  };

  const dataContext = {
    rooms: data.rooms,
    totalRooms: data.totalRooms,
    totalAdults: data.totalAdults,
    totalChildren: data.totalChildren,
    roomEditorVisible: data.roomEditorVisible,
    addRoomEditorVisible: data.addRoomEditorVisible,
    roomAdd: roomHandler,
    roomEditorToggle: roomEditorHandle,
    quickSelect: quickSelectHandle,
    roomRemove: roomRemoveHandle,
    addAdult: addAdultHandle,
    removeAdult: removeAdultHandle,
    addChild: addChildHandle,
    removeChild: removeChildHandle,
    closeActivities: closeActivitiesHandle,
    showQuickOptions: showQuickOptionsHandle,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
