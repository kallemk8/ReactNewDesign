import React, {useEffect} from "react";
import './google.css'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
const GoogleSingup = () => {
    const login = useGoogleLogin({
        onSuccess: async tokenResponse =>{
            const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    "Authorization": `Bearer ${tokenResponse.access_token}`
                }
            })
            console.log(res.data)
        }
      });
    return (
       
        <>
            {/* google sing up with google provied */}
            {/* <GoogleLogin
            onSuccess={credentialResponse => {
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            /> */}
            {/* google sing up with custom button */}
            <button onClick={login}> Google Sing</button>
        </>

  

    )
}

export default GoogleSingup;