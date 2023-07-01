import React from 'react';

const DataContext = React.createContext({
  rooms: [{ id: 'default1', adults: 2, children: 0, childAges: [] }],
  totalRooms: 1,
  totalAdults: 2,
  totalChildren: 0,
  roomEditorVisible: false,
  addRoomEditorVisible: false,
  roomAdd: () => {},
  roomRemove: () => {},
  roomEditorToggle: () => {},
  quickSelect: (dataset) => {},
  addAdult: (id) => {},
  removeAdult: (id) => {},
  addChild: (id) => {},
  removeChild: (id) => {},
  closeActivities: () => {},
  showQuickOptions: () => {},
});

export default DataContext;
