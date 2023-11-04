import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the 'classSchedule' slice
export const initialState = {
    list: [], // Initial state as an empty list
};

// Create a 'classSchedule' slice using createSlice
const classScheduleSlice = createSlice({
    name: 'classSchedule', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setListClassSchedule(state, action) {
            state.list = action.payload.list_class_schedule; // Set the list of class schedules
        },
    },
});

// Export the action creator
export const { setListClassSchedule } = classScheduleSlice.actions;

// Export the 'classSchedule' reducer
const classScheduleReducer = classScheduleSlice.reducer;
export default classScheduleReducer;
