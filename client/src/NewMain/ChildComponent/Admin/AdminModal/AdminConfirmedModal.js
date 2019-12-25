import React, {Component} from 'react';
import styles from "./ministyles.module.sass"

class AddMemberModal extends Component{
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    render(){
        if (!this.props.show){
            return null;
        }
        return(
            <div className={ styles.container} >
                <div className={ styles.blur}></div>
                <div className={ styles.ConfirmBG} >
                    <div className={ styles.newMemberTxt}>New Member</div>
                    <div className={ styles.ConfirmTxt}>Confirmed</div>
                    <div className={ styles.welcomeMember}>Faris Fahan is now a Member</div>
                    <button className={ styles.btnRight} onClick={(e) => {this.onClose(e)}}></button>
                </div>   
            </div>
        )
    }
}

export default AddMemberModal;