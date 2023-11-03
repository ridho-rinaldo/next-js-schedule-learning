import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    list: [],
};

const classScheduleSlice = createSlice({
    name: 'classSchedule',
    initialState,
    reducers: {
        setListClassSchedule(state, action) {
            state.list = action.payload.list_class_schedule;
        },
    },
});

export const { setListClassSchedule } = classScheduleSlice.actions;

const classScheduleReducer = classScheduleSlice.reducer;
export default classScheduleReducer;