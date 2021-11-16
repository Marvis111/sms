import { EVENTFORM, TOGGLESIDEBAR,NEWTEACHER,NEWCLASS,NEWSTUDENT } from "../action/actionType";
const initSideBarState = false
export const sideBarReducer = (state=initSideBarState,action) =>{
    switch (action.type) {
        case TOGGLESIDEBAR:
            return action.payload
            break;
        default:
            return state
            break;
    }
}

//event form...
const initialnewEventDetails = {
    ETitle:'',
    EType:'',
    EDate:'',
}
export const newEventReducer = (state = initialnewEventDetails,action) =>{
    switch (action.type) {
        case EVENTFORM:
            return action.payload
            break;
        default:
            return state;
            break;
    }
}
//new techer
const initialNewTeacherDetails = {
    FName:'',
    LName:"",
    MName:"",
    EAddress:'',
    PNumber:'',
    HomeAddress:'',
    HQualification:"",
    SDate:'',
}
export const newTeacher = (state = initialNewTeacherDetails,action)=>{
    switch (action.type) {
        case NEWTEACHER:
                return {
                    ...state,
                    ...action.payload
                };
            break;
        default:
            return state;
            break;
    }
}
//neW class
const initialNewClassDetails = {
    CName:"",
    CCategory:"",
    CQuotes :"",
    ClassTeacher:"",
    AssistantClassTeacher:""
}
export const newClass = (state=initialNewClassDetails,action) =>{
    switch (action.type) {
        case NEWCLASS :
            return{
                ...state,
                ...action.payload
            }
            break;
        default:
            return state
            break;
    }
}
//new students
const initialStudentDet = {
    FNames:"",
    EAddress:"",
    Gender:"",
    ParentsName:"",
    ParentsNo:"",
}
export const newStudent = (state = initialStudentDet,action) =>{
    switch (action.type) {
        case NEWSTUDENT:
            return{
                ...state,
                ...action.payload
            }
            break;
        default:
            return state
            break;
    }
}