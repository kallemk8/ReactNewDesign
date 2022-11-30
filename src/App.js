import logo from './logo.svg';
import './App.css';
import './main.css';
import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from './Login/login'
import Department from './components/Department'
import Designation from './components/Designation'
import PrivateRoute from './PrivateRoute';
import Users from './components/users';
import Projects from './components/projects';
import SingleProject from './components/singleProject';
import TimelineResource from './components/calendar';
import Meetings from './components/meetings';
import GoogleSingup from './components/googlesingup';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/department' element={<PrivateRoute><Department /></PrivateRoute>} />
          <Route path='/designation' element={<PrivateRoute><Designation /></PrivateRoute>} />
          <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path='/projects' element={<PrivateRoute><Projects /></PrivateRoute>} />

          <Route path='/calender' element={<PrivateRoute><TimelineResource /></PrivateRoute>} />

          <Route path='/meetings' element={<PrivateRoute><Meetings /></PrivateRoute>} />
          <Route path='/googleSingup' element={<PrivateRoute><GoogleSingup /></PrivateRoute>} />
          <Route path='/project/:id' element={<PrivateRoute><SingleProject /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
