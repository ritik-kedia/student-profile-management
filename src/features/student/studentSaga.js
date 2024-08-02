import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchStudentSuccess,
  fetchStudentFailure,
  updateStudentSuccess,
  updateStudentFailure
} from './studentSlice';

// Function to get student data from local storage
function getStudentFromLocalStorage() {
  try {
    const studentData = localStorage.getItem('student');
    return studentData ? JSON.parse(studentData) : {
      personalInfo: { name: '', age: '', email: '', contactNumber: '' },
      educationHistory: [],
      enrolledCourses: []
    };
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return {
      personalInfo: { name: '', age: '', email: '', contactNumber: '' },
      educationHistory: [],
      enrolledCourses: []
    };
  }
}

// Function to save student data to local storage
function saveStudentToLocalStorage(student) {
  try {
    localStorage.setItem('student', JSON.stringify(student));
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
}

// Saga to handle fetching student data
function* fetchStudent() {
  try {
    const studentData = yield call(getStudentFromLocalStorage);
    yield put(fetchStudentSuccess(studentData));
  } catch (error) {
    yield put(fetchStudentFailure(error.toString()));
  }
}

// Saga to handle updating student data
function* updateStudent(action) {
  try {
    yield call(saveStudentToLocalStorage, action.payload);
    yield put(updateStudentSuccess(action.payload));
  } catch (error) {
    yield put(updateStudentFailure(error.toString()));
  }
}

// Watcher saga
export function* studentSaga() {
  yield takeEvery('student/fetchStudentRequest', fetchStudent);
  yield takeEvery('student/updateStudentRequest', updateStudent);
}
