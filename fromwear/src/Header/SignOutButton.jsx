import React from 'react'
import {Auth} from "aws-amplify";
import Button from '@mui/material/Button';

function SignOutButton() {
    const signOut = (e) => {
        e.preventDefault();
        Auth.signOut().then(()=>{
            window.location.href="/"; 
        });
    }
    return (
        <Button 
        style={{color: "black", fontSize:13,padding:0}}
        onClick={signOut}>
            로그아웃
        </Button>
    )
}

export default SignOutButton;