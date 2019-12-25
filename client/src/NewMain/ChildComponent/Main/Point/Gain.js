import React, {Component} from 'react';
import styles from "./ministyles.module.sass"

class Gain extends Component{

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    state = {
        title: this.props.title
    }
    render(){
        if (!this.props.show){
            return null;
        }
        return(
            <div className={ styles.container} >
                <div className={ styles.blur}></div>
                <div className={ styles.deductBG} style={{backgroundColor: "#004165"}}>
                    <div className={ styles.ohNoText}>Well Done!</div>
                    <div className={ styles.deductContent}>You have completed your role as {this.props.title}</div>
                    <div className={ styles.deductPoint}>+ 10 pts</div>
                    <button className={ styles.deductBtn} onClick={(e) => {this.onClose(e)}}></button>
                </div>
                
            </div>
        )
    }
}

export default Gain;