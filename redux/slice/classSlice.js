import { createSlice } from "@reduxjs/toolkit"

// Define the initial state for the 'class' slice
export const initialState = {
    list: [], // Initial state for a list of classes
    dropdownList: [] // Initial state for a dropdown list
};

// Create a 'class' slice using createSlice
const classSlice = createSlice({
    name: 'class', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setListClass(state, action) {
            state.list = action.payload.list_class; // Set the list of classes
        },
        setClassDropdown(state, action) {
            state.dropdownList = action.payload.data; // Set the dropdown list data
        },
    },
});

// Export the action creators
export const { setListClass, setClassDropdown } = classSlice.actions;

// Export the 'class' reducer
const classReducer = classSlice.reducer;
export default classReducer;
