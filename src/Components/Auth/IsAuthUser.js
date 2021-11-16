
import axios from "../config/axios";
import {Route} from 'react-router-dom'
import Auth from "./Auth";
import { Redirect, useHistory } from "react-router";
import { useState } from "react";
const IsAuthUser =({component:Component,...rest})=>{
    const history = useHistory();
    const token = localStorage.getItem('token');
    const Category = localStorage.getItem('Category');
    const [Authenticated,setAuth] = useState(false)
    if(token != null || token != undefined){
         axios({
             url:"/checkuser",
             method:"POST",
             data:{Category},
             headers:{
                 'x-auth-token':token
             }
         }).then(res =>{
                if (res.data.success == true){
                    Auth.Login(res.data.authUser,()=>{
                        setAuth(true)
                        console.log(res)
                    })
                }else{
                    setAuth(false)
                }
               
         }).catch(err=>{
             console.log(err.message)
             setAuth(false)
         })
        
    }else{
        setAuth(false)
    }
    return (
        <Route {...rest}  render ={props =>{
            if(Authenticated){
                return (<Redirect to='/admin/dashboard' />)
            }else{
                return <Component {...props} />
            }
        }} />
    );;
}

export default IsAuthUser