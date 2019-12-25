import React, {Component} from 'react';
import styles from "./ministyles.module.sass"


class ConfirmationPrompt extends Component{

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
        //this.cancelRole();
    }
    state = {
        title: this.props.title
    }
    onBack = (e) =>{
        this.props.back && this.props.back(e);
    }

    

    render(){
        if (!this.props.show){
            return null;
        }
        return(
            <div className={ styles.container} >
                <div className={ styles.blur}></div>
                <div className={ styles.background}>
                    <div className={ styles.date}>MONDAY 15TH OCTOBER</div>
                    <div className={ styles.roleName}>{this.props.title}</div>
                    <div className={ styles.confirmedTxt}>ARE YOU SURE YOU WANT TO WITHDRAW FROM YOUR ROLE</div>
                    <button className={ styles.confirmBtn} onClick={(e) => {this.onClose(e)}} >Confirm</button>
                    <button className={ styles.backBtn} onClick={(e) => {this.onBack(e)}}>Back</button>
  
                </div>
                
            </div>
        )
    }
}

export default ConfirmationPrompt;