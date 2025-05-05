import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissionGranted: false,
  currentLocation: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setPermissionGranted: (state, action) => {
      state.permissionGranted = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setPermissionGranted, setCurrentLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
