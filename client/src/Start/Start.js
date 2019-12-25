import React, {Component} from 'react';
import styles from "./start.module.sass";
import { Link } from "react-router-dom";

class Start extends Component{
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
               <div className={ styles.whiteBox}>
                    <div className={ styles.txt}>GET STARTED</div>
                    <div className={ styles.firstContainer}>
                        <div className={ styles.firstPic}></div>
                        <div className={ styles.subTitle}>What is Toastmasters</div>
                        <div className={ styles.content}>Toastmasters International is a non-profit educational organization that teaches public speaking and leadership skills.</div>
                    </div>
                    <div className={ styles.secondContainer}>
                        <div className={ styles.secondPic}></div>
                        <div className={ styles.subTitle}>Join our next meeting</div>
                        <div className={ styles.content}>Monday 15 October 8:00 - 10:00 PM JB</div>
                    </div>
                    <div className={ styles.thirdContainer}>
                        <div className={ styles.thirdPic}></div>
                        <div className={ styles.subTitle}>How Does Toastmasters Work?</div>
                        <div className={ styles.content}>Everything in Toastmasters revolves around the club. With a network of 16,800 clubs across 143 countries, you are sure to find one near you!</div>
                    </div>
                    <div className={ styles.fourthContainer}>
                        <div className={ styles.fourthPic}></div>
                        <div className={ styles.subTitle}>Are You Ready to Join?</div>
                        <div className={ styles.content}>When you join, you will be assigned a mentor, who will be there to answer any questions you have and help guide you on your journey</div>
                    </div>
               </div>
               <Link to="Register">
                <button className={ styles.continue}>CONTINUE</button>
               </Link>
            </div>
        )
    }
}

export default Start;