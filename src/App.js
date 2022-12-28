import logo from './logo.svg';
import React from 'react';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.min.css';
import './assets/plugins/fontawesome/css/all.min.css';
import './assets/css/line-awesome.min.css';
import './assets/css/material.css';
import './assets/css/material.css';
import './assets/css/style.css';
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
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import ForgotPassword from './Login/ForgotPassword';
import Register from './Login/register';
import Dashboard from './components/Dashboard/dashboard';
import LeaveType from './components/LeaveManagement/leaveType';
import LeavesAssign from './components/LeaveManagement/LeavesAssign';
import LeavesList from './components/LeaveManagement/Leaves';
import 'bootstrap/dist/js/bootstrap.bundle'
import UserRoles from './components/settings/userRoles';
import AllEmployees from './components/Employee/AllEmployes';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/department' element={<PrivateRoute><Department /></PrivateRoute>} />
          <Route path='/leavetype' element={<PrivateRoute><LeaveType /></PrivateRoute>} />
          <Route path='/Leavessssign' element={<PrivateRoute><LeavesAssign /></PrivateRoute>} />
          <Route path='/leaves' element={<PrivateRoute><LeavesList /></PrivateRoute>} />
          <Route path='/designation' element={<PrivateRoute><Designation /></PrivateRoute>} />
          <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path='/projects' element={<PrivateRoute><Projects /></PrivateRoute>} />
          <Route path='/AllEmployes' element={<PrivateRoute><AllEmployees /></PrivateRoute>} />
          <Route path='/calender' element={<PrivateRoute><TimelineResource /></PrivateRoute>} />
          <Route exact path="/linkedin" element={<LinkedInCallback/>} />
          <Route path='/meetings' element={<PrivateRoute><Meetings /></PrivateRoute>} />
          <Route path='/googleSingup' element={<PrivateRoute><GoogleSingup /></PrivateRoute>} />
          <Route path='/project/:id' element={<PrivateRoute><SingleProject /></PrivateRoute>} />
          <Route path='/userroles' element={<PrivateRoute><UserRoles /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
