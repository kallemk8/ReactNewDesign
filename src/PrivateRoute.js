import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SideHeader from './components/header/SideHeader';
import TopHeader from './components/header/TopHeader';

const PrivateRoute = ({ children}) => {
    const [small, setSmall] = useState(false);
    const [smallexpand, setSmallexpand] = useState(false);
    const headerShow = () => {
        setSmall(!small)
    }
    const showMenuBar = () => {
        setSmallexpand(!smallexpand)
    }
    return (<div className={small && smallexpand ? "mini-sidebar  expand-menu" : small ?  "mini-sidebar ": ""}>
        {!localStorage.getItem('user-info') ? <Navigate  to="/" /> : 
        <>   
        <div className='main-wrapper'>
            <TopHeader smallHeaderShow={headerShow}></TopHeader>
            <SideHeader showMenuBar={showMenuBar}></SideHeader>
            <div className="page-wrapper">
                {children}
            </div>
        </div>
        </>
        }
    </div>)
}
export default PrivateRoute