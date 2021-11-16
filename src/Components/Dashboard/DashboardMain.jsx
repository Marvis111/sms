import React, { useEffect, useState } from "react"
import {PersonPlus} from 'react-bootstrap-icons'
import { Modal,ModalBody,ModalHeader, Spinner} from "reactstrap";
import {newEvent} from '../Redux/action/action'
import {connect} from 'react-redux';
import axios from "../config/axios";

function Dash_Main(props){
    const [openModal,setOpenModal] = useState(false);
    const [preload,setPreload] = useState(false);
    var [loadEvents,setLoadEvent] = useState([]); 
    const [eventSuccess,setEventSuccess] = useState(false);
    const eventDetails = (e,eventDetail) =>{
        switch (eventDetail) {
            case 'ETitle':
                props.newEvent(e.target.value,
                    props.Event.EType,
                    props.Event.EDate
                    )
                break;
            case 'EType':
                props.newEvent(props.Event.ETitle,
                    e.target.value,
                    props.Event.EDate
                    );
                    break;
            case 'EDate':
                props.newEvent(props.Event.ETitle,
                    props.Event.EType,
                    e.target.value
                    );
                    break;
            default:
                props.newEvent(props.Event.ETitle,
                    props.Event.EType,
                    props.Event.EDate
                    );
                break;
        }
    
    }

    const submitEvent =(e)=>{
        e.preventDefault();
            axios({
            url:"/event",
            method:'POST',
            data:props.Event,
            onUploadProgress:()=>{
                setPreload(true);
                props.newEvent("","","");
            }
        }).then(res =>{
            setPreload(false);
            setEventSuccess(true);
        }).catch(err =>{
            console.log(err);
        })
        
    } 
    useEffect(()=>{
        async function fetchEVENTS(){
            const events = await axios.post('/fetchevents',);
            setLoadEvent(events.data);
        }
        fetchEVENTS();
    },[preload])
    
 
    return(
        <React.Fragment>
            
            <div className='container-fluid' style={{width:"100% !important"}}>
            <ul class="breadcrumb">
                <li class="breadcrumb-item">Home</li>
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
            </ul>
            </div>
            <div className='jumbotron row det' style={{marginTop:'10px',borderRadius:'0 !important'}}>
                <div className='infos'>
                    <div className='info-icon'>
                        <PersonPlus />
                    </div>
                    <div className='info-desc'>
                        <h5 className='text-muted'>Students</h5>
                        <span style={{fontWeight:'bolder'}}>20</span>
                    </div>
                </div>
                <div className='infos'>
                    <div className='info-icon'>
                        <PersonPlus />
                    </div>
                    <div className='info-desc'>
                        <h5 className='text-muted'>Students</h5>
                        <span style={{fontWeight:'bolder'}}>20</span>
                    </div>
                </div>
                <div className='infos'>
                    <div className='info-icon'>
                        <PersonPlus />
                    </div>
                    <div className='info-desc'>
                        <h5 className='text-muted'>Students</h5>
                        <span style={{fontWeight:'bolder'}}>20</span>
                    </div>
                </div>
                <div className='infos'>
                    <div className='info-icon'>
                        <PersonPlus />
                    </div>
                    <div className='info-desc'>
                        <h5 className='text-muted'>Students</h5>
                        <span style={{fontWeight:'bolder'}}>20</span>
                    </div>
                </div>
                
            </div>
            <div className='events'>
                <div className='coming-evs'>
                    <span className='text-muted'>Upcoming Events</span>
                </div>
    <table className="table table-striped" style={{width:'80% !important'}}>
    <thead>
      <tr>
        <th>Event ID</th>
        <th>Event Title</th>
        <th>Type</th>
        <th>Date</th>
        {
    
            localStorage.getItem('Category') ==='admins'?
            <th>Action</th>:
            ""
        }
      </tr>
    </thead>
    <tbody>
      { 
        loadEvents.map((event,i)=>{
            return(
                <tr key={event._id}>
                    <td>{event._id}</td>
                    <td>{event.ETitle}</td>
                    <td>{event.EType}</td>
                    <td>{event.EDate}</td>
                    {
            localStorage.getItem('Category') ==='admins'?
            <td>
            <button type='button' 
            className='btn btn-danger' 
            key={i}
            >
                Delete
            </button>
        </td>:""
                    }
                    
      </tr> 
            )
        })
      /*
      
      */
}
    </tbody>
  </table>
    {
        localStorage.getItem('Category') === 'admins'?
        <button type='button' className='btn btn-primary ' style={{width:"200px !important",margin:"10px !important"}}
        onClick={()=>{
            setOpenModal(!openModal)
        }}
        >
            Add Event
        </button>:""
    }
  
  <Modal fade isOpen={openModal} style={{marginTop:'50px !important'}}>
  <div class="modal-content" >
      <ModalHeader>
      <h4 class="modal-title">Add Events</h4>
      </ModalHeader>
      <ModalBody>
          <form class='event-form' method='POST' id='eventform' onSubmit ={(e)=>{
              submitEvent(e);
          }} >
          {
              eventSuccess == true ?
              <div className='alert alert-success'>
              <strong>Event Successfully Added.</strong>
          </div> :
          ""
          }
              <div className='form-input'>
                  <label>Event Title</label>
                  <input type='text' placeholder='Enter the title of your event' value={props.Event.ETitle}
                  onChange={(e)=>{
                      eventDetails(e,'ETitle')
                  }}
                  required></input>
              </div>
              <div className='form-input'>
                  <label>Event Type</label>
                  <input type='text' placeholder='Type of your event e.g Educational, Entertainment,Q&A' value={props.Event.EType}
                  onChange={(e)=>{
                    eventDetails(e,'EType')
                }}
                  required></input>
              </div>
              <div className='form-input'>
                  <label>Event Date</label>
                  <input type='date' value={props.Event.EDate}
                  onChange={(e)=>{
                    eventDetails(e,'EDate')
                }}
                  required></input>
              </div>
              <button type="submit" class="btn btn-primary" id='submitBtn'
              style={{width:"100% !important",marginTop:'15px !important'}} >
                  { preload ? <Spinner size="sm"  /> : "Add Event" }
              </button>
          </form>
          
      </ModalBody>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" onClick={()=>{
            setOpenModal(!openModal)
        }} >Close</button>
      </div>
  </div>
  </Modal>


  
 

            </div>
            
        </React.Fragment>
    )

}
const mapStateToProps = ({Event})=>({
    Event
})
export default connect(mapStateToProps,{newEvent})(Dash_Main);