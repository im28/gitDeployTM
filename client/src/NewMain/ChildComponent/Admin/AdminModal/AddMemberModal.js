import React, {Component} from 'react';
import styles from "./ministyles.module.sass"
import {AddUserHTTP} from "../../../../HTTP/AddUser";

class AddMemberModal extends Component{
    constructor(props) {
        super(props);

        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
        this.emailEl = React.createRef();
    }

    onClose = async (e) => {
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;
        const email = this.emailEl.current.value;

        if(username.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0){
            window.alert("Enter Username ,password, and email!")
            return;
        }

        const isSuccess = await AddUserHTTP(username, password, email)

        if(isSuccess){
            this.props.onClose && this.props.onClose(e);
        }
        else{
            return;
        }
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
                <div className={ styles.background} >
                    <div className={ styles.newMemberTxt}>New Member</div>
                    <div className={ styles.addNewMemberTxt}>Add the New Member Details</div>
                    <input className={ styles.nameTxt} placeholder="EMAIL" ref={this.emailEl}/>
                    <input className={ styles.usernameTxt} placeholder="USER NAME" ref={this.usernameEl}/>
                    <input className={ styles.passwordTxt} placeholder="PASSWORD" ref={this.passwordEl}/>
                    <button className={ styles.btnConfirm} onClick={(e) => {this.onClose(e)}}>Confirm</button>
                    <button className={ styles.btnBack} onClick={this.onBack.bind(this)}>Back</button>
                </div>   
            </div>
        )
    }
}

export default AddMemberModal;