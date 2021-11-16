import React, { useState,useEffect } from 'react';
import "../../assets/css/teachers.css";
import {Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NewTeacherAction } from "../Redux/action/userAction";
import { connect } from "react-redux";
import axios from '../config/axios'
import { Spinner } from 'reactstrap';
const TeacherMain  = function({NewTeacherAction,newTeacher}){
    const [delId,setDelId] = useState();
    const [delStatus,setDelStatus] = useState({})
    const [activeTab,setActiveTab] = useState(1);
    const [preload,setPreload] = useState(false);
    const [newTeacherSuccess,setNewTeacherSuccess] = useState();
    const [allTeachers,setAllTeachers] = useState([]);
    const clickedTab = e =>{
        const navLinks = document.querySelectorAll(".navlinks");
        navLinks.forEach((navlink)=>{
            navlink.classList.remove('active');
            e.target.classList.add('active');
        })
    }
    //initialize new teacher field
   const  intializeNewTeacherField = () =>{
     const inputs = document.querySelectorAll('.form-control')
    inputs.forEach(input =>{
        const inputDetails = {
            [input.name]:""
        }
        NewTeacherAction(inputDetails);
    })
    }
    //newteacherinput
    const onChangeTeacherInput = e =>{
        const inputDetails = {
            [e.target.name]:e.target.value
        }
        NewTeacherAction(inputDetails);
    }
    //new teacher form 
    const submitNewTeacher = async e =>{
        setPreload(true);
        e.preventDefault();
        try {
            const res = await axios.post('/newteacher',newTeacher,);
            if(res.data.success === true){
                setPreload(false);
                setNewTeacherSuccess(true);
                intializeNewTeacherField();
            }

        } catch (error) {
            setNewTeacherSuccess(false);
        }

    }
     const deleteTeacher = async e =>{
         e.preventDefault();
         const teacherId = e.target.childNodes[0].value;
         try {
            const res = await axios.delete(`/delteacher/${teacherId}`);
            setDelId(e.target.id);
            setDelStatus(res.data);
         } catch (error) {
             setDelStatus({success:false,message:'Error: '+error.message});
         }

     }
    useEffect(()=>{
        const dds = document.querySelectorAll('.custom-dropDown');
        dds.forEach(dd=>{
            dd.style.display = 'none !important';
        });

        async function FetchAllTeachers(){
            try {
                const res = await axios.post('/allteachers');
                setAllTeachers(res.data);
            } catch (error) {
                setAllTeachers([]);
            }
        }
        FetchAllTeachers();

    },[newTeacherSuccess,delId])

    return(
        <React.Fragment>
            <div className='teacher-main'>
            <ul class="breadcrumb">
                <li class="breadcrumb-item">Home</li>
                <li class="breadcrumb-item"><a href="#">Teachers</a></li>
            </ul>
                <div className='navtabs'>
                <Nav tabs>
                    <NavItem >
                        <NavLink href='#1' className='navlinks' active onClick ={(e)=>{
                            clickedTab(e);
                            setActiveTab(1);
                        }} >New Teacher</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink  href='#2' className='navlinks' onClick ={(e)=>{
                            clickedTab(e);
                            setActiveTab(2);
                        }} >All Teacher</NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={activeTab} className='tabcontent'>
                    <TabPane  tabId={1} className='navPane'>
                    <div className='newFomr' >
                            <span>New Teacher</span>
                        </div>
                    <form className='new-teacher-form' method='POST'  onSubmit={e=>{
                        submitNewTeacher(e);
                    }}>
                                {
                    newTeacherSuccess == true ?
                    <div className='alert alert-success' style={{
                        width:"75% !important"
                    }}>
                         <strong>A new Teacher Successfully Added.</strong>
                    </div> :
                             ""
                                }


                       <div className='form-inputs'>
                           <input type="text" className="form-control" id="firstName" placeholder='First Name' name='FName'
                           onChange={e=>{
                               onChangeTeacherInput(e);
                           }} value={newTeacher.FName}
                           required />
                       </div>
                       <div className='form-inputs'>
                           <input type="text" className="form-control" id="lastname" placeholder='Last Name' name='LName' onChange={e=>{
                               onChangeTeacherInput(e);
                           }}  value={newTeacher.LName} required />
                       </div>
                       <div className='form-inputs'>
                           <input type="text" className="form-control" id="midname" placeholder='Middle Name' name='MName'onChange={e=>{
                               onChangeTeacherInput(e);
                           }} />
                       </div>
                       <div className='form-inputs'>
                           <input type='email' className="form-control" id="emailAddress" onChange={e=>{
                               onChangeTeacherInput(e);
                           }}  value={newTeacher.EAddress} placeholder='Email Address' name='EAddress'/>
                       </div>
                       <div className='form-inputs'>
                           <input type='tel' className="form-control" id="PhoneNumber" onChange={e=>{
                               onChangeTeacherInput(e);
                           }} placeholder='Phone Number'  value={newTeacher.PNumber} name='PNumber' required/>
                       </div>
                       <div className='form-inputs'>
                       <textarea class="form-control" placeholder='Home Address'  value={newTeacher.HomeAddress} onChange={e=>{
                               onChangeTeacherInput(e);
                           }} id="address" name="HomeAddress" required></textarea>
                       </div>
                       <div className='form-inputs'>
                        <select class="form-control" id="sel1" name='HQualification'  value={newTeacher.HQualification} onChange={e=>{
                               onChangeTeacherInput(e);
                           }}>
                             <option value={null}>Select Highest Qualification</option>
                             <option value='OND'>O.N.D</option>
                             <option value='HND'>HND</option>
                             <option value='Associate Degree'>Associate Degree</option>
                            <option value='BSC'>B Sc.</option>
                            <option value='MS'>M Sc.</option>
                        </select>
                       </div>
                    
                       <div className='form-inputs' id='startDate'>
                       <input type='date' className='form-control' onChange={e=>{
                               onChangeTeacherInput(e);
                           }} placeholder='Start Date' name='SDate'  value={newTeacher.SDate} />
                       </div>

                       <div className='form-inputs'>
                       <button type='submit' className='btn btn-primary' >
                       { preload ? <Spinner size="sm"  /> : "Submit" }
                       </button>
                       </div>

                    </form>
                    </TabPane>

                    <TabPane tabId={2} className='navPane' >
                        {
                            delStatus.success === true ?
                            <div className='alert alert-success'>
                                <strong>{delStatus.message}</strong>
                            </div>:""
                        }
                        
    <table className="table table-bordered">
        <thead>
        <tr>
            <th>S/N</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
        </tr>
        </thead>
        <tbody>
            {
                allTeachers.map((teacher,i) =>{
                    return(
                            <tr key={teacher._id}>
                                <td> {i + 1} </td>
                            <td> {teacher.FName} </td>
                            <td> {teacher.LName} </td>
                            <td> {teacher.EAddress} </td>
                            <td> {teacher.PNumber} </td>
                            <td>
                                <button type="button" class="btn btn-warning " >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <form method='POST' id={'del-'+teacher._id} onSubmit={(e)=>{
                                    deleteTeacher(e);
                                }} action="">
                                <input type='hidden' name='TeacherId' value={teacher._id} />
                                <button type="submit" class="btn btn-danger" >
                                    Delete
                                </button>
                                </form>
                            </td>
                        
                        </tr>
                    )
                })

            }
        </tbody>
  </table>
                    </TabPane>

                </TabContent>


                </div>
            
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = ({newTeacher})=>({
        newTeacher
})

export default connect(mapStateToProps,{NewTeacherAction})(TeacherMain)