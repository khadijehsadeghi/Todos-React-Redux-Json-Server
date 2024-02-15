import { createSlice } from "@reduxjs/toolkit";
export const StatusFilters = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const initialState = {
  status: StatusFilters.All,
  colors: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    colorFilterChanged: {
      reducer(state, action) {
        const { colors } = state
        const { color, changeType } = action.payload
        switch (changeType) {
          case 'added':
            state.colors.push(color)
            break;
          case 'removed':
            state.colors = colors.filter(c => c !== color)

        }
      },
      prepare(color, changeType) {
        return {
          payload: {
            color,
            changeType
          }
        }
      }
    }

  },
});
export const { statusFilterChanged, colorFilterChanged } = filterSlice.actions;
export default filterSlice.reducer;

export const selectStatusFilter = state => state.filters.status
export const selectColorsFilter = state => state.filters.colors


