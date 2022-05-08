
import * as React from 'react';
import {Auth} from "aws-amplify";
import PopUp from './LoginPop';
import "./Header.css";
import {Box} from "@mui/system";

const Login = ({handle_login_complete})=>(
    <Box sx={{
        width: '100%',
        height: '120%',
        position: 'fixed',
        top: '-50px',
        margin:'auto',
        zIndex: 999999,
        paddingTop: '50px',
        border: 0,
        '& .hydrated': {
            zIndex: 9999999999999999,
        },
    }} >
        <button className="login_popup" onClick={handle_login_complete} />
        <PopUp/>
    </Box>

);

export default Login;