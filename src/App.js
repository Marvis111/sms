import React from 'react';
import { Switch, BrowserRouter as Router , } from "react-router-dom";
import Home from './Components/HomePage/Home';
import Login from './Components/Registration/Login';
import ProtectedRoute from './Components/Auth/ProtectedRoute'
import Dashboard from './Components/Dashboard/Dashboard.jsx';
//import IsAuthUser from './Components/Auth/IsAuthUser';
import Teachers from './Components/Admin/Teachers';
import UnProtectedRoute  from './Components/Auth/UnprotectedRoute'
import TeachersDashboard from './Components/Teachers/TeachersDashboard';
import Class from './Components/Admin/Class';
import TeachersStudents from './Components/Teachers/Students';
//import StudentProfile  from './Components/Students/Student'
function App(){
    return(
        <Router>
            <Switch>
                <UnProtectedRoute exact path = {['/home','/','/index']} component = {Home} />
                <UnProtectedRoute  exact path = {'/login'} component = {Login}/>
                <ProtectedRoute exact path={['/admin/dashboard','/admin/','/admin/index']} component = {Dashboard} />
                <ProtectedRoute exact path={'/admin/teachers'} component = {Teachers} />
                <ProtectedRoute exact path={'/admin/classes'} component = {Class} />
                {/* techers routes */}
                <ProtectedRoute exact path={['/teacher/dashboard','/teacher/','/teacher/index']} component = {TeachersDashboard} />
                <ProtectedRoute exact path={['/teacher/students',`/teacher/students/:studentId`]} component = {TeachersStudents} />

                {/* student routes */}
            </Switch>
            
        </Router>
    )
}

export default App