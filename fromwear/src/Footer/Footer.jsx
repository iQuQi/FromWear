import * as React from 'react';
import {Component} from 'react';
import './Footer.css'
import logo from './image/logo.png';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
class Footer extends Component{
	constructor(){
		super();
		this.state = {
			
		}
	}


	render(){
		return (
        <div className="footer_div">
            <div className ="footer_wrap">            
                <img className="footer_img" src={logo} alt="로고" />
                <p className="fromwear_typ">FROMWEAR</p>
                <Stack 
                direction="row"  
                spacing={3} 
                justifyContent="center"
                style={{paddingTop:20,color: "white"}}
                divider={<Divider style={{color:"white"}} orientation="vertical" flexItem />}>
                    <a href="/">메인 페이지</a>
                    <a href="/todayboard">오늘의 착장</a>
                    <a href="/sosboard">도움이 필요해</a>
                    <a href="weeklytag">이번주 태그</a>
                </Stack>
            </div>
		</div>
        )
	}	
}




export default Footer;
