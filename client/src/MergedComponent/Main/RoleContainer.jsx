import React, { useState} from "react";
import styles from "../MiniComponents/miniComponents.module.sass"
import CustomButton from "../MiniComponents/CustomButton"
import classnames from "classnames";
import "../MiniComponents/common.sass"
import PopUp from "../MiniComponents/Apply/PopUp"
import PopUpM from "../MiniComponents/Apply/PopUpM"
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import Cookies from "js-cookie";

let colors=["#772432","#004165","#CD202C","#F2DF74"]
let inputElementsRoles = [["Theme"],[],["Word of the day"],[],[],[],[]]
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
    // const x = props.myRole
    const closeModal = () =>{
        setopen(false);
    }
    const openModal = () =>{
        setopen(true);
    }
    const closeexit = () =>{
        setopenExit(false);
        let d =Cookies.get("Deduct");
        console.log(d);
        console.log(d!== "1");
        console.log(d === "1");

        if (d !== "1" ) {
            setopenDeduct(true);
            console.log("sadas");
        }
    }
    function closeDeduct() {
        setopenDeduct(false)
    }
    const openexit = () =>{
        setopenExit(true);
    }
    const closeModalE = () =>{
        setopenEvaluate(false);
    }
    const openModalE = () =>{
        setopenEvaluate(true);
    }
    const Evaluator = () =>{
        if (props.isSpeaker) {
            if (props.isMyRole) {
                return(
                    <CustomButton 
                    value={"Withdraw "} 
                    icon={<i className="fas fa-sign-out-alt"></i>}
                    style={{
                        marginBottom: "1.75rem",
                        justifySelf: "flex-end"}}
                    color= {props.colorname}
                    onClick={openexit}
                    />
                )
            }
            else{
                return(
                    <CustomButton 
                    value={props.evaluator?  props.evaluator :"Evaluate"} 
                    style={{
                        marginBottom: "1.75rem",
                        justifySelf: "flex-end"}}
                    color= {props.evaluator || props.disabled || meetingDis ? "DisabledButton" :props.colorname}
                    onClick={openModalE}
                    />
                )
            }
        }
    }
    if (!props.loading) {
        return(
            <div 
            className={classnames(styles.roleContainer,props.class)} 
            style={{backgroundColor:props.color,height:(props.isSpeaker) ? "15rem":""}}>
                    {
                        open &&
                        <PopUp
                            open={closeModal}
                            title= {props.name}
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
                            background = {colors[2]}
                            colorname = {"TMred"}
                            type={"exit"}
                        />
                    }
                    {openDeduct &&
                        <PopUpM header={"OH NsO!!"}
                        title={"You Missed Your Role"}
                        colorname={"TMred"}
                        background={"#CD202C"}
                        icon={"fas fa-heart-broken"}
                        points={"-15 Points"}
                        open={closeDeduct}/>
                    }
                    <p className={styles.roleTag}>{props.name ? props.name:"hello"}</p>

                    <i className={classnames(styles.icon,props.icon)} ></i>

                    
                    { props.isMyRole && !props.evaluator ?
                            <CustomButton
                            value={"Withdraw "} 
                            icon={<i className="fas fa-sign-out-alt"></i>}
                            style={{
                                marginBottom: (props.isSpeaker) ? "0.5rem" :"1.75rem",
                                justifySelf: "flex-end"}}
                            color= {props.colorname}
                            onClick={openexit}
                            />
                            :
                            <CustomButton
                            value={props.rolePlayer?  props.rolePlayer :"Apply"} 
                            style={{
                                marginBottom: (props.isSpeaker) ? "0.5rem" :"1.75rem",
                                justifySelf: "flex-end"}}
                            color= {props.rolePlayer || props.disabled || meetingDis ?  "DisabledButton" :props.colorname}
                            onClick={openModal}
                            />
                    }
                    {   
                        Evaluator()
                    }    
            </div>
        )}
    else return(      
        <div 
            className={classnames(styles.roleContainer,props.class)} 
            style={{backgroundColor:props.color,height:(props.isSpeaker) ? "15rem":""}}>
            <HalfCircleSpinner
            color='#fff'
            size={150}
            style={{
                zIndex:1,
                top: "50%",
                transform: `translate(0,-50%)`,
            }}
            />
        </div>
    )
};

export default RoleContainer;