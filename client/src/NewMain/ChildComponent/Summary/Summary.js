import React, {Component} from 'react';
import styles from "./summary.module.sass"
import Cookies from "js-cookie";

class Summary extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            toastmaster: 0,
            surgentAtArms: 0,
            grammarian: 0,
            ahCounter: 0,
            generalEvaluator: 0,
            topicsMaster: 0,
            timer: 0,
            speeches: 0,
            evaluations: 0,
            maxPercent: 30
        };
    }

    componentDidMount() {
        this.userExperience();
    }

    userExperience() {
        const experience = JSON.parse(Cookies.get("experience"))

        this.setState({
            toastmaster: experience.toastmaster,
            surgentAtArms: experience.surgentAtArms,
            grammarian: experience.grammarian,
            ahCounter: experience.ahCounter,
            generalEvaluator: experience.generalEvaluator,
            topicsMaster: experience.topicsMaster,
            speeches: experience.speeches,
            evaluations: experience.evaluations
        })
    }

    calculatePercent = (value) =>{
        var sum = value / this.state.maxPercent * 126;
        //console.log(sum)
        return sum.toString() + "px";
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){
        if (!this.props.show){
            return null;
        }

        return(
            <div >
                <div className={ styles.background} >
                    <div className={ styles.title}>Summary</div>
                    <div className={ styles.rolesTitle}>Roles</div>
                    <div className={ styles.SETitle}>Speeches & Evaluations</div>

                    <div className={ styles.roleBulletContainer}> 
                        <div className={ styles.bullet}></div>
                        <div className={ styles.bullet}></div>
                        <div className={ styles.bullet}></div>
                        <div className={ styles.bullet}></div>
                        <div className={ styles.bullet}></div>
                        <div className={ styles.bullet}></div>
                    </div>

                    <div className={ styles.seBulletContainer}> 
                        <div className={ styles.bullet}></div>
                        <div className={ styles.bullet}></div>
                    </div>

                    <div className={ styles.roleTxtContainer}>
                        <div className={ styles.txt}>Toastmaster</div>
                        <div className={ styles.txt}>Surgent At Arms</div>
                        <div className={ styles.txt}>Grammarian</div>
                        <div className={ styles.txt}>Ah-Counter</div>
                        <div className={ styles.txt}>General Evaluator</div>
                        <div className={ styles.txt}>Topics Master</div>
                    </div>
                    
                    <div className={ styles.roleValueContainer}>
                        <div className={ styles.roleValue}>{this.state.toastmaster}x</div>
                        <div className={ styles.roleValue}>{this.state.surgentAtArms}x</div>
                        <div className={ styles.roleValue}>{this.state.grammarian}x</div>
                        <div className={ styles.roleValue}>{this.state.ahCounter}x</div>
                        <div className={ styles.roleValue}>{this.state.generalEvaluator}x</div>
                        <div className={ styles.roleValue}>{this.state.topicsMaster}x</div>
                    </div>
                    
                    <div className={ styles.rolePercentContainer}>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.toastmaster)}}></div>
                        </div>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.surgentAtArms)}}></div>
                        </div>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.grammarian)}}></div>
                        </div>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.ahCounter)}}></div>
                        </div>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.generalEvaluator)}}></div>
                        </div>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.topicsMaster)}}></div>
                        </div>
                    </div>

                    <div className={ styles.seValueContainer}>
                        <div className={ styles.roleValue}>{this.state.speeches}x</div>
                        <div className={ styles.roleValue}>{this.state.evaluations}x</div>
                    </div>

                    <div className={ styles.sePercentContainer}>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.speeches)}}></div>
                        </div>
                        <div className={ styles.rolePercent}>
                            <div className={ styles.rolePercentValue} 
                            style={{width: this.calculatePercent(this.state.evaluations)}}></div>
                        </div>
                    </div>

                    <div className={ styles.seTxtContainer}>
                        <div className={ styles.txt}>Speeches</div>
                        <div className={ styles.txt}>Evaluations</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Summary;