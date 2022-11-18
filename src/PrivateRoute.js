import React from 'react';
import { Navigate } from 'react-router-dom';
import { Topheader } from './Header/Topheader';
import { Sideheader } from './Header/Sideheader';
const PrivateRoute = ({ children}) => (
    <div className="">
        {!localStorage.getItem('user-info') ? <Navigate  to="/" /> : 
        <>
        <Topheader/>
        <Sideheader/>
            <div className='contentView'>
                {children}
            </div>
        </>
        }
    </div>
)
export default PrivateRoute;