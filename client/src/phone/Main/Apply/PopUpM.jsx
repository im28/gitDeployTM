import React, { useEffect } from 'react';
import "./PopUp.sass"
import CustomButton from "../../../MergedComponent/MiniComponents/CustomButton"
import classnames from "classnames";



const PopUpM = (props) => {

    function close(){
        console.log("dasd");
        props.open()
    }

    
    useEffect(()=>{

    })
    
    return(
    <div className={classnames("containerPopUp1")} >
        <div className={"blur1M"} onClick={close}></div>
        <div className={"backgroundM1"}  style={{backgroundColor: props.background}} >
            <div className={"roleName"}style={{whiteSpace: "pre-line",marginTop: "1rem",fontSize: "2rem"}}>{props.header}</div>
            <div className={"date"}style={{whiteSpace: "pre-line",marginBottom: "3rem",fontSize: "1.5rem"}}>{props.title}</div>
            <i className={props.icon} style={{fontSize: "3rem",color:"white"}}/>
            <p style={{fontSize: "1rem",color:"white",fontFamily: "Montserrat"}}>{props.points}</p>
            <CustomButton 
                icon= {<i className="far fa-check-circle" style={{fontSize: "3rem"}}></i>}
                style={{
                    lineHeight: "2rem",
                    margin: "auto 0 auto 0",
                    borderRadius: "10rem",
                    fontSize: "1.3rem"
                    }}
                color= {props.colorname}
                onClick={close}
                />
        </div>   
    </div>
)};

export default PopUpM;