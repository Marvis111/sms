import { combineReducers } from "redux";
import { distributeErrorReducer, LoginReducer } from "./loginReducer";
import {sideBarReducer,newEventReducer,newTeacher,newClass,newStudent} from './userActionReducer'

export const rootReducer = combineReducers({
    newLogin:LoginReducer,
    distributeError:distributeErrorReducer,
    toggleSideBar:sideBarReducer,
    Event:newEventReducer,
    newTeacher,
    newClass,newStudent
});