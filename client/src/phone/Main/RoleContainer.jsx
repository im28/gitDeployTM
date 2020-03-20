import React, { useState} from "react";
// import styles from "../MiniComponents/miniComponents.module.sass"
import CustomButton from "../../MergedComponent/MiniComponents/CustomButton"

import PopUp from "./Apply/PopUp.jsx"
import PopUpM from "./Apply/PopUpM.jsx"
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import Cookies from "js-cookie";
import  "./main.sass"
import disableScroll from 'disable-scroll'


let colors=["#CD202C","#004165","#772432","#F2DF74"]
let inputElementsRoles = [[],[],[],[],["Word of the day"],[],["Theme"],[]]
let inputElementsSpeakers = ["Title","Project Number", "Pathway" ,"Objective"]
const RoleContainer = (props) => {
    const [open, setopen] = useState(false);
    const [openEvaluate, setopenEvaluate] = useState(false);
    const [openExit, setopenExit] = useState(false);
    const [openDeduct, setopenDeduct] = useState(false);

    let meetingDis = false
    if (Cookies.get("GetMeeting") ==="No meeting!!") {
        meetingDis= true;
    }
    const closeModal = () =>{
        setopen(false);
        disableScroll.off()
    }
    const openModal = () =>{
        setopen(true);
    }
    const closeexit = () =>{
        setopenExit(false);
        disableScroll.off()
        let d =Cookies.get("Deduct");
        if (d !== "1" ) {
            setopenDeduct(true);
            console.log("sadas");
        }
    }
    const openexit = () =>{
        setopenExit(true);
    }
    const closeModalE = () =>{
        setopenEvaluate(false);
        disableScroll.off()
    }
    const openModalE = () =>{
        setopenEvaluate(true);
    }
    const Evaluator = () =>{
        if (props.isSpeaker) {
            if (props.isMyRole&& props.evaluator ) {
                return(
                    <CustomButton 
                    value={"Withdraw"} 
                    icon={<i className="fas fa-sign-out-alt"></i>}
                    style={{left: "65px",top: "135px",}}
                    color= {props.colorname}
                    onClick={openexit}
                    />
                )
            }
            else{
                return(
                    <CustomButton 
                    value={props.evaluator?  props.evaluator :"Evaluate"} 
                    style={{left: "65px",top: "135px",}}
                    color= {props.evaluator || props.disabled || meetingDis ? "DisabledButton" :props.colorname}
                    onClick={openModalE}
                    />
                )
            }
        }
    }
    
    if (!props.loading) {
        
        return(
            <div className = {props.mainStyle}>
                    {
                        open &&
                        <PopUp
                            open={closeModal}
                            title= {props.title}
                            date={Cookies.get("GetMeeting")}
                            icon={props.icon}
                            inputElements ={props.isSpeaker ? inputElementsSpeakers : inputElementsRoles[props.id]}
                            background = {props.color}
                            colorname = {props.colorname}
                            type={"role"}
                        />
                    }
                    {
                        openEvaluate &&
                        <PopUp
                            open={closeModalE}
                            title= {"Evaluator " +props.id}
                            date={Cookies.get("GetMeeting")}
                            icon={"fas fa-sticky-note"}
                            inputElements ={[]}
                            background = {props.color}
                            colorname = {props.colorname}
                            type={"role"}
                        />
                    }
                    {
                        openExit &&
                        <PopUp
                            open={closeexit}
                            title= {"Are you sure you want to\n leave your role as a \n" + props.myRole}
                            date={Cookies.get("GetMeeting")}
                            icon={"fas fa-exclamation-triangle"}
                            inputElements ={[]}
                            background = {colors[0]}
                            colorname = {"TMred"}
                            type={"exit"}
                        />
                    }
                    {
                        openDeduct &&
                        <PopUpM header={"OH NO!!"}
                        title={"You Missed Your Role"}
                        colorname={"TMred"}
                        background={colors[0]}
                        icon={"fas fa-heart-broken"}
                        points={"-15 Points"}
                        open={()=>setopenDeduct(false)}
                        />
                    }
        
                    
                        <div className = {"roleTitle"}>{props.title}</div>
                        <div className = {"logoStyle"} style={{top:"85px"}}>
                            {/* <div className = {"gimg"}></div> */}
                            <i className={props.icon} style={{color:"white",fontSize:"2rem"}}></i>
                        </div>
                        { props.isMyRole && !props.evaluator ?
                            <CustomButton
                            value={"Withdraw "} 
                            icon={<i className="fas fa-sign-out-alt"></i>}
                            style={{left: "48px",
                                top: "135px",}}
                            color= {props.colorname}
                            onClick={openexit}
                            />
                            :
                            <CustomButton
                            value={props.rolePlayer?  props.rolePlayer :"Apply"} 
                            style={{    left: "48px",
                                top: "135px",}}
                            color= {props.rolePlayer || props.disabled || meetingDis ?  "DisabledButton" :props.colorname}
                            onClick={openModal}
                            />

                        }
                        {Evaluator()}    
            </div>
            
        )}
    else return(      
        <div className = {props.mainStyle}>
            <HalfCircleSpinner
            color='#fff'
            size={60}
            style={{
                zIndex:1,
                top: "67%",
                left: "50%",
                transform: `translate(-50%,-50%)`,
            }}
            />
        </div>
    )
};

export default RoleContainer;