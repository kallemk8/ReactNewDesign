import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Logo from  './../assets/img/logo2.png'
const Register = (props) => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [errorMessage, seterrorMessage] = useState()
    const signIntoDashboard = async () => {
        var req = {
            "username": getValues("username"),
            "password": getValues("password")
        }
        try {
            const response = await axios.post(`http://localhost:5000/login`, req);
            if(response.data.status){

                localStorage.setItem("user-info", JSON.stringify(response.data.user));
                navigate('/department')
            }else{
                seterrorMessage(response.data.result);
            }
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <>
            <div className="account-page">
            <div className="main-wrapper">
                <div className="account-content">
                    <div className="container">

                        <div className="account-logo">
                            <a href="admin-dashboard.html"><img src={Logo} alt="Dreamguy's Technologies" /></a>
                        </div>

                        <div className="account-box">
                            <div className="account-wrapper">
                                <h3 className="account-title">Register</h3>
                                <p className="account-subtitle">Access to our dashboard</p>

                                <form onSubmit={handleSubmit(signIntoDashboard)}>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input className="form-control" type="text"  {...register("username")} />
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <label>Password</label>
                                            </div>
                                        </div>
                                        <div className="position-relative">
                                            <input className="form-control" type="password" id="password" {...register("password")} />
                                            {/* <span className="fa fa-eye-slash" id="toggle-password"></span> */}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <label>Repeat Password</label>
                                            </div>
                                        </div>
                                        <div className="position-relative">
                                            <input className="form-control" type="password" id="password" {...register("repeatpassword")} />
                                            {/* <span className="fa fa-eye-slash" id="toggle-password"></span> */}
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <button className="btn btn-primary account-btn" type="submit">Register</button>
                                    </div>
                                    <div className="account-footer">
                                        <p>Already have an account? <Link to="/">Login</Link></p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default Register;