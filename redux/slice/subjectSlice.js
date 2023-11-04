import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the 'subject' slice
export const initialState = {
    list: [], // Initial state for a list of subjects
    dropdownList: [] // Initial state for a dropdown list
};

// Create a 'subject' slice using createSlice
const subjectSlice = createSlice({
    name: 'subject', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setListSubject(state, action) {
            state.list = action.payload.list_subject; // Set the list of subjects
        },
        setSubjectDropdown(state, action) {
            state.dropdownList = action.payload.data; // Set the dropdown list data
        },
    },
});

// Export the action creators
export const { setListSubject, setSubjectDropdown } = subjectSlice.actions;

// Export the 'subject' reducer
const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
