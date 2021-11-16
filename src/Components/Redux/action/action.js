import { DISTRIBUTE_ERROR, LOGIN,EVENTFORM } from "./actionType";


 export const userLogin = (Category,Email,Password) =>{
    return{
        type:LOGIN,
        payload:{Category:Category,Email:Email,Password:Password}
    }
}
;
export const distributeInputError = (fields)=>{
    return{
        type:DISTRIBUTE_ERROR,
        payload:fields
    }

}
export const newEvent = (ETitle,EType,EDate) =>{
    return{
        type:EVENTFORM,
        payload:{ETitle,EType,EDate}
}
}