import { Route, useHistory } from "react-router-dom";


const ProtectedRoute = ({   component:Component,...rest}) =>{
    const history =    useHistory();
   // const tokenExpDate = localStorage.get('expiresIn');
    return (
        <Route {...rest}  render ={props =>{
            if(sessionStorage.length){
                return <Component {...props} />
            }else{
                history.push("/login");
            }
        }} />
    );;
}
export default ProtectedRoute;
