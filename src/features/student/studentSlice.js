import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  student: {
    personalInfo: { name: '', age: '', email: '', contactNumber: '' },
    educationHistory: [],
    enrolledCourses: []
  },
  loading: false,
  error: null
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStudentSuccess: (state, action) => {
      state.student = action.payload;
      state.loading = false;
    },
    fetchStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStudentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateStudentSuccess: (state, action) => {
      state.student = action.payload;
      state.loading = false;
    },
    updateStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchStudentRequest,
  fetchStudentSuccess,
  fetchStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFailure
} = studentSlice.actions;

export default studentSlice.reducer;