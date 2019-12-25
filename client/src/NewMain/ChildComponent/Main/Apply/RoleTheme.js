import React, {Component} from 'react';
import styles from "./ministyles.module.sass"

class RoleTheme extends Component{
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
                <div className={ styles.background} style={{backgroundColor: this.props.background}}>
                    <div className={ styles.date}>MONDAY 15TH OCTOBER</div>
                    <div className={ styles.roleName}>{this.props.title}</div>
                    <input className={ styles.inputBox} style={{backgroundColor: this.props.background}} placeholder="Meeting Theme"/>
                    <button className={ styles.applyBtn} style={{color: this.props.background}} onClick={(e) => {this.onClose(e)}}>Apply</button>
                </div>   
            </div>
        )
    }
}

export default RoleTheme;