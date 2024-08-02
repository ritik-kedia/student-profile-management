import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import studentReducer from './features/student/studentSlice';
import { studentSaga } from './features/student/studentSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(studentSaga);

export default store;
