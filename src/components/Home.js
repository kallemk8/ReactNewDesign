import React, { Fragment, useState } from 'react';
import { Heading } from './Heading';
import { Employeelist } from './Employeelist';
import { Topheader } from '../Header/Topheader';
import { Sideheader } from '../Header/Sideheader';

export const Home = () => {
    const [size, setSize] = useState(false);
    const handlechange = () => {
        setSize(!size);
    }
    return (
        <Fragment>
            <div className="App">
                <div className="container mx-auto">
                    <h3 className="text-center  text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">CRUD with React Context API and Hooks</h3>
                    <Heading />
                    <Employeelist />
                </div>
            </div>
        </Fragment>
    )
}