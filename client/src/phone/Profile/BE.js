import React, {Component} from 'react';
import styles from "./profile.module.sass"
import Cookies from "js-cookie";

class BE extends Component{
    constructor(props) {
        super(props);
        this.state = {
            performance: [],
        }
    }
    componentDidMount(){
        this.getPerformance();
    }
    getPerformance(){
        if(Cookies.get("GetPerformances")){
            const performance = JSON.parse(Cookies.get("GetPerformances"))
            console.log(performance);
            
            this.setState({
                performance: performance
            })
        }
    }
    showPerformance(){
        const double = this.state.performance.map((performance,index) => {
            return (
                <div key={index} className = {styles.beContainer}>
                    <div className = {styles.beTitle}>{performance.title}</div>
                    <div className = {styles.beTitle} style={{top:"45px",font: "lighter 0.6rem Montserrat"}}>{performance.date}</div>
                    <div className={ styles.beTitle} style={{top:"85px",font: "lighter 0.9rem Montserrat"}}>Well Done You Won {performance.title}</div>
                </div>
            )
        })
     
        return (
            <div className={ styles.performanceContainer}>
                    {double}
            </div>
        )
    }
    render(){
        if(!this.props.show){
            return null;
        }

        return(
            <div>
                {this.showPerformance()}
            </div>
        )
    }
}

export default BE;