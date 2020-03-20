import React, {Component} from 'react';
import styles from "./login.module.sass"
// import { Route} from "react-router-dom";
// import Main from "../Main/Main";
import Cookies from "js-cookie";
import AuthContext from '../../context/auth-context';
import {LoginHTTP} from "../../HTTP/Login";
import {UserHTTP} from "../../HTTP/User";
import {CompleteRolesHTTP} from "../../HTTP/CompleteRoles"
import {GetMeetingHTTP} from '../../HTTP/GetMeeting'
import {GetPerformanceHTTP} from "../../HTTP/GetPerformance"
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import { Link } from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            loading: false,
            missingI:false
        };
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 375
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    submitHandler = async event =>{
        event.preventDefault();

        const Auth = {
            username: this.usernameEl.current.value,
            password: this.passwordEl.current.value
        }

        if(Auth.username.trim().length === 0 || Auth.password.trim().length === 0){
            this.setState({
                missingI:true
            })
            return;
        }
        this.setState({
            loading:true
        })
        const isSuccess = await LoginHTTP(Auth);
        let userSuccess = false;

        if(!isSuccess){
            // window.alert("Wrong email or password! Please use the correct email and password!");
            this.setState({
                loading:false,
                missingI:true
            })
        }else{
            userSuccess = await UserHTTP();
            await GetMeetingHTTP();

            if(userSuccess){
                if(Cookies.get("isAdmin") === "1"){
                    await CompleteRolesHTTP()
                }
                await GetPerformanceHTTP();
            }
            this.context.login();
            this.setState({
                loading:false,
                missingI:false
            })
        }
    }
    changeHandeler = ()=>{
        this.setState({
            missingI:false
        })
    }

    render(){

        return(
           <div style={{transform: this.state.transform, position: "absolute"}}>

                <div className= {styles.background}></div>
                {/* <div className= {styles.signinbutton}></div> */}
                <div className= {styles.signin}>
                    SIGN IN
                </div>
                <div className= {styles.emailbox} style={{backgroundColor: this.state.missingI&& "#772432"}}></div>
                <input type="text" placeholder= "Username" className= {styles.email} ref={this.usernameEl} onChange={this.changeHandeler}></input>
                <div className= {styles.passwordbox} style={{backgroundColor: this.state.missingI&& "#772432"}}></div>
                <input type="password" placeholder="Password" className= {styles.password}  ref={this.passwordEl} onChange={this.changeHandeler}></input>

                <button className= {styles.continuebutton} onClick={this.submitHandler}>
                    {this.state.loading ? 
                    <HalfCircleSpinner
                        color='#fff'
                        size={30}
                        style={{
                            zIndex:1,
                            left: "50%",
                            transform: `translate(-50%,0)`,
                        }}
                    />
                    :
                    "CONTINUE" }
                </button>
                <Link to="/Forgot">
                    <button className={styles.forgot}>Forgot Password</button>
                </Link>
            </div>
        )
    }
}

export default Login;