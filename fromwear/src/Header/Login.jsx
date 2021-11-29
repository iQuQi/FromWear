
import * as React from 'react';
import {Auth} from "aws-amplify";
import PopUp from './LoginPop';
import "./Header.css";
let Login = ()=>(
    <div className="login_popup">
       
        <PopUp />
    </div>
);

export default Login;