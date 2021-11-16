import React, { useEffect, } from 'react'
import {useParams} from 'react-router-dom'
import AuthNav from '../HomePage/AuthNav'
import {connect} from 'react-redux'

function Student(props){
    const {hey} = useParams();
    useEffect(()=>{
     

    },[])
    return(
        <React.Fragment>
            <AuthNav />
            <div className='mainBody' style={props.toggleSideBar?
            {width:"100vw !important",height:'auto !important',paddingBottom:'40px !important',left:'0',right:"0",
            justifyContent:"center !important",
            alignItems:"center !important",textAlign:"center"}
            :{width:"calc(100vw - 250px) !important",left:"200px",right:'0',height:'auto !important',paddingBottom:'40px !important'}}>
                <React.Fragment>











                </React.Fragment>
            </div>           
        </React.Fragment>
    )

}
const mapStateToProps = ({
    toggleSideBar,
  }) =>({
    toggleSideBar
    
  })

export default connect(mapStateToProps,{})(Student)