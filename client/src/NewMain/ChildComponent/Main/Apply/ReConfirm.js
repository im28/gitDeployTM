import React, {Component} from 'react';
import styles from "./ministyles.module.sass"

class Reconfirm extends Component{
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }
    onBack(){
        this.props.back(true)
    }
    render(){
        if (!this.props.show){
            return null;
        }
        return(
            <div className={ styles.container} >
                <div className={ styles.blur}></div>
                <div className={ styles.reConfirmBG} style={{backgroundColor: this.props.background}}>
                    <div className={ styles.date}>MONDAY 15TH OCTOBER</div>
                    <div className={ styles.roleName}>{this.props.title}</div>
                    <button className={ styles.confirmBtn} style={{color: this.props.background}} onClick={(e) => {this.onClose(e)}}>Confirm</button>
                    <button className={ styles.backBtn} style={{color: this.props.background}} onClick={this.onBack.bind(this)}>Back</button>
                    <div className={ styles.confirmRoleTxt}>Confirm your role</div>
                </div>   
            </div>
        )
    }
}

export default Reconfirm;