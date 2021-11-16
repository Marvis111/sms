import { NEWTEACHER, TOGGLESIDEBAR ,NEWCLASS, NEWSTUDENT} from "./actionType"

export const ToggleSideBar = (open) =>{
    return{
        type:TOGGLESIDEBAR,
        payload:open
    }
}


export const NewTeacherAction = (details) =>{
    return{
        type:NEWTEACHER,
        payload:details
    }
}
export const NewClassAction = (detail) =>{
    return{
        type:NEWCLASS,
        payload:detail
    }
}
export const NewStudentAction = (det) =>{
    return {
        type:NEWSTUDENT,
        payload:det
    }
}