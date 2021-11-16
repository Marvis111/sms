import React,{useEffect, useState} from 'react'
import {Nav,NavItem,NavLink,TabContent,TabPane} from 'reactstrap'
import { Modal,ModalBody,ModalHeader, Spinner
} from "reactstrap";
import { Archive,Trash, } from "react-bootstrap-icons";
import {connect} from 'react-redux'
import {NewClassAction }from '../Redux/action/userAction'
import '../../assets/css/classes.css'
import axios from '../config/axios';
const ClassMain = function({newClass,NewClassAction}){
    const [openModal,setOpenModal] = useState(false);
    const [activeTab,setActiveTab] = useState(1);
    const [allTeachers, setAllTeachers] = useState([]);
    const [preload,setPreload] = useState(false);
    const [newClassSuccess,setNewClassSuccess] = useState({});
    const [allClasses,setAllClasses] = useState([]);
    //
    const  intializeClassField = () =>{
        const inputs = document.querySelectorAll('.form-control')
       inputs.forEach(input =>{
           const inputDetails = {
               [input.name]:""
           }
           NewClassAction(inputDetails);
       })
       }

    const clickedTab = e =>{
        const navLinks = document.querySelectorAll(".navlinks");
        navLinks.forEach((navlink)=>{
            navlink.classList.remove('active');
            e.target.classList.add('active');
        })
    }
    //sbmit
    const submitNewClassForm = async e =>{
        e.preventDefault();
        setPreload(true);
        try {
            const res = await axios.post('/newclass',newClass);
            setNewClassSuccess(res.data)
            
            console.log(res.data);
        } catch (error) {
            setNewClassSuccess(false);
        }
        setPreload(false);
        intializeClassField();

    }
    //new class
    const onChangeNewClassInput = e =>{
        const inputDetails = {
            [e.target.name]:e.target.value
        }
        NewClassAction(inputDetails);
    }
    useEffect(()=>{
        async function FetchAllClasses(){
            try {
                const classes = await axios.get('/allclasses');
                setAllClasses(classes.data);
            } catch (error) {
                console.log(error);
                setAllClasses(allClasses);
            }
        }
        async function FetchAllTeachers(){
            try{
                const teachers = await axios.post('/allteachers');
                setAllTeachers(teachers.data);
            } catch(err){
                setAllTeachers([]);
            }
        }
        FetchAllClasses();
        FetchAllTeachers();
    },[preload])
    return(
        <React.Fragment>
            <div className='class-main'>
                <div className='navtabs'>
                <Nav tabs>
                    <NavItem >
                        <NavLink href='#1' className='navlinks' active onClick ={(e)=>{
                            clickedTab(e);
                            setActiveTab(1);
                        }} >All Classes</NavLink>
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
                                <input type='search' placeholder='Search For A class' className='form-control'></input>
                            </form>
                            </div>
                            <div class="col-sm-4" style={{float:"right !important",alignContent:"right !important"}} >
                            <button type="button" 
                                className="btn btn-outline-primary" style={{float:"right !important",
                                alignContent:"right !important"}}  onClick={()=>{
                                    setOpenModal(!openModal)
                                }}>Add New Class</button>
                            </div>
                        </div>
                    </div>
                    <Modal fade isOpen={openModal} style={{marginTop:'50px !important'}}>
                        <div class="modal-content" >
                            <ModalHeader>
                            <span class="modal-title">Add New Class</span>
                            </ModalHeader>
                            <ModalBody>
                                <form id='newClass' onSubmit={(e)=>{
                                    submitNewClassForm(e);
                                }} >
                                    {
                                        newClassSuccess.success === true?
                                        <div className='alert alert-success'><strong>{newClassSuccess.message}</strong></div>:
                                        <div className='alert alert-danger'><strong>{newClassSuccess.message}</strong></div>
                                    }
                                <div className='form-input'>
                                    <label>Class Name</label>
                                    <input type='text' className='form-control' placeholder='Class Name' name='CName' value={newClass.CName}
                                    onChange={(e)=>{
                                    onChangeNewClassInput(e);
                                    }}
                                    required></input>
                                </div>
                                <div className='form-input'>
                                    <label>Select Class Category</label>
                                    <select class="form-control" id="sel1" name='CCategory' value={newClass.CCategory} onChange={e=>{
                                        onChangeNewClassInput(e);
                                     }}>
                                    <option value={null}>None</option>
                                    <option value={'Primary'}>Primary</option>
                                    <option value={'Secondary'}>Secondary</option>
                                    </select>
                                </div>
                                <div className='form-input'>
                                    <label>Class Quote</label>
                                    <input type='text' className='form-control' placeholder='Class Quotes' name={'CQuotes'} value={newClass.CQuotes}
                                    onChange={(e)=>{
                                    onChangeNewClassInput(e);
                                    }}
                                    required/>
                                </div>
                                <div className='form-input'>
                                    <label>Select Class Teacher</label>
                                    <select class="form-control" id="sel1" name='ClassTeacher'  onChange={e=>{
                                        onChangeNewClassInput(e);
                                     }}>
                                        <option value={null}>None</option>
                                        {
                                            allTeachers.map((teacher,i)=>{
                                                return(
                                                    <option key={teacher._id} value={teacher._id} >{teacher.FName+' '+ teacher.LName }</option>
                                                )
                                            })
                                        }
                                        
                                </select>
                                </div>
                                <div className='form-input'>
                                    <label>Select Assistant Class Teacher</label>
                                    <select class="form-control" id="sel1" name='AssistantClassTeacher'  onChange={e=>{
                                        onChangeNewClassInput(e);
                                     }}>
                                        <option value={null}>None</option>
                                        {
                                            allTeachers.map((teacher,i)=>{
                                                return(
                                                    <option key={teacher._id} value={teacher._id} >{teacher.FName+' '+ teacher.LName }</option>
                                                )
                                            })
                                        }
                                        
                                </select>
                                </div>
                                <button type='submit'  className='btn btn-primary'>
                                { preload ? <Spinner size="sm"  /> : "Add Class" }</button>
                                </form>
                                
                            </ModalBody>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" style={{marginLeft:"20px !important"}} onClick={()=>{
                                    setOpenModal(!openModal)
                                }} >Close</button>
                            </div>
                        </div>
                 </Modal>
        <div className='classes'>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Class</th>
                        <th>Class Teacher</th>
                        <th>Number of Students</th>
                        <th>Class Quote</th>
                    </tr>
                </thead>
                <tbody>
                {
                    allClasses.map((classes,i)=>{
                        return(
                            <tr key={classes._id}>
                                <td>{i+1}</td>
                                <td>{classes.CName}</td>
                                <td>{classes['ClassTeachers'][0].name}</td>
                                <td>{classes['numOfStudents']}</td>
                                <td><i>{classes['CQuotes']}</i></td>
                                <td style={{display:'flex',border:'px 2px 0 0 '}} >
                                    <Trash color='red' id={classes._id} style={{cursor:"pointer",marginRight:'10px'}} xlinkTitle="Delete" onClick={()=>{  
                                    }} />
                                    <Archive style={{cursor:"pointer"}} />
                                </td>

                            </tr>
                        )
                    })
                }
                </tbody>
                </table>

         </div>
                 



                    </TabPane>

                    <TabPane tabId={2} className='navPane' >
                      <div className='row bg-light attendances'>
                        <div className='col-sm-4'>
                            <div className="class-select">
                                <span>Attendance</span>
                                <form className='search-attendance'>
                                <div className='form-input'>
                                    <label>Select Class </label>
                                    <select class="form-control" id="sel1" name='AssistantClassTeacher'  onChange={e=>{
                                        onChangeNewClassInput(e);
                                     }}>
                                        <option value={null}>None</option>
                                        {
                                            allClasses.map((classes,i)=>{
                                                return(
                                                    <option key={classes._id} value={classes._id} >{classes.CName }</option>
                                                )
                                            })
                                        }
                                        
                                </select>
                                </div>
                                <div className='form-input'>
                                    <label>Select Date </label>
                                    <input type='date' className='form-control' placeholder='Select Date'  />
                                </div>
                                <div className='form-input'>
                                    <button type="submit" className='btn btn-primary'>Search Attendance</button>
                                </div>

                                </form>
                            </div>
                        </div>
                        <div className='col-sm-8'>
                            
                        </div>
                         


                      </div>
                    </TabPane>

                </TabContent>


                </div>
            
            </div>
        </React.Fragment>
    )
}
const mapStateToProps =({newClass})=>({
    newClass
})
export default connect(mapStateToProps,{NewClassAction})(ClassMain)