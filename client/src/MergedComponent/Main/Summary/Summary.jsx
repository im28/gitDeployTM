import React, { useState,useEffect} from "react";
import styles from "../../MiniComponents/miniComponents.module.sass"
import "./Summary.sass"
import classnames from "classnames";
import SummaryElement from './SummaryElement'
import Cookies from "js-cookie";
import {UserHTTP} from '../../../HTTP/User'

let colors=["#772432","#004165","#CD202C","#F2DF74"]



let name = ["Toastmaster of the evening","Surgent At Arms","Grammarian","Ah-Counter" ,"General Evaluator","Topic Master","Timer"]
// let maxPercent= 30;
const Summary = (props) => {
    const [toastmaster, settoastmaster] = useState(0);
    const [surgentAtArms, setsurgentAtArms] = useState(0);
    const [grammarian, setgrammarian] = useState(0);
    const [ahCounter, setahCounter] = useState(0);
    const [generalEvaluator, setgeneralEvaluator] = useState(0);
    const [topicsMaster, settopicsMaster] = useState(0);
    const [timer, settimer] = useState(0);
    const [speeches, setspeeches] = useState(0);
    const [evaluations, setevaluations] = useState(0);
    let arr=[toastmaster,surgentAtArms,grammarian,ahCounter,generalEvaluator,topicsMaster,timer,speeches,evaluations]
    useEffect(()=>{
        const experience = JSON.parse(Cookies.get("experience"))
        console.log(experience);
        
        settoastmaster( experience.toastmaster)
        setsurgentAtArms( experience.surgentAtArms)
        setgrammarian( experience.grammarian)
        setahCounter( experience.ahCounter)
        setgeneralEvaluator( experience.generalEvaluator)
        settopicsMaster( experience.topicsMaster)
        setspeeches( experience.speeches)
        setevaluations( experience.evaluations)
        settimer(experience.timer)
        update();
    },[])
    async function update() {
        await UserHTTP();
    }
    return(
    <div className={classnames(styles.bg)}>
        <p className={styles.tag} style={{ marginTop: "4rem",fontSize: "2rem"}}>Summary</p>
        <div className= { "summarygrid"}>
            <p className={styles.tag} style={{  margin: "0"}}>Roles</p>
                {name.map((item,index)=>
                    <SummaryElement
                        color={colors[1]}
                        name={item}
                        key={index}
                        count={arr[index]}
                    />
                )}
            <p className={styles.tag} style={{  margin: "0"}}>Speeches & Evaluations</p>
                <SummaryElement
                    color={colors[1]}
                    name={"Speeches"}
                    count={speeches}
                />
                <SummaryElement
                    color={colors[1]}
                    name={"Evaluations"}
                    count={evaluations}
                />
        </div>
    </div>
)};

export default Summary;