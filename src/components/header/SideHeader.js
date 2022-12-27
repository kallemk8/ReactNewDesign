import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'
const SideHeader = ({showMenuBar}) => {
    const [showDashboardBTN, setShowDashboardBTN] = useState(false)
    const showDashboard = () => {
        setShowDashboardBTN(!showDashboardBTN)
    }
    const [showLeaveBTN, setShowLeaveBTN] = useState(false)
    const showLeave = () => {
        setShowLeaveBTN(!showLeaveBTN)
    }
    const [showEmployeeBTN, setShowEmployeeBTN] = useState(false)
    const showEmployee = () => {
        setShowEmployeeBTN(!showEmployeeBTN)
    }
    const [showProjectsBTN, setShowProjectsBTN] = useState(false)
    const showProjects = () => {
        setShowProjectsBTN(!showProjectsBTN)
    }

    const [showLoginsBTN, setShowLoginsBTN] = useState(false)
    const showLogins = () => {
        setShowLoginsBTN(!showLoginsBTN)
    }

    const [showProfileBTN, setShowProfileBTN] = useState(false)
    const showProfile = () => {
        setShowProfileBTN(!showProfileBTN)
    }

    
    return (<>
        <div className="sidebar" id="sidebar" onMouseOver={()=>showMenuBar()}>
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul className="list-inline-item list-unstyled links">
                        <li className="menu-title">
                            <span>Main</span>
                        </li>
                        <li className="submenu">
                            <a onClick={()=>showDashboard()}><i className="la la-ticket"></i> <span> Dashboard </span> <span className="menu-arrow"></span> </a>
                            <ul  className={showDashboardBTN ? "displayShow": "displayHide"}>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/">Login</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">
                            <span>Leave Management</span>
                        </li>
                        <li className="submenu">
                            <a onClick={()=>showLeave()}><i className="la la-dashboard"></i> <span> Leave </span> <span className="menu-arrow"></span> </a>
                            <ul  className={showLeaveBTN ? "displayShow": "displayHide"}>
                                <li><Link to="/leavetype">Leave Type</Link></li>
                                <li><Link to="/Leavessssign">Leave Assign</Link></li>
                                <li><Link to="/leaves">Apply Leave </Link></li>
                                <li><Link to="/">Leave Approve</Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">
                            <span>Employee</span>
                        </li>
                        <li className="submenu">
                            <a onClick={()=>showEmployee()}><i className="la la-user"></i> <span> Employee </span> <span className="menu-arrow"></span> </a>
                            <ul  className={showEmployeeBTN ? "displayShow": "displayHide"}>
                                <li><Link to="/users">Add Employee</Link></li>
                                <li><Link to="/users">Edit Employee</Link></li>
                                <li><Link to="/users">All Employees </Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">
                            <span>Projects</span>
                        </li>
                        <li className="submenu">
                            <a onClick={()=>showProjects()}><i className="la la-rocket"></i> <span> Projects </span> <span className="menu-arrow"></span> </a>
                            <ul  className={showProjectsBTN ? "displayShow": "displayHide"}>
                                <li><Link to="/projects">Add Project</Link></li>
                                <li><Link to="/projects">Edit Project</Link></li>
                                <li><Link to="/projects">All Tasks </Link></li>
                                <li><Link to="/meetings">All Meetings </Link></li>
                            </ul>
                        </li>

                        <li className="menu-title">
                            <span>Profile</span>
                        </li>
                        <li className="submenu">
                            <a onClick={()=>showProfile()}><i className="la la-rocket"></i> <span> Profile </span> <span className="menu-arrow"></span> </a>
                            <ul  className={showProfileBTN ? "displayShow": "displayHide"}>
                                <li><Link to="/department">Department</Link></li>
                                <li><Link to="/designation">Designation</Link></li>
                                <li><Link to="/calender">Calender</Link></li>
                                <li><Link to="/userroles">User Roles</Link></li>
                                
                            </ul>
                        </li>

                        <li className="menu-title">
                            <span>Logins</span>
                        </li>
                        <li className="submenu">
                            <a onClick={()=>showLogins()}><i className="la la-rocket"></i> <span> Logins </span> <span className="menu-arrow"></span> </a>
                            <ul  className={showLoginsBTN ? "displayShow": "displayHide"}>
                                <li><Link to="/googleSingup">Google</Link></li>
                                <li><Link to="/linkedin">Linkedin</Link></li>
                                <li><Link to="/forgotPassword">Forgot Password</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            
                                
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
    )
}

export default SideHeader;