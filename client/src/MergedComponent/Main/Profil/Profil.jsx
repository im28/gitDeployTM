import React, {Component} from 'react';
import styles from "./profil.module.sass"
import style from "../../MiniComponents/miniComponents.module.sass"
import CustomButton from '../../MiniComponents/CustomButton'
import Cookies from "js-cookie";
import {GetDescriptionHTTP} from "../../../HTTP/GetDescription"
import {UserHTTP} from '../../../HTTP/User'
import {getIP} from "../../../ipAddressPic";
import axios from 'axios'
let colorname=["TMpurple","TMblue","TMred","TMyellow"];

class Profil extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            totalRoles: 0,
            points: 0,
            trophies: 0,
            selectedFile: null,
            roleName: "No role",
            hasRole: false,
            description: "You have not enrolled in any role!",
            performance: [],
            fileName: "",
            imageLocation:"",
        }
    }
    componentDidMount(){
        let id =Cookies.get("userId")
        
        this.getDescription();
        this.getPerformance();
        const gamification = JSON.parse(Cookies.get("gamification"));
        const information = JSON.parse(Cookies.get("information"));
        this.setState({
            firstname: information.firstname,
            lastname: information.lastname,
            totalRoles: gamification.totalRoles,
            points: gamification.points,
            trophies: gamification.trophies,
            imageLocation: `url(${getIP()}/pics/${id}.jpg)`
        })
        this.boxClick();
        window.addEventListener("resize",  this.boxClick);
    }
    
    
    boxClick = (e) => {
        var ratio = document.documentElement.clientWidth / 1920;
        var scale = 'scale(' + ratio + ')';
        this.setState({
            transform: scale
        })
    }
    
    getDescription = async () => {
        await UserHTTP()
        let roles = []

        if(Cookies.get("GetRoles")){
            roles = JSON.parse(Cookies.get("GetRoles"))
        }

        for(var i = 0; i < roles.length; i++){
            if(Cookies.get("userId") === roles[i].owner._id){
                this.setState({
                    roleName: roles[i].roleName,
                    description: await GetDescriptionHTTP()
                })
                break;
            }
        }
    }
    
    
    UploadHandeler = (e) =>{
        let id =Cookies.get("userId")
        console.log(this.state.selectedFile);
        
        const formData = new FormData();
        if (this.state.selectedFile&&id&&this.state.fileName) {
            let extention = this.state.fileName.substring(this.state.fileName.length-4);
            formData.append('file', this.state.selectedFile,id+extention);
            axios.post(`${getIP()}/upload`,formData).then(()=>{
                this.setState({
                    imageLocation: `url(${getIP()}/pics/${id}.jpg)`,
                })
            }).then(()=>{
                console.log("DONE");
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

    getPerformance(){
        if(Cookies.get("GetPerformances")){
            const performance = JSON.parse(Cookies.get("GetPerformances"))
            console.log(performance);
            
            this.setState({
                performance: performance
            })
        }
    }

    showPerformance(){
        const double = this.state.performance.map((performance,index) => {
            return (
                <div key={index} className={ styles.userPerformance}>
                    <div className={ styles.performanceTitle}>{performance.title}</div>
                    <div className={ styles.performanceDate}>{performance.date}</div>
                    <div className={ styles.performanceContext}>Well Done You Won {performance.title}</div>
                </div>
            )
        })
     
        return (
            <div className={ styles.performanceContainer}>
                    {double}
            </div>
        )
    }

    render(){
        return(
            <div className={(style.bg)}  >
                <div style={{transform: this.state.transform,transformOrigin: "left top"}}>
                    <div className={ styles.profilPic} style={{backgroundImage:this.state.imageLocation}} onClick={this.ProfileClick}> 
                        <p style={{zIndex:"1",    marginBottom: 0}}>{this.state.firstname}</p>
                    </div>
                    <div className={styles.profilPicStyle}></div>
                    {
                        this.state.selectedFile &&
                        <p style={{color: "#004165",position: "absolute",fontSize: "1rem",left: "855px",top: "334px",fontFamily:"Montserrat" }} >{this.state.fileName + " .jpg ONLY"}</p>
                    }
                    {
                        this.state.selectedFile &&
                        <i className="fas fa-upload" style={{color: "#004165",position: "absolute",fontSize: "2rem",left: "800px",top: "341px",cursor: "pointer"}} onClick={this.IconClick}></i>
                    }
                    <a target="_blank" ref="link" rel="noopener noreferrer" href={`${getIP()}/Script/${this.state.roleName}.pdf`} style={{display:"none"}}>a</a>
                    <input type="file" name="file" accept="image/*" ref="fileUploader" onChange={this.fileChange} style={{display:"none"}}/>
                    <button onClick={this.UploadHandeler} ref="Uploader" style={{display:"none"}} >Upload</button>
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
                    {this.showPerformance()}
                    <div className={ styles.userRoles}>
                        {this.state.roleName}
                        <div className={ styles.userRolesContainer}>
                            {this.state.description}
                        </div>
                        {
                            this.state.roleName !=="No role"&&
                            <CustomButton 
                            value="Download Script" 
                            color= {colorname[0]}
                            onClick={()=>{this.refs.link.click()}}
                            />
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Profil;