import { DISTRIBUTE_ERROR, LOGIN } from "../action/actionType";

const initialLoginDetails = {
    Category:'',
    Email:'',
    Password:'',
}
export const LoginReducer = (state = initialLoginDetails,action) =>{
    switch (action.type) {
        case LOGIN:
            return action.payload
            break;
        default:
            return state;
            break;
    }
}
//
const initialErrs = {
    Category:'',
    Email:'',
    Password:""
}
export const distributeErrorReducer = (state = initialErrs,action) =>{
    switch (action.type) {
        case DISTRIBUTE_ERROR:
            return{
                ...state,
                [action.payload.FieldName]:action.payload.err
            }
            break;
    
        default:
            return state
            break;
    }
}