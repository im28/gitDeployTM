import React, {Component} from 'react';
import styles from "./ministyles.module.sass"

class Confirmed extends Component{

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
                <div className={ styles.confirmedBG} style={{backgroundColor: this.props.background}}>
                    <div className={ styles.date}>MONDAY 15TH OCTOBER</div>
                    <div className={ styles.roleName}>{this.props.title}</div>
                    <div className={ styles.confirmedTxt}>Confirmed</div>
                    <button className={ styles.backBtn} style={{color: this.props.background}} onClick={(e) => {this.onClose(e)}}>Back</button>
  
                </div>
                
            </div>
        )
    }
}

export default Confirmed;