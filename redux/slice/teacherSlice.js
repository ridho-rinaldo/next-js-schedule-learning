import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    list: [],
    dropdownList: [],
    unassignedList: []
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        setListTeacher(state, action) {
            state.list = action.payload.list_teacher;
        },
        setTeacherDropdown(state, action) {
            state.dropdownList = action.payload.data;
        },
        setUnassignedList(state, action) {
            state.unassignedList = action.payload.data;
        },
    },
});

export const { setListTeacher, setTeacherDropdown, setUnassignedList } = teacherSlice.actions;

const teacherReducer = teacherSlice.reducer;
export default teacherReducer;