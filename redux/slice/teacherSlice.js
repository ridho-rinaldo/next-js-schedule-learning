import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the 'teacher' slice
export const initialState = {
    list: [], // Initial state for a list of teachers
    dropdownList: [], // Initial state for a dropdown list
    unassignedList: [] // Initial state for a list of unassigned teachers
};

// Create a 'teacher' slice using createSlice
const teacherSlice = createSlice({
    name: 'teacher', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setListTeacher(state, action) {
            state.list = action.payload.list_teacher; // Set the list of teachers
        },
        setTeacherDropdown(state, action) {
            state.dropdownList = action.payload.data; // Set the dropdown list data
        },
        setUnassignedList(state, action) {
            state.unassignedList = action.payload.data; // Set the unassigned teachers list
        },
    },
});

// Export the action creators
export const { setListTeacher, setTeacherDropdown, setUnassignedList } = teacherSlice.actions;

// Export the 'teacher' reducer
const teacherReducer = teacherSlice.reducer;
export default teacherReducer;
