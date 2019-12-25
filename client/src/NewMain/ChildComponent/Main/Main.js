import React, {Component} from 'react';
import styles from "./main.module.sass";
import update from 'immutability-helper';
import Cookies from "js-cookie";
import RoleTheme from "./Apply/RoleTheme";
import ReConfirm from "./Apply/ReConfirm";
import Confirmed from "./Apply/Confirmed";
import AuthContext from '../../../context/auth-context';
import ConfirmationPrompt from './Point/ConfirmationPrompt';
import Deduct from './Point/Deduct';
import Gain from './Point/Gain';
import {GetRolesHTTP} from "../../../HTTP/GetRoles";
import {SetRolesHTTP} from "../../../HTTP/SetRoles";

class Main extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            user: {},
            rolesBtn: [false, false, false, false, false, false, false, false, false, false],
            userName: ["", "", "", "", "", "", "", "", "", ""],
            rolesName: [
                "Toastmaster of the evening",
                "Surgent At Arms",
                "Grammarian",
                "Ah-Counter",
                "General Evaluator",
                "Topics Master",
                "Speaker 1",
                "Speaker 2",
                "Speaker 3",
                "Speaker 4"
            ],
            date: "",
            btnExit: [false, false, false, false, false, false, false, false, false, false],
            loader: false
        };
    }

    state = {
        roleTheme: false,
        reConfirm: false,
        confirmed: false,
        reConfirmBack: false,
        confirmationPrompt: false,
        deduct: false,
        gain: false,
        background: '#FFFFFF',
        title: 'null',
        roles: [],
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.getMeeting()
        this.fetchRoles()   
    }

    componentWillUnmount() {
        //this.state.transform = "0";
        //this.state.user = {}
      }

    onChangeStyle(newTitle,bg){
        this.setState({
            background: bg,
            title: newTitle
        });
    }

    test(modalType){
        if (modalType === "RoleTheme") {
          this.setState({
            roleTheme: true
          });
        } else if (modalType === "ReConfirm") {
          this.setState({
            roleTheme: false,
            reConfirm: true
          });
        }
        else if (modalType === "ReConfirmBack") {
            this.setState({
              reConfirm: false,
              roleTheme: true
            });
        }
        else if (modalType === "Confirmed") {
            this.setState({
              reConfirm: false,
              confirmed: true
            });
        }
        else if (modalType === "ConfirmationPrompt") {
            this.setState({
              confirmationPrompt: true,
              deduct: false
            });
        }
        else if (modalType === "Deduct") {
            this.setState({
              deduct: true,
              confirmationPrompt: false
            });
            
        }
        else if (modalType === "CloseModal") {
            this.setState({
              confirmed: false,
              deduct: false,
              confirmationPrompt: false
            });
        }
    }
    
    openModal = modalType => () => {
        this.test(modalType);
        this.setRoles(this.state.title)
    }

    refresh = (ev) => {
        this.fetchRoles()
    }

    setRolesDefault(){
        this.setState({
            btnExit: [false, false, false, false, false, false, false, false, false, false],
            rolesBtn: [false, false, false, false, false, false, false, false, false, false],
            roles: [],
            userName: ["", "", "", "", "", "", "", "", "", ""],
        })
    }

    async setRoles(roleName){

        const roleInfo = {
            roleName: roleName,
            theme: "",
            wordOfTheDay: "",
            spTitle: "",
            spProjectNo: "",
            spPathway: "",
            spObjective: ""
        }

        let isSuccess =  await SetRolesHTTP(roleInfo)
        console.log(isSuccess);
        
        if(isSuccess){
            this.fetchRoles() // update role to page
        }
    }

    getMeeting() {
         this.setState({
             date: Cookies.get("GetMeeting")
         })
    }

    async fetchRoles() {
        await GetRolesHTTP();

        if(Cookies.get("GetRoles")){
            const roles = JSON.parse(Cookies.get("GetRoles"))
            this.setRolesDefault()
            this.setState({
                roles : roles
            })
            console.log(this.state.roles);
            
            this.distributeRole(roles)
        }
    }

    distributeRole(roles){
        if(roles.length === 0){
            console.log(roles.length)
            return "";
        }
        for(var i = 0; i < roles.length; i++){
                for(var x = 0; x < this.state.rolesBtn.length; x++){
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
            //}
        }

        this.setState({
            loader: true
        })
    }

    groupFunction = (newName,bg,newTitle) => () =>{
        this.test(newName);
        this.onChangeStyle(bg,newTitle);
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    render(){
        if (!this.props.show){
            return null;
        }

        // if (!this.state.loader){
        //     return null
        // }

        return(
            <div>
                <div className={  styles.animateTop}>
                    <div className={ styles.background}>
                        <div className={ styles.dateText} >{this.state.date}</div> 
                        <div className={ styles.rolesText}>Roles</div>
                        <div className={ styles.skeText}>Speakers & Evaluators</div>
                        
                        <div className={styles.TME} >
                            <div className={styles.rolesName}>{this.state.rolesName[0]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[0] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[0], "#772432")}
                            >Apply</button>
                            

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[0] ? "inline" : "none"}}
                            >{this.state.userName[0]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[0] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[0], "#772432")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>
                        </div>

                        <div className={styles.SAA}>
                            <div className={styles.rolesName}>{this.state.rolesName[1]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[1] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[1], "#004165")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[1] ? "inline" : "none"}}
                            >{this.state.userName[1]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[1] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[1], "#004165")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>
                        </div>

                        <div className={styles.GMN}>
                            <div className={styles.rolesName}>{this.state.rolesName[2]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[2] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[2], "#CD202C")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[2] ? "inline" : "none"}}
                            >{this.state.userName[2]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[2] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[2], "#CD202C")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>
                        </div>

                        <div className={styles.AC}>
                            <div className={styles.rolesName}>{this.state.rolesName[3]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[3] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[3], "#F2DF74")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[3] ? "inline" : "none"}}
                            >{this.state.userName[3]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[3] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[3], "#F2DF74")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>
                        </div>

                        <div className={styles.GE}>
                            <div className={styles.rolesName}>{this.state.rolesName[4]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.btnExit[4] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[4], "#772432")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[4] ? "inline" : "none"}}
                            >{this.state.userName[4]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[4] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[4], "#772432")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>
                        </div>

                        <div className={styles.TM}>
                            <div className={styles.rolesName}>{this.state.rolesName[5]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[5] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[5], "#004165")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[5] ? "inline" : "none"}}
                            >{this.state.userName[5]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[5] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[5], "#004165")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>
                        </div>

                        <div className={styles.SP1}>
                            <div className={styles.rolesName}>{this.state.rolesName[6]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[6] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[6], "#CD202C")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[6] ? "inline" : "none"}}
                            >{this.state.userName[6]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[6] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[6], "#CD202C")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>

                            <button className={styles.btnEvaluate}>Evaluate</button>
                        </div>

                        <div className={styles.SP2}>
                            <div className={styles.rolesName}>{this.state.rolesName[7]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[7] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[7], "#F2DF74")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[7] ? "inline" : "none"}}
                            >{this.state.userName[7]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[7] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[7], "#F2DF74")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>

                            <button className={styles.btnEvaluate}>Evaluate</button>
                        </div>

                        <div className={styles.SP3}>
                            <div className={styles.rolesName}>{this.state.rolesName[8]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[8] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[8], "#772432")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[8] ? "inline" : "none"}}
                            >{this.state.userName[8]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[8] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[8], "#772432")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>

                            <button className={styles.btnEvaluate}>Evaluate</button>
                        </div>
                        
                        <div className={styles.SP4}>
                            <div className={styles.rolesName}>{this.state.rolesName[9]}</div>
                            <button  className={styles.btnApply} 
                            style = {{display: this.state.rolesBtn[9] ? "none" : "inline"}}
                            onClick={this.groupFunction("RoleTheme",this.state.rolesName[9], "#004165")}
                            >Apply</button>  

                            <button  className={styles.btnApply} 
                            disabled
                            style = {{display: this.state.rolesBtn[9] ? "inline" : "none"}}
                            >{this.state.userName[9]}</button>

                            <button className={styles.btnExit}
                            style = {{display: this.state.btnExit[9] ? "inline" : "none"}}
                            onClick={this.groupFunction("ConfirmationPrompt",this.state.rolesName[9], "#004165")}
                            >
                                <div className={styles.btnIcon}></div>
                            </button>

                            <button className={styles.btnEvaluate}>Evaluate</button>
                        </div>
                    </div>
                </div>

                <RoleTheme 
                    show= {this.state.roleTheme} 
                    onClose={this.openModal("ReConfirm")}
                    title= {this.state.title}
                    background = {this.state.background}
                    />
                <ReConfirm show= {this.state.reConfirm} 
                    back={this.openModal("ReConfirmBack")} 
                    onClose={this.openModal("Confirmed")}
                    title= {this.state.title}
                    background = {this.state.background}
                    />
                <Confirmed 
                    show= {this.state.confirmed} 
                    onClose={this.openModal("CloseModal")}
                    title= {this.state.title}
                    background = {this.state.background}
                    />
                <ConfirmationPrompt
                    show= {this.state.confirmationPrompt} 
                    onClose={this.openModal("Deduct")}
                    title= {this.state.title}
                    back={this.openModal("CloseModal")}
                />
                <Deduct
                    show= {this.state.deduct} 
                    onClose={this.openModal("CloseModal")}
                    title= {this.state.title}
                    date={this.state.date}
                    refresh={this.refresh}
                />
                <Gain
                    show= {false} 
                    onClose={this.openModal("CloseModal")}
                    title= {this.state.title}
                />
            </div>
        )
    }
}

export default Main;