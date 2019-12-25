import React, { useState, useEffect } from 'react';
import "./PopUp.sass"
import CustomButton from "../CustomButton"
import CustomButtonBig from "../CustomButtonBig"
import classnames from "classnames";
import {SetRolesHTTP} from "../../../HTTP/SetRoles";
import {CancelRoleHTTP} from "../../../HTTP/CancelRole";
import {AddUserHTTP} from "../../../HTTP/AddUser";


const PopUp = (props) => {
    // let defaultscreen = 0
    // if (props.inputElements.length < 0) {
    //     defaultscreen = 1
    // }
    const [height, setheight] = useState(80);
    const [inputfeild, setinputfeild] = useState(props.inputElements.length === 0 ? 1:0);
    const [input, setinput] = useState(["","","",""]);
    const [missingI, setmissingI] = useState(false);
    
    const [roleInfo, setroleInfo] = useState({
        roleName: props.title,
        theme: "",
        wordOfTheDay: "",
        spTitle: "",
        spProjectNo: "",
        spPathway: "",
        spObjective: ""
    });
    const [newUser, setnewUser] = useState({
        username:"",
        password: "",
        email: ""
    });
    let modalHeight = [80,78,75]
    function handleClick(){
        if (inputfeild === 0) {
            let missingInput =false;
            for (let i = 0; i < props.inputElements.length; i++) {
                if (input[i] === "") 
                    missingInput =true;
            }
            setmissingI(missingInput)
            
            if (props.title === "Toastmaster of the evening" && !missingInput) {
                setroleInfo({
                    roleName: props.title,
                    theme: input[0],
                    wordOfTheDay: "",
                    spTitle: "",
                    spProjectNo: "",
                    spPathway: "",
                    spObjective: ""
                })
            }
            else if (props.title === "Grammarian" && !missingInput){
                setroleInfo({
                    roleName: props.title,
                    theme: "",
                    wordOfTheDay: input[0],
                    spTitle: "",
                    spProjectNo: "",
                    spPathway: "",
                    spObjective: ""
                })
            }
            else if (props.title.includes("Speaker")&& !missingInput){
                setroleInfo({
                    roleName: props.title,
                    theme: "",
                    wordOfTheDay: "",
                    spTitle: input[0],
                    spProjectNo: input[1],
                    spPathway: input[2],
                    spObjective: input[3]
                })
            }    
            else if (props.type === "new" && !missingInput) {
                setnewUser({
                    email:  input[0],
                    username: input[1],
                    password:  input[2],
                })
            }

            if (!missingInput) {
                console.log(input);
                console.log(props.title);
                setinputfeild(inputfeild + 1);
            }
            
        }
        else{
            if (props.type === "role") {
                SetRolesHTTP(roleInfo).then(setinputfeild(inputfeild + 1)).then(setheight(modalHeight[inputfeild+1]));
            }
            if (props.type === "exit") {
                CancelRoleHTTP().then(setinputfeild(inputfeild + 1)).then(setheight(modalHeight[inputfeild+1]));
            }
            else if (props.type === "new") {
                AddUserHTTP(newUser.username, newUser.password, newUser.email).then(setinputfeild(inputfeild + 1)).then(setheight(modalHeight[inputfeild+1]));
            }
        }
    }
    function close(){
            setTimeout(()=>{ props.open(); },1900)
    }
    function handleClickBack(){
        setinputfeild(inputfeild - 1);
        setheight(modalHeight[inputfeild-1])
    }
    function handleChange(e,index){
        let i = input;
        i.splice(index, 1, e);
        setinput(i);
        console.log(input);
    }
    useEffect(()=>{

    })
    
    return(
    <div className={classnames("containerPopUp",inputfeild===2 ? "fade" : "")} >
        <div className={"blur"} onClick={props.open}></div>
        <div className={"background"}  style={{backgroundColor: `${props.background} `, minHeight: `${height}vh`}} >
            <div className={"date"}>{props.date}</div>
            <div className={"roleName"}style={{whiteSpace: "pre-line"}}>{props.title}</div>
            <i className={classnames("icon",props.icon)} 
                style={{fontSize: "10vh",
                        margin: "auto 0 auto 0",}}
            />

            {(props.inputElements && inputfeild === 0)&&  
                    props.inputElements.map((element,index)=>{

                         return(
                            <input type="text" 
                            name={element} 
                            key={element+index }
                            placeholder={element}
                            className={missingI ? "inputRed":"inputPopUp"} 
                            required
                            id=""
                            // value={input[index]}
                            onChange={(e)=>{
                                handleChange(e.target.value,index)
                            }}
                            />
                        )
                        }
                    ) 
            }
            {(inputfeild !== 2)&&
                <CustomButtonBig 
                value= {inputfeild === 1 ? "Confirm" :"Apply"}
                value1= { (inputfeild === 1) && <i className="far fa-check-circle" style={{fontSize: "2rem",transform: `translate(2rem,15%)`}}></i>}
                style={{
                    lineHeight: "2rem",
                    margin: "auto 0 auto 0",
                    left: "0",
                    transform: `translate(0)`,
                    position: "relative"
                    }}
                color= {props.colorname}
                onClick={handleClick}
                />
            }
            {(inputfeild === 1)&& 
                <CustomButton 
                value="Back" 
                style={{
                    marginBottom: "auto",}}
                color= {props.colorname}
                onClick={handleClickBack}
                />
            }
            {(inputfeild === 2)&&
                <div onClick={close()} className={"roleName"} style={{marginBottom: "5rem"}}>
                    Confirmed <i className="far fa-check-circle"></i>
                </div>
            }
        </div>   
    </div>
)};

export default PopUp;