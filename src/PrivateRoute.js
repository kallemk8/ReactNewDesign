import React from 'react';
import { Navigate } from 'react-router-dom';
import SideHeader from './components/header/SideHeader';
import TopHeader from './components/header/TopHeader';

const PrivateRoute = ({ children}) => (
    <div className="">
        {!localStorage.getItem('user-info') ? <Navigate  to="/" /> : 
        <>   
        <div className='main-wrapper'>
            <TopHeader></TopHeader>
            <SideHeader></SideHeader>
            <div className="page-wrapper">
                {children}
            </div>
        </div>
        </>
        }
    </div>
)
export default PrivateRoute