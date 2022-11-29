import React from 'react';
import { Link } from 'react-router-dom';
export const Sideheader = (props) => {
    return (
        <>
            {!props.view  ?
            <aside className='side-navigation' >
                <div className='app-logo'>
                    <h4>Sreekanth</h4>
                    <small>Web Developer</small>
                </div>
                <hr/>

                <div className='url-navigation'>
                    <ul>
                        <li><a href="#"><i className="bi bi-speedometer"></i> Dashboard</a></li>
                        <li><Link to="/department"><i className="fa fa-home" ></i> Department</Link></li>
                        <li><Link to="/designation"><i className="fa fa-user" ></i>  Designation</Link></li>
                        <li><Link to="/users"><i className="fa fa-user" ></i> Users</Link></li>
                        <li><Link to="/projects"><i className="fa fa-user" ></i> Projects</Link></li>
                        <li><Link to="/calender"><i className="fa fa-user" ></i> Calendar</Link></li>
                        <li><Link to="/meetings"><i className="fa fa-user" ></i> Meetings</Link></li>
                        <li><a href="#"><i className="fa fa-user" ></i> User</a></li>

                    </ul>

                </div>
            </aside>
            : <aside className='small-navigation' >
                <div className='app-logo'>
                    <h4>S</h4>
                </div>
                <hr/>

                <div className='url-navigation'>
                    <ul>
                        <li><a href="#"><i className="fa-sharp fa-solid fa-house"></i> D</a></li>
                        <li><a href="#"><i className="fa fa-home" ></i> H</a></li>
                        <li><a href="#"><i className="fa fa-user" ></i>  E</a></li>
                        <li><a href="#"><i className="fa fa-user" ></i> D</a></li>
                        <li><a href="#"><i className="fa fa-user" ></i> P</a></li>
                        <li><a href="#"><i className="fa fa-user" ></i> U</a></li>

                    </ul>

                </div>
            </aside> }
        </>
    )
}