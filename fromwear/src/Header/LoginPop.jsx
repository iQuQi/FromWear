import * as React from 'react';
import {Component} from 'react';
import { withAuthenticator } from "@aws-amplify/ui-react";

let PopUp=()=>{

    window.location.reload();

    return <span>popup</span>
}

const MyTheme = {
    button: { backgroundColor: "green", borderColor: "red" },
    signInButtonIcon: { display: "none" }
  };
  

export default withAuthenticator(PopUp,false, [], null, MyTheme, {
    signUpConfig: {
      hiddenDefaults: ["phone_number"],
      signUpFields: [
        { label: "Name", key: "name", required: true, type: "string" }
      ]
    }
  });