import React, {Component} from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import update from 'immutability-helper';
import styles from "./main.module.sass"
import Bg from './Bg'
import Cookies from "js-cookie";
import {GetRolesHTTP} from "../../HTTP/GetRoles";
import {SetRolesHTTP} from "../../HTTP/SetRoles";
import {getIP} from "../../ipAddressPic";

// let colors=["#772432","#004165","#CD202C","#F2DF74"]
// let colorname=["TMpurple","TMblue","TMred","TMyellow","TMgray"]


class Main extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            acApplyClick: false,
            gApplyClick: false,
            geApplyClick: false,
            tApplyClick: false,
            s1ApplyClick: false,
            s2ApplyClick: false,
            s3ApplyClick: false,
            s4ApplyClick: false,
            e1ApplyClick: false,
            e2ApplyClick: false,
            e3ApplyClick: false,
            e4ApplyClick: false,
            saaApplyClick: false,
            teApplyClick: false,
            tmApplyClick: false,
            discardApplyClick: false,
            rolesBtn: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            userName: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            rolesName: [
                "Toastmaster of the evening",
                "Surgent At Arms",
                "Grammarian",
                "Ah-Counter",
                "General Evaluator",
                "Timer",
                "Topics Master",
                "Speaker 1",
                "Speaker 2",
                "Speaker 3",
                "Speaker 4",
                "Evaluate 1",
                "Evaluate 2",
                "Evaluate 3",
                "Evaluate 4",
            ],
            date: "",
            btnExit: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            firstname: "",
            deduct: false,
            imageLocation: ""
        };
        
        this.closeAll = this.closeAll.bind(this)
        this.setRoles = this.setRoles.bind(this)
        this.fetchRoles = this.fetchRoles.bind(this)
    }

    state = {
        title: 'null',
        roles: [],
        theme: ""
    }

    static contextType = AuthContext;
    componentDidUpdate(){
        // this.fetchRoles()
        // this.setState({
        //     transform: ""
        // })
    }
    componentDidMount() {
        this.boxClick();
        // window.addEventListener("resize",  this.boxClick);
        let id =Cookies.get("userId")
        this.getMeeting()
        this.fetchRoles() 
        this.setState({
            imageLocation: `url(${getIP()}/pics/${id}.jpg)`
        })
    }

    boxClick = (e) => {
        let ratio =  ( document.documentElement.clientWidth / 375.0);
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    setTheme = (theme) => {
        this.setState({
            theme: theme
        })
    }

    changeMainState = modal => () =>{
        if(modal==="ahConfirm"){
            this.setState({
               acApplyClick:true
            })
        }
        else if(modal==="gConfirm"){
            this.setState({
               gApplyClick:true
            })
        }
        else if(modal==="geConfirm"){
            this.setState({
               geApplyClick:true
            })
        }
        else if(modal==="s1Confirm"){
            this.setState({
               s1ApplyClick:true
            })
        }
        else if(modal==="s2Confirm"){
            this.setState({
               s2ApplyClick:true
            })
        }
        else if(modal==="s3Confirm"){
            this.setState({
               s3ApplyClick:true
            })
        }
        else if(modal==="s4Confirm"){
            this.setState({
               s4ApplyClick:true
            })
        }
        else if(modal==="e1Confirm"){
            this.setState({
               e1ApplyClick:true
            })
        }
        else if(modal==="e2Confirm"){
            this.setState({
               e2ApplyClick:true
            })
        }
        else if(modal==="e3Confirm"){
            this.setState({
               e3ApplyClick:true
            })
        }
        else if(modal==="e4Confirm"){
            this.setState({
               e4ApplyClick:true
            })
        }
        else if(modal==="saaConfirm"){
            this.setState({
               saaApplyClick:true
            })
        }
        else if(modal==="tePopup"){
            this.setState({
               teApplyClick:true
            })
        }
        else if(modal==="tmConfirm"){
            this.setState({
               tmApplyClick:true
            })
        }
        else if(modal==="tConfirm"){
            this.setState({
               tApplyClick:true
            })
        }
        else if(modal==="discard"){
            this.setState({
                discardApplyClick: true
            })
        }
        else if(modal==="close"){
            this.setState({
               acApplyClick:false,
               gApplyClick:false,
               geApplyClick:false,
               s1ApplyClick: false,
               s2ApplyClick: false,
               s3ApplyClick: false,
               s4ApplyClick: false,
               e1ApplyClick: false,
               e2ApplyClick: false,
               e3ApplyClick: false,
               e4ApplyClick: false,
               saaApplyClick: false,
               teApplyClick: false,
               tApplyClick: false,
               tmApplyClick: false,
               discardApplyClick: false

            })
        }
    }

    
    refresh = (ev) => {
        if(ev !== "0"){
            const gamification = JSON.parse(Cookies.get('gamification'))
            if(gamification.points !== 0){
                this.setState({
                    deduct: true
                })
            }
        }
        this.fetchRoles()
    }

    closeAll(){
        this.setState({
            acApplyClick:false,
            gApplyClick:false,
            geApplyClick:false,
            s1ApplyClick: false,
            s2ApplyClick: false,
            s3ApplyClick: false,
            s4ApplyClick: false,
            e1ApplyClick: false,
            e2ApplyClick: false,
            e3ApplyClick: false,
            e4ApplyClick: false,
            saaApplyClick: false,
            teApplyClick: false,
            tmApplyClick: false,
            tApplyClick: false,
            discardApplyClick: false,
            deduct: false
        })
    }

    setRolesDefault(){
        this.setState({
            btnExit: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            rolesBtn: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            roles: [],
            userName: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        })
        Cookies.remove('getRoles')
    }

    async setRoles(roleInfo){

        const roleInfos = {
            roleName: roleInfo.roleName,
            theme: roleInfo.theme,
            wordOfTheDay: roleInfo.wordOfTheDay,
            spTitle: roleInfo.spTitle,
            spProjectNo: roleInfo.spProjectNo,
            spPathway: roleInfo.spPathway,
            spObjective: roleInfo.spObjective
        }

        let isSuccess =  await SetRolesHTTP(roleInfos)
        
        if(isSuccess){
            Cookies.remove("rolesBtn")
            Cookies.remove("btnExit")
            Cookies.remove("userName")
            Cookies.remove('getRoles')
            // this.fetchRoles(function(lossValue) {
            //     console.log('Loss is', lossValue)
            //   }) // update role to page
            this.fetchRoles()
        }
    }

    getMeeting() {
        const information = JSON.parse(Cookies.get("information"));

        this.setState({
            date: Cookies.get("GetMeeting") ,
            firstname: information.firstname
        })
    }

    async fetchRoles() {

        await GetRolesHTTP();
        console.log("tet")
        if(Cookies.get("GetRoles")){
            const roles = JSON.parse(Cookies.get("GetRoles"))
            this.setRolesDefault()
            this.setState({
                roles : roles
            })
            console.log(roles);
            
            this.distributeRole(roles)
        }
    }

    distributeRole(roles){
        if(roles.length === 0){
            console.log(roles.length)
            return "";
        }
        for(let i = 0; i < roles.length; i++){
                for(let x = 0; x < this.state.rolesBtn.length; x++){
                    if(roles[i].roleName === this.state.rolesName[x]){
                        this.setState({
                            rolesBtn: update( this.state.rolesBtn, {[x]: {$set: true }}),
                            userName: update( this.state.userName, {[x]: {$set: roles[i].owner.information.firstname}})
                        })
                        if(Cookies.get("userId") === roles[i].owner._id){
                            this.setState({
                                btnExit: update( this.state.btnExit, {[x]: {$set: true}})
                            })
                        }
                        break;
                    }
                }
        }
        Cookies.set('rolesBtn', JSON.stringify(this.state.rolesBtn))
        Cookies.set('btnExit', JSON.stringify(this.state.btnExit))
        Cookies.set('userName', JSON.stringify(this.state.userName))
    }

    simplifiedFunction= (value)=> {
        console.log(value)
    }
    

    render(){

        const summary = { 
            pathname: "/Summary"
        };

        const profile = { 
            pathname: "/Profile"
        };
        
            return(
                <div style={{transform: this.state.transform, position: "absolute"}} onScroll={this.handleScroll}>

                   
                    <Bg/>
                    
                    <div className ={styles.menu}>
                            <Link to={profile}>
                                <div className = {styles.youBox} >
                                    <div className = {styles.youText}>{this.state.firstname}</div>
                                    <div className = {styles.you}>
                                        <div className = {styles.profileLogo} style={{backgroundImage:this.state.imageLocation}}></div>
                                    </div> 
                                </div>
                            </Link>
                            <div className = {styles.nextWeekBox}>
                                <div className = {styles.nextWeekText}>Next Week</div>
                                <div className = {styles.nextWeekText} style={{top:"75px"}}>{this.state.date}</div>
                                <div className = {styles.nextWeek}>
                                    <div className = {styles.nextWeekLogo}>
                                        <i className="fas fa-calendar-alt" style={{color:"#002133", fontSize:"1.5rem"}}></i>
                                    </div>
                                </div> 
                            </div>
                            <Link to={summary}>
                                <div className = {styles.summaryBox}>
                                    <div className = {styles.summaryText}>Summary</div>
                                    <div className = {styles.summary}>
                                        <div className = {styles.summaryLogo}>
                                            <i className="fas fa-book-open" style={{color:"#002133", fontSize:"1.5rem"}}></i>
                                        </div>
                                    </div> 
                                </div>
                            </Link>
                    </div>

                    

                    <button className = {styles.logOut} onClick={this.context.logout} style={{left: "113.5px"}}>Logout</button>
                    

                </div>
            )
        }

        
}

export default Main;