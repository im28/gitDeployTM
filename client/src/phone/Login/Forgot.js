import React, {Component} from 'react';
import styles from "./login.module.sass"
// import { Route} from "react-router-dom";
// import Main from "../Main/Main";
import AuthContext from '../../context/auth-context';
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import axios from 'axios'
import {getIP} from "../../ipAddressPic";

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

        
        let username= this.passwordEl.current.value

        try {
            this.setState({
                loading: true
            })
            const response = await axios.post(
                `${getIP()}/forgotPassword`,
              {username},
            );
            if (response) {
                this.setState({
                    loading: false,
                    missingI:false
                })
            }
          } catch (error) {
            console.error(error.response.data);
            this.setState({
                loading: false,
                missingI:true
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
                <div className= {styles.signin}>
                    Forgot Password
                </div>

                <div className= {styles.passwordbox} style={{backgroundColor: this.state.missingI&& "#772432"}}></div>
                <input type="Text" placeholder="Username" className= {styles.password}  ref={this.passwordEl} onChange={this.changeHandeler}></input>

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
                    "Reset" }
                </button>
            </div>
        )
    }
}

export default Login;