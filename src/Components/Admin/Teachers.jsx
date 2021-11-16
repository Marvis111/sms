import React, { useEffect } from 'react'
import AuthNav from "../HomePage/AuthNav"
import TeacherMain from './TeacherMain';
import {connect} from 'react-redux'
const Teachers =  function(props){
  useEffect(()=>{

  },[props.toggleSideBar]);
  return (
    <React.Fragment>
      <AuthNav />
      <div className='mainBody' style={props.toggleSideBar?
            {width:"100vw !important",height:'auto !important',paddingBottom:'40px !important',left:'0',right:"0",
            justifyContent:"center !important",
            alignItems:"center !important",textAlign:"center !important",alignContent:'center !important'}
            :{width:"calc(100vw - 250px) !important",left:"200px",right:'0',height:'auto !important',paddingBottom:'40px !important',
            textAlign:"center !important",alignContent:'center !important'}}>
              <TeacherMain />
            </div>            
    </React.Fragment>
  )
}
const mapStateToProps = ({
  toggleSideBar,
}) =>({
  toggleSideBar
  
})

export default connect(mapStateToProps,{})(Teachers);