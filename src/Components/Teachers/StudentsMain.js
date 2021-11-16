import React,{useEffect, useState} from 'react'
import {Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap'
import { Modal,ModalBody,ModalHeader, Spinner
} from "reactstrap";
import {connect} from 'react-redux'
import {useParams,} from 'react-router-dom'
import '../../assets/css/classes.css'
import axios from '../config/axios';
import { NewStudentAction } from '../Redux/action/userAction';
import { Link } from 'react-router-dom';
const StudentsMain = function({NewStudentAction,newStudent}){
    const {studentId} = useParams();
    const [openModal,setOpenModal] = useState(false);
    const [activeTab,setActiveTab] = useState(1);
    const [preload,setPreload] = useState(false);
    const [teacherClass,setTeacherClass] = useState({success:false});
    const [stdId,setStdId] = useState(null);
    const [mesg,setMessage] = useState({success:false,msg:""});
    //
  

    const clickedTab = e =>{
        const navLinks = document.querySelectorAll(".navlinks");
        navLinks.forEach((navlink)=>{
            navlink.classList.remove('active');
            e.target.classList.add('active');
        })
    }
    const  intializeStudentField = () =>{
        const inputs = document.querySelectorAll('.form-control')
       inputs.forEach(input =>{
           const inputDetails = {
               [input.name]:""
           }
           NewStudentAction(inputDetails);
       })
       }
    //sbmit
    const submitNewStudent = async e =>{
        e.preventDefault();
        setPreload(true);
         var res,sus;
        const studentDetails = {...newStudent,
            Class:teacherClass['details'].CName,
            Category:teacherClass['details'].CCategory,
            classId:teacherClass['details'].classId,
            numOfStudents:teacherClass['details'].numOfStudents
        }
        try {
             res = await axios.post('/newstudent',studentDetails);
            setStdId(res.data.studentId);
            setMessage({success:true,msg:"New Student Successfully Added."});
            sus = true;
            intializeStudentField();
        } catch (error) {
            console.log(error);
            setMessage({success:false,msg:error.message});
            sus = false
        }
        setPreload(false);
        
    }
//news tudent
const onChangeNewStudentInput = e =>{
    const inputDetails = {
        [e.target.name]:e.target.value
    }
    NewStudentAction(inputDetails);
}
    useEffect(()=>{
        async function setClassDetails(){
            const classDet = await axios.get(`/teachersClass/${sessionStorage.getItem('id')}`)
            setTeacherClass(classDet.data);
        }
            setClassDetails();
    },[stdId])
    return(
        <React.Fragment>
            {studentId === undefined?
            <React.Fragment>
                <div className='class-main'>
                <React.Fragment>
                    {
                        teacherClass.success === true ?
                        <React.Fragment>
                             <div className='navtabs'>
                <Nav tabs>
                    <NavItem >
                        <NavLink href='#1' className='navlinks' active onClick ={(e)=>{
                            clickedTab(e);
                            setActiveTab(1);
                        }} >All Students</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink  href='#2' className='navlinks' onClick ={(e)=>{
                            clickedTab(e);
                            setActiveTab(2);
                        }} >Class Attendance</NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={activeTab} className='tabcontent'>
                    <TabPane  tabId={1} className='navPane'>                      
                    <div class="container-fluid">
                        <div class="row justify-content-*-between">
                            <div class="col-sm-8 " style={{marginBottom:'20px'}}>
                            <form className='search-form'>
                                <input type='search' placeholder='Search For Student' className='form-control'></input>
                            </form>
                            </div>
                            <div class="col-sm-4" style={{float:"right !important",alignContent:"right !important"}} >
                            <button type="button" 
                                className="btn btn-outline-primary" style={{float:"right !important",
                                alignContent:"right !important"}}  onClick={()=>{
                                    setOpenModal(!openModal)
                                }}>Add New Student</button>
                            </div>
                        </div>
                        <div className='alert alert-info'>
                                <strong>Number of Students : {teacherClass['details'].numOfStudents}</strong>
                        </div>
                    </div>
                    <div className='container-fluid'>
                    <Modal fade isOpen={openModal} style={{marginTop:'50px !important'}}>
                        <div class="modal-content" >
                            <ModalHeader>
                            <span class="modal-title">Add New Student</span>
                            </ModalHeader>
                            <ModalBody>
                                <form method='POST' action="" onSubmit={(e)=>{
                                    submitNewStudent(e);
                                }}>
                                    {mesg.success === true ?
                                    <div className='alert alert-success'>
                                        <strong>{mesg.msg}</strong>
                                    </div>
                                    :""
                                    
                                }
                                <div className='form-input'>
                                    <label>Student Full Name</label>
                                    <input type='text' className='form-control' placeholder='Enter Student name' name='FNames' value={newStudent.FNames}
                                    onChange={(e)=>{
                                        onChangeNewStudentInput(e)
                                    }}
                                    required/>
                                </div>
                                <div className='form-input'>
                                    <label>Email Address</label>
                                    <input type='email' className='form-control' placeholder='Enter Student Email' value={newStudent.EAddress} name='EAddress'
                                    onChange={(e)=>{
                                        onChangeNewStudentInput(e)
                                    }}
                                    required/>
                                </div>
                                <div className='form-input'>
                                    <label>Select Gender</label>
                                    <select class="form-control" id="sel1" name='Gender' value={newStudent.Gender}  onChange={e=>{
                                        onChangeNewStudentInput(e)
                                     }}>
                                        <option value={null}>None</option>
                                        <option value={'Male'}>Male</option>
                                        <option value={'Female'}>Female</option>
                                </select>
                                </div>
                                <div className='form-input'>
                                    <label>Parent's Name</label>
                                    <input type='text' className='form-control' placeholder='Parents names' name='ParentsName' value={newStudent.ParentsName}
                                    onChange={(e)=>{
                                        onChangeNewStudentInput(e)
                                    }}
                                    required/>
                                </div>
                                <div className='form-input'>
                                    <label>Parent's Number</label>
                                    <input type='tel' className='form-control' placeholder='Enter Parent Phone Number' name='ParentsNo' value={newStudent.ParentsNo}
                                    onChange={(e)=>{
                                        onChangeNewStudentInput(e)
                                    }}
                                    required/>
                                </div>
                                <div className='form-input'>
                                  <button type='submit' className='btn btn-primary'>
                                  { preload ? <Spinner size="sm"  /> : "Add Student" } </button>
                                </div>


                                </form>
                                
                                
                            </ModalBody>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" style={{marginLeft:"20px !important"}} onClick={()=>{
                                    setOpenModal(!openModal)
                                }} >Close</button>
                            </div>
                        </div>
                 </Modal>
                 {/**all students.. */}
                 <div className='info'>
                     <span className=''><strong>All students in your class: {teacherClass['details'].CName}</strong></span>
                 </div>
                 <div className='stduents'>
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>S/N</th>
                    <th>Names</th>
                    <th>Email</th>
                    <th>Gender</th>
                </tr>
                </thead>
                <tbody>
                    {
                        teacherClass['details'].classStudents.map((student,i)=>{
                            return(
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{student.FNames}</td>
                                    <td>{student.EAddress}</td>
                                    <td>{student.Gender}</td>
                                    <td style={{display:"flex !important",justifyContent:"space-between"}}>
                                        <button type='submit' className='btn btn-info'>
                                            <Link to={`/teacher/students/${student._id}`} color='white'>View</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <form>
                                        <button type='submit' className='btn btn-danger'>
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
                 </div>
                 </div>

                    </TabPane>
                    <TabPane tabId={2} className='attendance' >
                    <div className='container-fluid'>
                       <h3>HELLO</h3>

                    </div>
                      
                    </TabPane>
                </TabContent>


                </div>
                        </React.Fragment>:
                        <div className='alert alert-danger'>
                            <strong>No class has been Assigned to you.</strong>
                        </div>
                    }

                </React.Fragment>
               
            
            </div>
            </React.Fragment>:
            alert(studentId)
        }
            
        </React.Fragment>
    )
}
const mapStateToProps =({newStudent})=>({
    newStudent
})
export default connect(mapStateToProps,{NewStudentAction})(StudentsMain)