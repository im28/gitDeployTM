import React, {Component} from 'react';
import styles from "./profile.module.sass"
import Cookies from "js-cookie";
import {GetDescriptionHTTP} from "../../HTTP/GetDescription"
import {getIP} from "../../ipAddressPic";

class GE extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roleName: "No role",
            hasRole: false,
            description: "You have not enrolled in any role!"
        }
    }

    componentDidMount(){
        this.getDescription();
    }

    getDescription = async () => {
        let roles = []

        if(Cookies.get("GetRoles")){
            roles = JSON.parse(Cookies.get("GetRoles"))
        }

        for(var i = 0; i < roles.length; i++){
            if(Cookies.get("userId") === roles[i].owner._id){
                this.setState({
                    roleName: roles[i].roleName,
                    description: await GetDescriptionHTTP(),
                    hasRole:true
                })
                break;
            }
        }
    }

    render(){
        if(!this.props.show){
            return null;
        }

        return(
            <div className={ styles.performanceContainer}>
                <div className = {styles.geContainer}>
                    <div className = {styles.geTitle}>{this.state.roleName}</div>
                    <div className = {styles.geContextContainer}>
                        {this.state.description}
                    </div>
                    {
                        this.state.hasRole &&
                        <button className = {styles.downloadBtn}  onClick={()=>{this.refs.link.click()}}>Download Script</button>
                    }
                    <a target="_blank" rel="noopener noreferrer" ref="link" href={`${getIP()}/Script/${this.state.roleName}.pdf`} style={{display:"none"}}>a</a>
                </div>
            </div>
        )
    }
}

export default GE;