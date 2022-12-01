import React, {useEffect, useState} from "react";
import './google.css'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import FacebookLogin from 'react-facebook-login';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'

import GitHubLogin from 'react-github-login';
 
const GoogleSingup = () => {
    const componentClicked = (data) =>{
        console.log(data)
    }
const responseFacebook = (response) => {
    console.log(response);
  }
    const [details, setDetails] = useState();
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

      const { linkedInLogin } = useLinkedIn({
        clientId: '86au6cppuz039p',
        redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: async (code) => {
            //var decoded =  jwt_decode(code);
          console.log(code);
            var formdata = new FormData();
            formdata.append('grant_type', "client_credentials")
           // formdata.append("code", code)
            formdata.append("client_id", "86au6cppuz039p")
            formdata.append("client_secret", "sOtt3k3pfqlmWB3L")
        //    formdata.append("redirect_uri", `${window.location.origin}/linkedin`)

          const res = await axios.get('https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=86au6cppuz039p&client_secret=sOtt3k3pfqlmWB3L&code='+code+'&redirect_uri=http://localhost:3001/linkedin', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3001",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Access-Control-Allow-Headers": "X-Requested-With,content-type",
                "Access-Control-Allow-Credentials": true,
            },
          })
        console.log(res)
        if(res.data.access_token){
            const result = await axios.get('https://api.linkedin.com/v3/me?oauth2_access_token='+res.data.access_token, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3001",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Access-Control-Allow-Headers": "X-Requested-With,content-type",
                "Access-Control-Allow-Credentials": true,
            },
          })
          console.log(result)
        }
        },
        onError: (error) => {
          console.log(error);
        },
      });


      const onSuccessgithub = response => console.log(response);
const onFailuregithub = response => console.error(response);
 
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
            <br/><br/><br/><br/>
            <img
      onClick={linkedInLogin}
      src={linkedin}
      alt="Sign in with Linked In"
      style={{ maxWidth: '180px', cursor: 'pointer' }}
    />
<br/>
<br/><br/><br/>
<FacebookLogin
    appId="811355670163601"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />


<GitHubLogin clientId="7c0c99ae74fc11717d0f"
    onSuccess={onSuccessgithub}
    onFailure={onFailuregithub}/>
        </>

  

    )
}

export default GoogleSingup;