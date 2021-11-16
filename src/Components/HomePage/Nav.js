import React from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
export default function Nav(){
    return (
        <React.Fragment>
            <nav className='nav' style={{width:'100vw'}}>
                    <div className='site-name'>
                        <Link to = '/'><span>pstudy</span></Link>
                    </div>
                    <div className='nav-links'>
                        <ul>
                    
                            <li><Link to='/news'><i><Icon.Person/></i>News</Link></li>
                            <li><Link to='/login'><i><Icon.People/></i>Login</Link></li>
                        </ul>
                    </div>
                </nav>
        </React.Fragment>
    )
}