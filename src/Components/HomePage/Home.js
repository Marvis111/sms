import React, { Component, } from 'react'
import WelcomeImg from '../../assets/images/welcome.svg';
import Nav from './Nav';
import '../../assets/css/index.css';
import '../../assets/css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            right:0,
            deviceWidth:window.innerWidth
        }
        this.Animate = this.Animate.bind(this);

    }
     Animate(){
      const  speed = 10;
       var rightMargin = this.state.right,
       deviceWidth = this.state.deviceWidth
       if(rightMargin < deviceWidth){
           rightMargin++
       }
       else if(rightMargin == deviceWidth){
           rightMargin = -240;
       }
       this.setState({...this.state,right:rightMargin,deviceWidth});
       setTimeout(this.Animate,speed);
        
     }
     componentDidMount(){
        this.Animate();
     }
     componentWillUnmount(){
         console.log();
         return null
     } 
render(){
    return(
        
        <React.Fragment>
        <div className='home-page'>
            <Nav/>
         <div className='main-container container-fluid' style={{background:'red !important'}}>
         <div className="row">
        <div className="col-sm-6 intro">
            <div className="jumbotron">
            <h1>Be Prepared to Succeed!</h1>
            <p>BWe have provided you with access to all the courses
                and their corresponding materials. Happy learning!!!</p>
            </div>
        </div>
        <div className="col-sm-6 ">
        <div className='welcome-img'>
                <img src={WelcomeImg} alt='Welcome Image' />
            </div>
        </div>
  </div>
            
        </div>
        <footer >
            <div className=''>
                <span>Designed By <em>Marvellous</em> </span>
            </div>
        </footer>
        </div>
       
        </React.Fragment>
    )

    }
}

export default Home