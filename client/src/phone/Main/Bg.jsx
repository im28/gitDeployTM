import React, { useState, useEffect } from 'react';
import RoleContainer from './RoleContainer'
import Cookies from "js-cookie";
import {GetRolesHTTP} from '../../HTTP/GetRoles'
import PopUpM from "./Apply/PopUpM.jsx"
import {ResetFlagsHTTP} from '../../HTTP/ResetFlags'

let colors=["#772432","#004165","#CD202C","#F2DF74"]
let colorname=["TMpurple","TMblue","TMred","TMyellow","TMgray"]

let name = ["Toastmaster of the evening","Surgent At Arms","Grammarian","Ah-Counter" ,"General Evaluator","Topic Master","Timer"]
let name2 = ["Toastmaster","Surgent At Arms","Grammarian","Ah-Counter" ,"General Evaluator","Topic Master","Timer"]
name2.reverse();
name.reverse()
let icon = ["fas fa-microphone-alt","fas fa-wrench","fas fa-bookmark","fas fa-book","fas fa-glasses","fas fa-question","fas fa-stopwatch"]
let speaker,evaluator,mine,rolePlayer = false;
// let inputElementsRoles = [["Theme"],[],["Word of the day"],[],[],[],[]]
// let inputElementsSpeakers = ["Title","Project Number", "Pathway" ,"Title"]
let best = ["Best Speaker!!","Best Evaluator!!","Best Table Topics!!"]
let roleIndex = [-1,-1,-1,-1,-1,-1,-1]
let speakerIndex = [-1,-1,-1,-1]
let evaluatorIndex = [-1,-1,-1,-1]
let myRole = ""
let styling =["TRBg","TMBg","GEBg","ACBg","GBg","SAABg","TEBg"]

export default function Bg() {
    const [roles, setRoles] = useState([]);
    const [loading, setloading] = useState(true);
    const [flags] = useState(JSON.parse(Cookies.get("flags")));
    function closeA(name) {
        let s = false
        
        flags[name] = false;
        console.log(flags);
        Cookies.set("flags",JSON.stringify(flags))
        for (const key in flags) {
            if (flags[key] === true) {
                s = true;
            }
        }
        if (s===false) {
            ResetFlagsHTTP()
        }
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
                            speakerIndex.reverse()
                        }
                        if (item.roleName === "Evaluator " + i) {
                            item.evaluatorNumber = i;
                            evaluatorIndex[i-1] = index;
                            evaluatorIndex.reverse()
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
    
    useEffect(() => {
        const abortController = new AbortController();
        fetchRoles();

        return () => {
            abortController.abort();
        };
    });
    return (
        <div>
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
             {
                colors.map((item,index) => {
                    // speakerIndex.reverse();
                    // evaluatorIndex.reverse();

                    speaker=evaluator=mine = false;
                    if (roles[speakerIndex[index]] && roles[speakerIndex[index]].speakerNumber !== -1)
                        speaker = roles[speakerIndex[index]].owner.information.firstname
            
                    if (roles[evaluatorIndex[index]] && roles[evaluatorIndex[index]].evaluatorNumber !== -1) 
                        evaluator = roles[evaluatorIndex[index]].owner.information.firstname

                    if (myRole === "Speaker " + parseInt(4-index) || myRole === "Evaluator " + parseInt(4-index))
                        mine = true
                        
                    return(
                    <RoleContainer 
                    title={"Speaker "+ parseInt(4-index)} 
                    mainStyle={"S"+parseInt(4-index)+"Bg"}
                    key={"Speaker"+ parseInt(4-index)} 
                    id={4-index}
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
            {
                name2.map((item,index) => {
                    rolePlayer=mine = false;
                    
                    
                    if (roles[roleIndex[index]] && roles[roleIndex[index]].roleNumber !== -1) {
                        rolePlayer = roles[roleIndex[index]].owner.information.firstname
                        
                    }
                    if (item === myRole || (myRole ==="Toastmaster of the evening" && item==="Toastmaster")) 
                        mine = true
                    
                    return(
                        <RoleContainer 
                        title={item} 
                        mainStyle={styling[index]}
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
                        isSpeaker= {false}
                        />
                )})
            }
           
        </div>
    )
}
