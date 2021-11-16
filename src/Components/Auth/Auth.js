

class Auth{
    constructor(){
        this.Authenticated = false
    }
    Login(userDetails,callback){
        for (let detail in userDetails){
            if(detail !== 'token' && detail !='Category' && detail != 'expiresIn'){
                sessionStorage.setItem(detail,userDetails[detail])
            }else{
                localStorage.setItem(detail,userDetails[detail]);
            }
        }
        this.Authenticated = true;
        callback();
    }
    //new students
    
}

export default new Auth();