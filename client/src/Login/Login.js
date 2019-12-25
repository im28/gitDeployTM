import React, {Component} from 'react';
import styles from "./login.module.sass";
import Cookies from "js-cookie";
import AuthContext from '../context/auth-context';
import {LoginHTTP} from "../HTTP/Login";
import {UserHTTP} from "../HTTP/User";
import {CompleteRolesHTTP} from "../HTTP/CompleteRoles"
import {GetMeetingHTTP} from '../HTTP/GetMeeting'

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            redirect: false
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
        var ratio = document.documentElement.clientWidth / 1920;
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
            window.alert("Enter Username and password!")
            return;
        }

        const isSuccess = await LoginHTTP(Auth);
        let userSuccess = false;

        if(!isSuccess){
            window.alert("Wrong email or password! Please use the correct email and password!");
        }else{
            userSuccess = await UserHTTP();
            await GetMeetingHTTP();

            if(userSuccess){
                if(Cookies.get("isAdmin") === "1"){
                    await CompleteRolesHTTP()
                }
            }
            this.context.login();
        }
    }

    render(){
        
        return(
            <div className={ styles.background} style={{transform: this.state.transform}}>
                <div className={ styles.signIn}>SIGN IN</div>
                <input className={ styles.email} placeholder="Username" type="text" ref={this.usernameEl}></input>
                <input className={ styles.password} placeholder="Password" type="password" ref={this.passwordEl}></input>
                <button className={ styles.continue} onClick={this.submitHandler}>CONTINUE</button>
                <div className={ styles.forgotPassword}>FORGOT PASSWORD</div>           
            </div>
        )
    }
}

export default Login;