import React from "react";
import styles from "./miniComponents.module.sass"
import classnames from "classnames";
import "./common.sass"

const CustomButton = (props) => {
    
    return(
    
    <button 
    // className={classnames(styles.customButton ) } 
    className={classnames(styles.customButton, props.color ) } 
    style = {props.style}
    onClick={props.onClick}
    >
        {props.value}
        {props.icon}
    </button>
);
}

export default CustomButton;