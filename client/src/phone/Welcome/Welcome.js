import React, {Component} from 'react';
import styles from "./welcome.module.sass"
import { Link } from "react-router-dom";
// import MetaTags from 'react-meta-tags';


class Welcome extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            ratio:""
        };
      }

    componentDidMount() {
        this.boxClick();
        //window.addEventListener("resize",  this.boxClick);    
    }

    boxClick = (e) => {
        
        var ratio = document.documentElement.clientWidth / 375;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale,
            ratio: ratio
        })
    }

    render(){
        const login = { 
            pathname: "/Login"
        };
        const register = { 
            pathname: "/Register"
        };

            return(
          
                <div style={{transform: this.state.transform, position: "absolute"}}>
                    
                    <div className = {styles.background}>
                        <Link to={login}>
                            <button className = {styles.loginButton}>LOG IN
                            </button>
                        </Link>

                        <div className = {styles.welcomeBg}>
                            <div className = {styles.welcomeText}>Welcome to Meet Up</div>
                        </div>

                        <Link to={register}>
                            <button className = {styles.getStartedButton}>GET STARTED
                            </button>
                        </Link>

                        
                    </div>

                    
            </div>
            )
        }

    
    }

export default Welcome;