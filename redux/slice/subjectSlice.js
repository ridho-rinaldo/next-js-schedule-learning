import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    list: [],
    dropdownList: []
};

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        setListSubject(state, action) {
            state.list = action.payload.list_subject;
        },
        setSubjectDropdown(state, action) {
            state.dropdownList = action.payload.data;
        },
    },
});

export const { setListSubject, setSubjectDropdown} = subjectSlice.actions;

const subjectReducer = subjectSlice.reducer;
export default subjectReducer;