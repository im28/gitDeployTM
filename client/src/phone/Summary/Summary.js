import React, {Component} from 'react';
import styles from "./summary.module.sass"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {getIP} from "../../ipAddressPic";
import {UserHTTP} from '../../HTTP/User'

class Summary extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            toastmaster: 0,
            surgentAtArms: 0,
            grammarian: 0,
            ahCounter: 0,
            generalEvaluator: 0,
            topicsMaster: 0,
            timer: 0,
            speeches: 0,
            evaluations: 0,
            maxPercent: 30,
            firstname: "",
            imageLocation:""
        };
    }

    componentDidMount() {
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
        this.userExperience();
        let id =Cookies.get("userId")
        this.setState({
            imageLocation: `url(${getIP()}/pics/${id}.jpg)`
        })

        UserHTTP();
        
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 375;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    userExperience() {
        const experience = JSON.parse(Cookies.get("experience"))
        const information = JSON.parse(Cookies.get("information"))

        this.setState({
            toastmaster: experience.toastmaster,
            surgentAtArms: experience.surgentAtArms,
            grammarian: experience.grammarian,
            ahCounter: experience.ahCounter,
            generalEvaluator: experience.generalEvaluator,
            topicsMaster: experience.topicsMaster,
            timer: experience.timer,
            speeches: experience.speeches,
            evaluations: experience.evaluations,
            firstname: information.firstname
        })
    }

    calculatePercent = (value) =>{
        var sum = value / this.state.maxPercent * 126;
        //console.log(sum)
        return sum.toString() + "px";
    }

    render(){

        const profile = { 
            pathname: "/Profile"
        };

        const main = { 
            pathname: "/Main"
        };

        return(
            <div style={{transform: this.state.transform, position: "absolute"}}>
            
            <div className = {styles.background}></div>
            <div className = {styles.menu}>
                <Link to={profile}>
                <div className = {styles.youBox} >
                    <div className = {styles.youText}>{this.state.firstname}</div>
                    <div className = {styles.you}>
                        <div className = {styles.profileLogo} style={{backgroundImage:this.state.imageLocation}}>
                        </div>
                    </div> 
                </div>
                </Link>
                <Link to={main}>
                    <div className = {styles.nextWeekBox}>
                        <div className = {styles.nextWeekText}>Next Week</div>
                        <div className = {styles.nextWeek}>
                            <div className = {styles.nextWeekLogo}>
                                <i className="fas fa-calendar-alt" style={{color:"#002133", fontSize:"1.5rem"}}></i>
                            </div>
                        </div> 
                    </div>
                </Link>
                <div className = {styles.summaryBox}>
                    <div className = {styles.summaryText}>Summary</div>
                    <div className = {styles.summary}>
                        <div className = {styles.summaryLogo}>
                            <i className="fas fa-book-open" style={{color:"#002133", fontSize:"1.5rem"}}></i>
                        </div>
                    </div> 
                </div>
            </div>
            
            <div className = {styles.summaryTitle}>Summary</div>
            
            <div className = {styles.Roles}>Roles</div>

            <div className = {styles.toastmaster}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>Toastmaster</div>
                <div className = {styles.participation}>{this.state.toastmaster}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.toastmaster)}}></div>
                </div>
            </div>

            <div className = {styles.surgent}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>Surgent At Arms</div>
                <div className = {styles.participation}>{this.state.surgentAtArms}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.surgentAtArms)}}></div>
                </div>
            </div>
            
            <div className = {styles.grammarian}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>Grammarian</div>
                <div className = {styles.participation}>{this.state.grammarian}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.grammarian)}}></div>
                </div>
            </div>

            <div className = {styles.ahcounter}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>Ah-Counter</div>
                <div className = {styles.participation}>{this.state.ahCounter}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.ahCounter)}}></div>
                </div>
            </div>

            <div className = {styles.generalevaluator}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>General Evaluator</div>
                <div className = {styles.participation}>{this.state.generalEvaluator}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.generalEvaluator)}}></div>
                </div>
            </div>

            <div className = {styles.topicmaster}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>Topic Master</div>
                <div className = {styles.participation}>{this.state.topicsMaster}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.topicsMaster)}}></div>
                </div>
            </div>
            <div className = {styles.timer}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}>Timer</div>
                <div className = {styles.participation}>{this.state.timer}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.timer)}}></div>
                </div>
            </div>
            
            <div className = {styles.se}>Speeches & Evaluations</div>

            <div className = {styles.speeches}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}> Speeches</div>
                <div className = {styles.participation}>{this.state.speeches}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.speeches)}}></div>
                </div>
            </div>

            <div className = {styles.evaluation}>
                <div className = {styles.point}></div>
                <div className = {styles.topic}> Evaluations</div>
                <div className = {styles.participation}>{this.state.evaluations}x</div>
                <div className = {styles.score}>
                    <div className = {styles.scoreValue}
                    style={{width: this.calculatePercent(this.state.evaluations)}}></div>
                </div>
            </div>
            
           
            
            
            
            
            
            
            

            
            
            

            
            
    
            
            
            
            

            
            
            
            
            
            

            </div>
            )
    }
}

export default Summary;