import React from 'react'

export default function SummaryElement(props) {
    let x = props.count / 10 *4
    return (
        <div style={{  margin: "0",color:props.color}} className= { "summaryitem"} >
                <i className="fas fa-circle" style={{  paddingRight:"1rem" }} ></i>
                <span style={{  paddingRight:"0rem" }}>
                    {props.name}
                </span>
                <div className="progressBar" style={{  marginLeft: "auto"}}>
                    <div  className="progressBar" style={{  background: props.color ,position:"absolute",minWidth: `${x}rem` }}/ >
                </div>
                <span style={{  paddingLeft:"1rem" }}>
                    {"x "+props.count}
                </span>
        </div>
    )
}
