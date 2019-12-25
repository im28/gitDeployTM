import React from "react";
// import classnames from "classnames";
import styles from "./miniComponents.module.sass"


const TagComponent = (props) => (
    <p className={ styles.tagComponent} style={props.style}>
        {props.value}
    </p>
);

export default TagComponent;