import React, { useState } from 'react';
import './login.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const { register, handleSubmit, watch, setValue, getValues,reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
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
            }
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <>
            <div className='' style={{marginTop:"10%"}}>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#">
                            <h1>Create Account</h1>
                            {/* <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div> */}
                            {/* <span>or use your email for registration</span> */}
                            <input type="text" {...register("designation")} placeholder="Name" />
                            <input type="email" {...register("designation")} placeholder="Email" />
                            <input type="password" {...register("designation")} placeholder="Password" />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <div className='form'>
                            <h1>Sign in</h1>
                            {/* <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div> */}
                            {/* <span>or use your account</span> */}
                            <input type="email" {...register("username")} placeholder="Email" />
                            <input type="password" {...register("password")} placeholder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button onClick={()=>signIntoDashboard()}>Sign In</button>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login