import React, {Component} from 'react';
import styles from "./profile.module.sass"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import GE from "./GE";
import BE from "./BE";
import axios from 'axios'
import {getIP} from "../../ipAddressPic";
import {UserHTTP} from '../../HTTP/User'

class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            transform: "",
            color: false,
            selectedFile:null,
            fileName: "",
            imageLocation:""
        };
    }

    state = {
        firstname: "",
        lastname: "",
        totalRoles: 0,
        points: 0,
        trophies: 0

    }

    componentDidMount() {
        let id =Cookies.get("userId")
        this.setState({
            imageLocation: `url(${getIP()}/pics/${id}.jpg)`
        })
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
        this.userGamification();
        UserHTTP();
    }

    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 375;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }

    changeColor = () =>{
        this.setState({
            color: !this.state.color
        })
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
    UploadHandeler = (e) =>{
        let id =Cookies.get("userId")     
        const formData = new FormData();
        if (this.state.selectedFile&&id&&this.state.fileName) {
            let extention = this.state.fileName.substring(this.state.fileName.length-4);
            formData.append('file', this.state.selectedFile,id+extention);
            axios.post(`${getIP()}/upload`,formData).catch(()=>{
                this.setState({
                    imageLocation: `url(${getIP()}/pics/${id}.jpg)`
                })
            }).then(()=>{
                window.location.reload(); 
            })
        }
    } 
    fileChange = (e) =>{
        this.setState({
            selectedFile: e.target.files[0],
            fileName: e.target.files[0].name,
        })
    }
    ProfileClick= (e) =>{
        this.refs.fileUploader.click();
    }
    IconClick= (e) =>{
        this.refs.Uploader.click();
    }

    render(){

        const summary = { 
            pathname: "/Summary"
        };

        const main = { 
            pathname: "/Main"
        };

        return(
            <div style={{transform: this.state.transform, position: "absolute"}}>
            <div className = {styles.background}></div>
                <div className = {styles.profilePic} style={{backgroundImage:this.state.imageLocation}} onClick={this.ProfileClick}>
                    <div className = {styles.userName}>{this.state.firstname}</div>
                </div>
                {
                        this.state.selectedFile &&
                        <i className="fas fa-upload" style={{color: "#004165",position: "absolute",fontSize: "2rem",left: "40px",top: "350px",zIndex:"2",cursor: "pointer"}} onClick={this.IconClick}></i>
                }
                <input type="file" name="file" accept="image/*" ref="fileUploader" onChange={this.fileChange} style={{display:"none"}}/>
                <button onClick={this.UploadHandeler} ref="Uploader" style={{display:"none"}} >Upload</button>
                <div className = {styles.profilePicGradient}></div>
                <div className = {styles.menu}>
                    <div className = {styles.youBox} >
                        <div className = {styles.youText}>{this.state.firstname}</div>
                        <div className = {styles.you}>
                            <div className = {styles.profileLogo} style={{backgroundImage:this.state.imageLocation}}></div>
                        </div> 
                    </div>
                    <Link to={main}>
                        <div className = {styles.nextWeekBox}>
                            <div className = {styles.nextWeekText}>Next Week</div>
                            <div className = {styles.nextWeek}>
                                <div className = {styles.nextWeekLogo}>
                                    <i className="fas fa-calendar-alt" style={{color:"#002133", fontSize:"1.5rem"}}></i>
                                </div>
                            </div> 
                        </div>
                    </Link>
                    <Link to={summary}>
                        <div className = {styles.summaryBox}>
                            <div className = {styles.summaryText}>Summary</div>
                            <div className = {styles.summary}>
                                <div className = {styles.summaryLogo}>
                                    <i className="fas fa-book-open" style={{color:"#002133", fontSize:"1.5rem"}}></i>
                                </div>
                            </div> 
                        </div>
                    </Link>
                </div>
                
                <div className = {styles.statusContainer}>
                    <div className = {styles.totalRoleContainer}>
                        <div className = {styles.statusValue}>{this.state.totalRoles}</div>
                        <div className = {styles.statusTxt}>Roles taken</div>
                    </div>
                    <div className = {styles.pointsContainer}>
                        <div className = {styles.statusValue}>{this.state.points}</div>
                        <div className = {styles.statusTxt}>Points</div>
                    </div>
                    <div className = {styles.trophiesContainer}>
                        <div className = {styles.statusValue}>{this.state.trophies}</div>
                        <div className = {styles.statusTxt}>Trophies</div>
                    </div>
                </div>
                <div className = {styles.barContainer}>
                    <div className = {styles.performanceBtn} 
                    style={{backgroundColor: this.state.color ? "#CD202C" : "#772432"}}
                    onClick={this.changeColor}
                    >
                    <div className = {styles.nextRoleTxt}>Performance</div>
                    </div>

                    <div className = {styles.nextRoleBtn}
                    style={{backgroundColor: this.state.color ? "#772432" : "#CD202C"}}
                    onClick={this.changeColor}
                    >
                    <div className = {styles.nextRoleTxt}>Next Role</div>
                    </div>
                </div>
                <GE 
                show= {!this.state.color}
                ></GE>
                <BE 
                show= {this.state.color}
                ></BE>
                <br/>
            </div>
        )
    }
}

export default Profile;