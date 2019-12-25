import React, {Component} from 'react';
import styles from "./default.module.sass";
import { Link } from "react-router-dom";

class Default extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: ""
        };
      }

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

    render(){

        return(
            <div className={ styles.background} style={{transform: this.state.transform}}>
                <Link to="Login">    
                    <   button className={ styles.login}>LOG IN</button>
                </Link>
                <div className={ styles.tutorialBox}>
                    <div className={ styles.tutorial}></div>
                    <div className={ styles.welcome}>Welcome to Meet Up</div>
                </div>
                <Link to="Start">   
                    <button className={ styles.started}>GET STARTED</button>
                </Link>
            </div>
        )
    }
}

export default Default;