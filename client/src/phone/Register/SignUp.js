import React, {Component} from 'react';
import styles from "./signup.module.sass"
import Confirm from "./confirm/Confirm";
import { Redirect } from 'react-router';
import {RegisterHTTP} from "../../HTTP/Register";

class SignUp extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
        };

        this.emailEl = React.createRef();
        this.middlenameEl = React.createRef();
        this.lastnameEl = React.createRef();
        this.firstnameEl = React.createRef();
        this.phoneEl = React.createRef();
        this.orgnizationEl = React.createRef();
        this.addressOneEl = React.createRef();
        this.postalCodeEl = React.createRef();

        this.submitHandler = this.submitHandler.bind(this)
    }

    state = {
        show: false,
        redirect: false
    }

    componentDidMount() {
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
    }
    validateEmail (email) {
        // eslint-disable-next-line
        const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexp.test(email);
    }
    

    confirmed = () => {
        this.setState({
            show: true
        })
        this.submitHandler()
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 375;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    submitHandler = async event =>{
        //event.preventDefault();

        const information = {
            lastname: this.lastnameEl.current.value,
            firstname: this.firstnameEl.current.value,
            middlename: this.middlenameEl.current.value,
            email: this.emailEl.current.value,
            phone: this.phoneEl.current.value,
            orgnization: this.orgnizationEl.current.value,
            addressOne: this.addressOneEl.current.value,
            addressTwo: "",
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

    setTheme = (ev) => {
        this.setState({
            show: false,
            redirect: true
        })
    }

    render(){

        if(this.state.redirect){
            return (<Redirect to="/"/>);
        }

            return(
                <div style={{transform: this.state.transform, position: "absolute"}}>
                    
                <div className = {styles.borderSize}>

                    <div className = {styles.joinUs}>Join Us</div>

                    <div className = {styles.name}>Name</div>
                    <input type="text" placeholder = "Last name/surname" className = {styles.lastName} ref={this.lastnameEl}></input>
                    <div className = {styles.line1}></div>

                    <input type="text" placeholder = "First name" className = {styles.firstName} ref={this.firstnameEl}></input>
                    <div className = {styles.line2}></div>   

                    <input type="text" placeholder = "Middle name" className = {styles.middleName} ref={this.middlenameEl}></input>
                    <div className = {styles.lineMiddle}></div>

                    <div className = {styles.contact}>Contact</div>
                    <input type = "text" placeholder= "Mobile Phone Number" className = {styles.phoneNumber} ref={this.phoneEl}></input>
                    <div className = {styles.phoneNumberLine}></div>
                    <input type = "text" placeholder= "Email address" className = {styles.email} ref={this.emailEl}></input>
                    <div className = {styles.emailLine}></div>

                    <div className = {styles.Address}>Address</div>
                    <input type = "text" className = {styles.organization} placeholder= "Organization" ref={this.orgnizationEl}></input>
                    <div className = {styles.organizationLine}></div>
                    <textarea placeholder="Address Lines" className = {styles.address} ref={this.addressOneEl}></textarea>
                    <div className = {styles.addressLineLine}></div>

                    <input type = "text" className = {styles.postalCode} placeholder= "Postal code" ref={this.postalCodeEl}></input>
                    <div className = {styles.postalCodeLine}></div>
                    <button className = {styles.applyButton} onClick={this.confirmed}>Apply</button>
                </div>
                <Confirm show={this.state.show} setTheme={this.setTheme}></Confirm>
            </div>
            )
        }

    
    }

export default SignUp;