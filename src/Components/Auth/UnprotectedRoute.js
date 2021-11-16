import React from "react";
import { Route, Router, useHistory,} from "react-router-dom"


const UnprotectedRoute = ({component:Component,...rest}) =>{
    const history = useHistory();
    return(
      <Route {...rest} render ={props =>{
          if(sessionStorage.length){  
          history.goBack();
          }else{
              return <Component {...props} />
          }
      }} />
    )
}
export default UnprotectedRoute;