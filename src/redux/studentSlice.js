import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: JSON.parse(localStorage.getItem('students')) || [],
    sort: 'asc',
    searchTerm: '',
    category: '',
};

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload);
            localStorage.setItem('students', JSON.stringify(state.students));
        },
        updateStudent: (state, action) => {
            const index = state.students.findIndex(student => student.id === action.payload.id);
            if (index !== -1) {
                state.students[index] = action.payload;
                localStorage.setItem('students', JSON.stringify(state.students));
            }
        },
        deleteStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload);
            localStorage.setItem('students', JSON.stringify(state.students));
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        filterByCategory: (state, action) => {
            const originalData = JSON.parse(localStorage.getItem('students')) || [];
            state.students = action.payload === 'all' 
                ? originalData 
                : originalData.filter(item => item.sub === action.payload);
        }
    }
});

export const { 
    addStudent, 
    updateStudent, 
    deleteStudent, 
    setSort, 
    setSearchTerm, 
    setCategory,
    filterByCategory
} = studentSlice.actions;

export default studentSlice.reducer; 