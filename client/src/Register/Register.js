import React, {Component} from 'react';
import styles from "./register.module.sass"
import Confirmation from "./Confirmation";
import {RegisterHTTP} from "../HTTP/Register";

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: ""
        };

        this.emailEl = React.createRef();
        this.middlenameEl = React.createRef();
        this.lastnameEl = React.createRef();
        this.firstnameEl = React.createRef();
        this.phoneEl = React.createRef();
        this.orgnizationEl = React.createRef();
        this.addressOneEl = React.createRef();
        this.addressTwoEl = React.createRef();
        this.postalCodeEl = React.createRef();
    }

    state = {
        show: false,
    }

    validateEmail (email) {
        // eslint-disable-next-line
        const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexp.test(email);
    }
    componentDidMount() {
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 1920;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    submitHandler = async event =>{
        event.preventDefault();

        const information = {
            lastname: this.lastnameEl.current.value,
            firstname: this.firstnameEl.current.value,
            middlename: this.middlenameEl.current.value,
            email: this.emailEl.current.value,
            phone: this.phoneEl.current.value,
            orgnization: this.orgnizationEl.current.value,
            addressOne: this.addressOneEl.current.value,
            addressTwo: this.addressTwoEl.current.value,
            postalCode: this.postalCodeEl.current.value,
        }

        if(information.email.trim().length === 0 || information.lastname.trim().length === 0 || 
            information.middlename.trim().length === 0 || information.firstname.trim().length === 0){
            window.alert("Please provide Email, Middle Name, First Name, and Last Name to continue!")
            return;
        }
        const checkEmail = this.validateEmail(information.email)
        
        if(!checkEmail){
            window.alert("Please provide a valid email!");
            return;
        }

        const isSuccess = await RegisterHTTP(information)

        if(!isSuccess){
            window.alert("Email has been used!");
        }

        this.setState({
            show: isSuccess
        })
    }

    render(){

        return(
            
            <div className={ styles.background} style={{transform: this.state.transform}}>
                <form>

                <div className={ styles.joinUs}>JOIN US</div>
                <input className={ styles.lastName} ref={this.lastnameEl} placeholder="Last name/Surname"/>
                <input className={ styles.firstName} ref={this.firstnameEl} placeholder="First name"/>
                <input className={ styles.middleName} ref={this.middlenameEl} placeholder="Middle name"/>
                <input className={ styles.phone} ref={this.phoneEl} placeholder="Mobile phone number"/>
                <input required type="email" className={ styles.email} ref={this.emailEl} placeholder="Email address"/>
                <input className={ styles.orgnization} ref={this.orgnizationEl} placeholder="Orgnization"/>
                <input className={ styles.addressOne} ref={this.addressOneEl} placeholder="Address line 1"/>
                <input className={ styles.addressTwo} ref={this.addressTwoEl} placeholder="Address line 2"/>
                <input className={ styles.postalCode} ref={this.postalCodeEl} placeholder="Postal Code"/>
                <div className={ styles.name}>Name</div>
                <div className={ styles.contact}>Contact</div>
                <div className={ styles.address}>Address</div>
                <button className={ styles.apply} type="submit" onClick={this.submitHandler}>APPLY</button>
                <Confirmation show={this.state.show}/> 
                </form>
            </div>
        )
    }
}

export default Register;