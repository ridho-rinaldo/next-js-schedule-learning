import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    list: [],
    dropdownList: []
};

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        setListClass(state, action) {
            state.list = action.payload.list_class;
        },
        setClassDropdown(state, action) {
            state.dropdownList = action.payload.data;
        },
    },
});

export const { setListClass, setClassDropdown } = classSlice.actions;

const classReducer = classSlice.reducer;
export default classReducer;