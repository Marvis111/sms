import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import '../../assets/css/dashboard.css';
import {List,CaretDown,House,
  Person,PeopleFill,Book } 
from 'react-bootstrap-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'
import {ToggleSideBar} from '../Redux/action/userAction'
import {Navbar,Nav,NavbarBrand,NavbarToggler,NavItem,Collapse} from 'reactstrap';


const AuthNav = function(props){
    const [isOpen,setIsOpen] = useState(false);
    const [sideBar,setSideBar] = useState(false);
    
    const userNavItems = category =>{
      switch (category) {
        case 'admins':
          return (
          <React.Fragment>
           <li className="list-group-item "><span><House /></span> <Link to='/admin/'>Dashboard</Link></li>
          <li className="list-group-item "><span><Person /></span><Link to='/admin/teachers'>Teachers</Link></li>
          <li className="list-group-item "><span><PeopleFill /></span> <Link to='/admin/students'>Students</Link></li>
          <li className="list-group-item "><span><Book /></span> <Link to='/admin/classes'>Class</Link></li>
          </React.Fragment>
          )
          break;
        case 'teachers':
          return (
            <React.Fragment>
             <li className="list-group-item "><span><House /></span> <Link to='/teacher/'>Dashboard</Link></li>
            <li className="list-group-item "><span><PeopleFill /></span> <Link to='/teacher/students'>Students</Link></li>
            <li className="list-group-item "><span><Book /></span> <Link to='/teacher/classes'>Class</Link></li>
            </React.Fragment>
            )
          break
      
        default:
          break;
      }
    }
    useEffect(()=>{

  })
    
    return(
        <React.Fragment>
          <Navbar className="navbar navbar-expand-sm bg-light" style={{width:'100vw',height:'80px !important',justifyContent:"space-between !important"}}>

            <NavbarBrand className='text-primary'style={{display:"flex",flexDirection:"row !important"}}> 
            <div className='toggleNav' onClick={()=>{
                setSideBar(!sideBar);
                props.ToggleSideBar(!props.toggleSideBar);
            }} style={{marginRight:'10px'}}>
                <List />
            </div>
            pstudy </NavbarBrand>
            
          <NavbarToggler className='navbar-toggler-right' onClick={()=>{
              setIsOpen(!isOpen);
          }}>
              <List />
          </NavbarToggler>
          <Collapse navbar className='navbar-collapse navCol justify-content-right' style={{
              float:'right !important',
          }} isOpen={isOpen}>
          <Nav className='justify-content-right navContainer' navbar style={{
              float:'right !important',
          }}>
            <NavItem className='nav-items'>
            <a className="nav-link text-primary" href="#">{sessionStorage.getItem('Name')} <CaretDown/> </a> 
            </NavItem>
            <NavItem className='nav-items'>
            <button type="button" className="btn btn-primary btn-sm" >
                 Notifications <span className="badge badge-light">4</span>
            </button>
            </NavItem>
          </Nav>
          </Collapse>
          </Navbar>
          {/*side bar */}
          <div className='side-bar ' style={{left:`${sideBar?'-200px':'0'}`}}>
          <ul className="list-group">
           {
             userNavItems(localStorage.getItem('Category'))
             /** <li className="list-group-item "><span><House /></span> <Link to='/admin/'>Dashboard</Link></li>
            <li className="list-group-item "><span><Person /></span><Link to='/admin/teachers'>Teachers</Link></li>
            <li className="list-group-item "><span><PeopleFill /></span> <Link to='/admin/students'>Students</Link></li>
            <li className="list-group-item "><span><Book /></span> <Link to='/admin/classes'>Class</Link></li> */
           }
        </ul>
          </div>

        </React.Fragment>
    )
}
const mapStateToProps = ({
  toggleSideBar,
}) =>({
  toggleSideBar
})
export default connect(mapStateToProps,{ToggleSideBar,})(AuthNav)