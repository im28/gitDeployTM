import React, {Component} from 'react';
import styles from "./ministyles.module.sass"
import {CancelRoleHTTP} from "../../../../HTTP/CancelRole";

class Deduct extends Component{

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
        this.cancelRole()
    }
    state = {
        title: this.props.title
    }

    cancelRole(){
        let isSuccess = CancelRoleHTTP();

        if(isSuccess){
            this.props.refresh("test")
        }
    }

    render(){
        if (!this.props.show){
            return null;
        }
        return(
            <div className={ styles.container} >
                <div className={ styles.blur}></div>
                <div className={ styles.deductBG}>
                    <div className={ styles.ohNoText}>OH NO !</div>
                    <div className={ styles.deductContent}>You have missed your role as {this.props.title}</div>
                    <div className={ styles.deductPoint}>- 15 pts</div>
                    <button className={ styles.deductBtn} onClick={(e) => {this.onClose(e)}}></button>
                </div>
                
            </div>
        )
    }
}

export default Deduct;