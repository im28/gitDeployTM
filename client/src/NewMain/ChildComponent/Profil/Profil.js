import React, {Component} from 'react';
import styles from "./profil.module.sass"
import Cookies from "js-cookie";

class Profil extends Component{

    state = {
        firstname: "",
        lastname: "",
        totalRoles: 0,
        points: 0,
        trophies: 0,
        selectedFile: null
    }

    componentDidMount() {
        this.userGamification();
    }

    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    }

    userGamification() {
        const gamification = JSON.parse(Cookies.get("gamification"));
        const information = JSON.parse(Cookies.get("information"));

        this.setState({
            firstname: information.firstname,
            lastname: information.lastname,
            totalRoles: gamification.totalRoles,
            points: gamification.points,
            trophies: gamification.trophies
        })
    }

    fileSelectedHandler = event =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    render(){
        if (!this.props.show){
            return null;
        }

        return(
            <div >
                <div className={ styles.animateTop}>
                    <div className={ styles.background} >
                        <input className={ styles.changePic} type="file" onChange={this.fileSelectedHandler}/>
                        <div className={ styles.profilPic}></div>
                        <div className={ styles.profilPicStyle}>{this.state.firstname}</div>
                        <div className={ styles.statusRole}>{this.state.totalRoles}</div>
                        <div className={ styles.statusPoint}>{this.state.points}</div>
                        <div className={ styles.statusTrophies}>{this.state.trophies}</div>
                        <div className={ styles.statusRoleTxt}>Roles taken</div>
                        <div className={ styles.statusPointTxt}>Points</div>
                        <div className={ styles.statusTrophiesTxt}>Trophies</div>
                        <div className={ styles.dividerLeft}></div>
                        <div className={ styles.dividerRight}></div>
                        <div className={ styles.performance}>Performance</div>
                        <div className={ styles.nextRole}>Next Role</div>
                        <div className={ styles.performanceContainer}>
                            <div className={ styles.userPerformance}></div>
                            <div className={ styles.userPerformance}></div>
                            <div className={ styles.userPerformance}></div>
                        </div>
                        <div className={ styles.userRoles}>
                            General Evaluator
                            <div className={ styles.userRolesContainer}>As a general evaluator your roles will be: 
                                <div>1.</div>
                                <div>2.</div>
                                <div>3.</div>
                                <div>4.</div>
                            </div>
                            <button className={ styles.buttonScript} onClick={this.userInformation}>Download Script</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profil;