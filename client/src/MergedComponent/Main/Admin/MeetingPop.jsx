import React, { useState, useEffect } from 'react';
import CustomButton from "../../../MergedComponent/MiniComponents/CustomButton"
import CustomButtonBig from "../../../MergedComponent/MiniComponents/CustomButtonBig"
import classnames from "classnames";
import {GetAllUserNameHTTP} from "../../../HTTP/GetAllUserName";
import {CompleteMeetingHTTP} from "../../../HTTP/CompleteMeeting";
import AsyncSelect from 'react-select/async';

const customStyles = {
    container: (provided) => ({
        ...provided,
        width: "40vw",
        borderBottom: "2px solid white",
        font: "Bold 30px Montserrat",
        color: "white",
        background: "#004165",
        opacity: "1",
        margin:"1rem"
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      borderRadius: '0',
      minHeight: '1px',
      height: '71px',
      boxShadow: 'none',
      position: "unset",
      font: "Bold 30px Montserrat",
      background: "#004165",
      color: "red",
    }),
    placeholder:(provided) => ({
        ...provided,
        color: "#A9B2B1",
    }),
    input:(provided) => ({
        ...provided,
        color: "white",
        font: "Bold 30px Montserrat",
    }),
    menu:(provided) => ({
        ...provided,
        color: "white",
        font: "Bold 30px Montserrat",
    }),
    singleValue:(provided) => ({
        ...provided,
        color: "white",
        font: "Bold 30px Montserrat",
    }),
    option:(provided) => ({
        ...provided,
        color: "#004165",
        font: "Bold 30px Montserrat",
        backgroundColor:"white",
        borderBottom:"1px solid #A9B2B1",
        ':active': {
            ...provided[':active'],
            color: "#004165",
            font: "Bold 30px Montserrat",
            backgroundColor: "#A9B2B1",
        },
        ':hover': {
            ...provided[':active'],
            color: "#004165",
            font: "Bold 30px Montserrat",
            backgroundColor: "#A9B2B1",
        },
    }),
};

const MeetingPop = (props) => {
    const [height, setheight] = useState(80);
    const [inputfeild, setinputfeild] = useState(0);
    const [options, setoptions] = useState([]);
    const [bestSpeaker, setbestSpeaker] = useState(null);
    const [bestEvaluator, setbestEvaluator] = useState(null);
    const [bestTT, setbestTT] = useState(null);
    
    let modalHeight = [80,78,75]
    function handleClick(){
        if (inputfeild !== 0) {
            CompleteMeetingHTTP(bestSpeaker,bestEvaluator,bestTT).then(setinputfeild(inputfeild + 1)).then(setheight(modalHeight[inputfeild+1]));
        }
        else{
            setinputfeild(inputfeild + 1);
            setheight(modalHeight[inputfeild+1]);
        }
    }
    function close(){
        setTimeout(()=>{ props.open();},2000)
    }
    function handleClickBack(){
        setinputfeild(inputfeild - 1);
        setheight(modalHeight[inputfeild-1])
    }
    async function getUserName (){
        const userInfo = await GetAllUserNameHTTP();

        if(!userInfo){
            console.log("null")
            return;
        }
        let newOption = [];

        for(let i = 0; i<userInfo.length;i++){
            newOption.push({
                value: userInfo[i]._id,
                label: userInfo[i].information.firstname + " " + userInfo[i].information.middlename + " " + userInfo[i].information.lastname,
                }
            )
        }
        setoptions(newOption);
        return newOption;
    }
    
    function handleChange (newValue,actionMeta,id) {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.name}`);
        console.groupEnd();
        // console.log(actionMeta);
        
        if(newValue!==null) {
            if (actionMeta.name === "Best Speaker") {
                setbestSpeaker(newValue.value)
            }
            if (actionMeta.name === "Best Evaluator") {
                setbestEvaluator(newValue.value)
            }
            if (actionMeta.name === "Best Table Topics") {
                setbestTT(newValue.value)
            }
        }else{
            setbestTT(null);
            setbestEvaluator(null)
            setbestSpeaker(null)
        }
    };
    function handleInputChange (inputValue){
        const inputValue2 = inputValue.replace(/\W/g, '');
        // setinput(inputValue2)
        return inputValue2;
    };
    async function promiseOptions (inputValue) {
        let options = await getUserName();
        if (options) {
            return options.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
              );
        }
    };       

    useEffect(()=>{
        getUserName();
    },[])
    
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
            {inputfeild === 0 &&
                <AsyncSelect
                    isClearable
                    name={"Best Speaker"}
                    placeholder={"Select Best Speaker..."}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    defaultOptions={options}
                    styles={customStyles}
                    loadOptions={promiseOptions}
                />
            }
            {inputfeild === 0 &&
                <AsyncSelect
                    isClearable
                    name={"Best Evaluator"}
                    placeholder={"Select Best Evaluator..."}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    defaultOptions={options}
                    styles={customStyles}
                    loadOptions={promiseOptions}
                />
            }
            {inputfeild === 0 &&
                <AsyncSelect
                    isClearable
                    name={"Best Table Topics"}
                    placeholder={"Select Best Table Topics..."}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    defaultOptions={options}
                    styles={customStyles}
                    loadOptions={promiseOptions}
                />
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

export default MeetingPop;