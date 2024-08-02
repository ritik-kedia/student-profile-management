import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileDetails from './components/ProfileDetails';
import ProfileEdit from './components/ProfileEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProfileDetails />} />
          <Route path="/edit" element={<ProfileEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
