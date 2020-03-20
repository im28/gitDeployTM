import React, { useState, useEffect } from 'react';
import styles from "./profile.module.sass"
import Cookies from "js-cookie";

function BE (props){
    const [performance, setperformance] = useState(null);
    
    useEffect(() => {
        if(Cookies.get("GetPerformances")){
            const p = JSON.parse(Cookies.get("GetPerformances"))
            console.log(p);
            setperformance(p);
        }
    }, [])
    if(!props.show){
        return null;
    }
    
    return(
        <div className={ styles.performanceContainer}>
            {
                performance&&
                performance.map((performance,index) => 
                    <div key={index*5} className = {styles.beContainer}>
                            <div className = {styles.beTitle}>{performance.title}</div>
                            <div className = {styles.beTitle} style={{top:"45px",font: "lighter 0.6rem Montserrat"}}>{performance.date}</div>
                            <div className={ styles.beTitle} style={{top:"85px",font: "lighter 0.9rem Montserrat"}}>Well Done You Won {performance.title}</div>
                    </div>
                )
            }
        </div>
    )
    
}

export default BE;