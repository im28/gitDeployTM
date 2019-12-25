import React from "react";
import "./common.sass"
const ExitIcon = (props) => {
    
    return(
    <svg xmlns="http://www.w3.org/2000/svg"  className={props.colorname}>
        <path id="Icon_metro-exit" data-name="Icon metro-exit" d="M25.707,21.208V17.352h-9.64V13.5h9.64V9.64l5.784,5.784ZM23.779,19.28v7.712h-9.64v5.784L2.571,26.992V1.928H23.779v9.64H21.851V3.856H6.427l7.712,3.856V25.064h7.712V19.28Z" transform="translate(-2.571 -1.928)" fill={props.color}/>
    </svg>
);
}

export default ExitIcon;