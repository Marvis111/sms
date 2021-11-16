import React, { useEffect, useState } from "react"
import '../../assets/css/login.css'
import { userCategory } from "../Contants";
import Nav from "../HomePage/Nav"
import { connect } from "react-redux";
import { userLogin,distributeInputError } from "../Redux/action/action";
import axios from "../config/axios";
import { Spinner } from "reactstrap";
import Auth from "../Auth/Auth";
import { useHistory } from "react-router";

function Login(props){
    const history = useHistory()
    const [preload,setPreload] = useState(false);
    const selected = e =>{
        e.preventDefault();
        props.userLogin(
            e.target.id,
            props.newLogin.Email,
            props.newLogin.Password
        )
    var categories = document.querySelectorAll('.cat-btn');
    categories.forEach(btn =>{
        btn.classList.remove('selected');
        if(btn.id == e.target.id){
            btn.classList.add('selected');
        }
    })        
    }
    const changeFieldVal = (e,Fieldname) =>{
        switch (Fieldname) {
            case 'Email':
                props.userLogin(
                    props.newLogin.Category,
                    e.target.value,
                    props.newLogin.Password
                )
                break;
            case 'Password':
                props.userLogin(
                    props.newLogin.Category,
                    props.newLogin.Email,
                    e.target.value
                );
                break;
            default:
                props.userLogin(
                    props.newLogin.Category,
                    props.newLogin.Email,
                    props.newLogin.Password
                )
                break;
        }
    }
   useEffect(()=>{
    const initialFormErr = [{FieldName:"Email",err:""},
    {FieldName:"Password",err:""},{FieldName:"Category",err:""}
    ]
    const loginForm = document.querySelector('#loginForm');
        const distributeError = errors => {
        const formInput = document.querySelectorAll('#loginForm input');
            if(errors.length >0){
            errors.forEach(error =>{
                formInput.forEach(input =>{
                    if(error.FieldName === input.name ){   
                 props.distributeInputError({FieldName:[error.FieldName],
                    err:error.err});
                    }
                })
            })
        }
        }
        loginForm.onsubmit = async (e) =>{       
            e.preventDefault();
        axios({ 
        url:"/login",
        method:'POST',
        onUploadProgress:()=>{
            setPreload(true);
        }
        ,
        data:props.newLogin
            }).then((res)=>{
                if(res.data.success === true){
                    distributeError(initialFormErr);
                  
    
                    Auth.Login( res.data.newUser,()=>{
                        switch ( res.data.newUser.Category) {
                            case 'admins':
                                history.push('/admin/dashboard');
                                break;
                            case 'teachers':
                                history.push('/teacher/dashboard');
                                break;
                            default:
                                history.push('/');
                                break;
                        }
                    })
                }else{
                   distributeError(res.data.error);
                }
                setPreload(false)
            }).catch(err=>{
                console.log(err);
            })
                setPreload(false)
        }
    return ()=>{
        return null
    }
   })
  
    return(
       
        <React.Fragment>
            <div className = 'login-page'>
                <Nav/>
            <div className='login'>

        <form id='loginForm' method='POST'> 
                <div className='logi-text'>
                    <span>Login</span>
                </div>
                <div className='form-div'>
                    <div className = 'input-group'>
                        <label>Email Address</label>
                        <input type='email' placeholder='Email Address' name='Email' onChange={(e)=>{
                            changeFieldVal(e,'Email');
                        }} value={props.newLogin.Email} />

                        <div className='form-input-error'>{props.distributeError.Email}</div>
                    </div>
                    <div className = 'input-group'>
                        <label>Password</label>
                        <input type='password' placeholder='password' name = 'Password' value={props.newLogin.Password}
                         onChange={(e)=>{
                            changeFieldVal(e,'Password');
                        }} />
                        <div className='form-input-error'>{props.distributeError.Password}</div>
                    </div>
                    <div className='form-submit'>
                    <button type='submit'>
                    { preload ? <Spinner size="sm"  /> : "Login" }
                    </button>
                </div>
                </div>
                <div className='user-category'>
                {
                    userCategory.map(users =>{
                        return (
                            <div className='users' key={users.id}>
                    <button className={`cat-btn`} id={users.ref} onClick ={(e) =>{
                        selected(e);
                    }} value={users.value}>{users.ref}</button>
                </div>
                        )
                    })
                }
                </div>
                <input type = 'hidden' name='Category' ></input>
                <div className='form-input-error' style={{    textAlign: 'center',
    fontWeight:400}}><span>{props.distributeError.Category}</span></div>
        </form>

            </div>


            </div>
        </React.Fragment>
    )
}

const mapStateToProps = ({newLogin,distributeError}) =>({
    newLogin,distributeError
})

export default  connect(mapStateToProps,{userLogin,distributeInputError})(Login);