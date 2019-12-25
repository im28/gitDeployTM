import React from "react";
import styles from "./miniComponents.module.sass"
import classnames from "classnames";


const CustomButtonBig = (props) => (
    <button 
    className={classnames(styles.customButtonBig, props.color ) } 
    style={props.style} 
    onClick={props.onClick}
    >
        {props.value}
        {props.value1}
    </button>
);

export default CustomButtonBig;