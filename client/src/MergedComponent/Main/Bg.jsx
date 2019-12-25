import React, { useState, useEffect,useContext } from 'react';
import styles from "../MiniComponents/miniComponents.module.sass"
import classnames from "classnames";
import CustomButton from "../MiniComponents/CustomButton"
import RoleContainer from "./RoleContainer";
// import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import AuthContext from '../../context/auth-context';
import {GetRolesHTTP} from '../../HTTP/GetRoles'
import PopUpM from "../MiniComponents/Apply/PopUpM";
import Cookies from "js-cookie";
import {ResetFlagsHTTP} from '../../HTTP/ResetFlags'

let colors=["#772432","#004165","#CD202C","#F2DF74"]
let colorname=["TMpurple","TMblue","TMred","TMyellow","TMgray"]

let name = ["Toastmaster of the evening","Surgent At Arms","Grammarian","Ah-Counter" ,"General Evaluator","Topic Master","Timer"]
let icon = ["fas fa-microphone-alt","fas fa-wrench","fas fa-bookmark","fas fa-book","fas fa-glasses","fas fa-question","fas fa-stopwatch"]
let speaker,evaluator,mine,rolePlayer = false;
// let inputElementsRoles = [["Theme"],[],["Word of the day"],[],[],[],[]]
// let inputElementsSpeakers = ["Title","Project Number", "Pathway" ,"Title"]
let best = ["Best Speaker!!","Best Evaluator!!","Best Table Topics!!"]
let roleIndex = [-1,-1,-1,-1,-1,-1,-1]
let speakerIndex = [-1,-1,-1,-1]
let evaluatorIndex = [-1,-1,-1,-1]
let myRole = ""
const Bg = (props) => {
    const [roles, setRoles] = useState([]);
    const [loading, setloading] = useState(true);
    const [date, setdate] = useState("");
    const [flags] = useState(JSON.parse(Cookies.get("flags")));
    const contextType = useContext(AuthContext);
    function getMeeting() {
        setdate(Cookies.get("GetMeeting"))
    }
    

    async function fetchRoles() {
        roleIndex = [-1,-1,-1,-1,-1,-1,-1]
        speakerIndex = [-1,-1,-1,-1]
        evaluatorIndex = [-1,-1,-1,-1]
        await GetRolesHTTP();
        setloading(false);
        if(Cookies.get("GetRoles")){
            const role = JSON.parse(Cookies.get("GetRoles"))
            myRole="";
            role.forEach((item,index) =>{
                let roleNumber = name.findIndex((i)=>i === item.roleName)
                if (roleNumber === -1) {
                    for (let i = 1; i <= 4; i++) {
                        if (item.roleName === "Speaker " + i) {
                            item.speakerNumber = i;
                            speakerIndex[i-1] = index;
                        }
                        if (item.roleName === "Evaluator " + i) {
                            item.evaluatorNumber = i;
                            evaluatorIndex[i-1] = index;
                        }
                    }
                }else{
                    item.roleNumber = roleNumber;
                    roleIndex[item.roleNumber] = index;
                }
                if (item.owner._id === Cookies.get("userId")) 
                    myRole = item.roleName; 
            })
            setRoles(role)
            // console.log(role);
        }
    }
    function closeA(name) {
        console.log(name);
        let s = false
        
        flags[name] = false;
        console.log(flags);
        Cookies.set("flags",JSON.stringify(flags))
        console.log(JSON.parse(Cookies.get("flags")));
        for (const key in flags) {
            if (flags[key] === true) {
                s = true;
            }
        }
        if (s===false) {
            ResetFlagsHTTP()
        }
        
    }
    
    useEffect(() => {
        const abortController = new AbortController();
        fetchRoles();
        getMeeting();

        return () => {
            abortController.abort();
        };
    });

    return(
    <div className={classnames(styles.bg)}>
        {!loading &&
            <p className={styles.dateHeader}>{date}</p>
        }
        {   flags["best1"] && !flags["best2"] && !flags["best3"] && !flags["pointsGain"] &&
            <PopUpM header={"GOOD JOB"}
            title={"Well done You WON "+best[0]}
            colorname={colorname[1]}
            background={colors[1]}
            icon={"fas fa-trophy"}
            points={"+1 Trophy"}
            open={()=>closeA("best1")}/>
        }
        {   flags["best2"] && !flags["best3"] && !flags["pointsGain"] &&
            <PopUpM header={"GOOD JOB"}
            title={"Well done You WON "+best[1]}
            colorname={colorname[1]}
            background={colors[1]}
            icon={"fas fa-trophy"}
            points={"+1 Trophy"}
            open={()=>closeA("best2")}/>
        }
        {   flags["best3"] && !flags["pointsGain"] &&
            <PopUpM header={"GOOD JOB"}
            title={"Well done You WON "+best[2]}
            colorname={colorname[1]}
            background={colors[1]}
            icon={"fas fa-trophy"}
            points={"+1 Trophy"}
            open={()=>closeA("best3")}/>
        }
        {   flags["pointsGain"] &&
            <PopUpM header={"GOOD JOB"}
            title={"Well done You Completed Your Role"}
            colorname={colorname[1]}
            background={colors[1]}
            icon={"far fa-thumbs-up"}
            points={"+10 Points"}
            open={()=>closeA("pointsGain")}/>
        }

        <CustomButton 
        value="Logout" 
        icon={<i className="fas fa-door-open"></i>}
        style={{
            margin: "1.2rem 1rem 0 0",
            justifySelf: "flex-end",
            background: colors[1]
        }}
        onClick={contextType.logout}
        color= {colorname[4]}
        />

        <p className={styles.tag} style={{ }}>Roles</p>
        <div className={classnames(styles.gridContainerSpeaker )}>
            {   name.map((item,index) => {
                rolePlayer=mine = false;
                if (roles[roleIndex[index]] && roles[roleIndex[index]].roleNumber !== -1) {
                    rolePlayer = roles[roleIndex[index]].owner.information.firstname
                }
                if (item === myRole) 
                    mine = true
                
                return(
                    <RoleContainer 
                    name={item} 
                    class={"div"+parseInt(index+1)} 
                    key={"Role"+index} 
                    color= {colors[index%4]}
                    colorname= {colorname[index%4]}
                    icon = {icon[index]}
                    rolePlayer={rolePlayer }
                    disabled={myRole!== ""}
                    id={index}
                    loading = {loading}
                    isMyRole = {mine}
                    myRole = {myRole}
                    />
                )})}
        </div>
        <p className={styles.tag}>Speakers & Evaluators</p>
        <div className={classnames(styles.gridContainerSpeaker)}
        style={{  marginBottom: "2.5rem"}}>
            {
                colors.map((item,index) => {
                    speaker=evaluator=mine = false;
                    if (roles[speakerIndex[index]] && roles[speakerIndex[index]].speakerNumber !== -1)
                        speaker = roles[speakerIndex[index]].owner.information.firstname
            
                    if (roles[evaluatorIndex[index]] && roles[evaluatorIndex[index]].evaluatorNumber !== -1) 
                        evaluator = roles[evaluatorIndex[index]].owner.information.firstname

                    if (myRole === "Speaker " + parseInt(index+1) || myRole === "Evaluator " + parseInt(index+1))
                        mine = true
                        
                    return(
                    <RoleContainer 
                    name={"Speaker "+ parseInt(index+1)} 
                    class={"div1"+parseInt(index+1)} 
                    key={"Speaker"+index} 
                    id={index+1}
                    color= {item}
                    colorname= {colorname[index]}
                    isSpeaker= {true}
                    loading = {loading}
                    icon="fas fa-microphone"
                    disabled={myRole!== ""}
                    rolePlayer={speaker}
                    evaluator={evaluator}
                    isMyRole = {mine}
                    myRole = {myRole}
                    />
            )})}
        </div>
    </div>
)};

export default Bg;