import * as React from 'react';
import './TopMenu.css';

export default function TopMenu({pos, wid}) {
    return(
        <div id='lnbMenu' className='lnb_menu'>
            <ul>
                <li>
                    <a href='/'>
                        프롬웨어             
                    </a>
                </li>
                <li>
                    <a href='/'>
                        오늘의 착장               
                    </a>
                </li>
                <li>
                    <a href='/'>
                        도움이 필요해              
                    </a>
                </li>
                <li>
                    <a href='/'>
                        이번주 태그  
                    </a>
                </li>
            </ul>
            <span className='bg_on' style={{left: pos, width: wid}}></span>
        </div>
    )
    
}

