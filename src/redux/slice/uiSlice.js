import { createSlice } from '@reduxjs/toolkit';
import Sidebar from '../../components/Sidebar';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeComponent: 'MyVault',
    sidebarHam:'false'
  },
  reducers: {
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
    setSidebarHam: (state, action) => {
        state.sidebarHam = action.payload;
        console.log(state.sidebarHam)
      },

  },
});

export const { setActiveComponent,setSidebarHam } = uiSlice.actions;
export default uiSlice.reducer;