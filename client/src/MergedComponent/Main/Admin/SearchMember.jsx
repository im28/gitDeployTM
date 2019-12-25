import React, {Component} from 'react';
import styles from "./searchMember.module.sass";
import {SearchMemberHTTP} from "../../../HTTP/SearchMember";
import {GetAllUserNameHTTP} from "../../../HTTP/GetAllUserName";
import {UpdateUserHTTP} from "../../../HTTP/UpdateAuth";
import AsyncSelect from 'react-select/async';
import style from "../../MiniComponents/miniComponents.module.sass"
import { Link } from "react-router-dom";
import {getIP} from "../../../ipAddressPic";
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
let colors=["#772432","#004165","#CD202C","#F2DF74","#A9B2B1"]
const customStyles = {
    container: (provided) => ({
        ...provided,
        display: 'inline-block',
        top: "68px",
        left: "545px",
        width: "559px",
        border: "none",
        borderBottom: "2px solid #004165",
        textAlign: "left",
        font: "Bold 30px Montserrat",
        color: "#004165",
        opacity: "1",
    }),
    control: (provided) => ({
      ...provided,
      border: 'none',
      borderRadius: '0',
      minHeight: '1px',
      height: '71px',
      boxShadow: 'none'
    }),
  };

class SearchMember extends Component{
    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
    }

    state = {
        firstname: "",
        lastname: "",
        email: "",
        roles: [],
        totalRoles: 0,
        points: 0,
        trophies: 0,
        options: null,
        show: false,
        inputValue: '',
        imageLocation:"",
        username:"",
        password:"",
        usernameSuc:0,
        passwordSuc:0,
        usernameS:true,
        passwordS:true,
        missingI:""
    }

    componentDidMount() {
        this.getUserName()
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
    async getUserName(){
        const userInfo = await GetAllUserNameHTTP();

        if(!userInfo){
            console.log("null")
            return;
        }
        let newOption = [];

        for(let i = 0; i<userInfo.length;i++){
            newOption.push({
                value: userInfo[i]._id,
                label: userInfo[i].information.firstname + " " + userInfo[i].information.middlename + " " + userInfo[i].information.lastname,
                }
            )
        }
        this.setState({
            options: newOption,
            
        })
        return newOption;
    }

    onClose = (e) => {
        this.setState({
            firstname: ""
        })
        this.props.onClose && this.props.onClose(e);
    }

    async fetchUsers(userId){

        const userInformation = await SearchMemberHTTP(userId);
        
        if(userInformation){
            this.setState({
                firstname: userInformation.information.firstname,
                lastname: userInformation.information.lastname,
                email: userInformation.information.email,
                roles: userInformation.role,
                totalRoles: userInformation.gamifications.totalRoles,
                points: userInformation.gamifications.points,
                trophies: userInformation.gamifications.trophies,
                imageLocation: `url(${getIP()}/pics/${userId}.png)`
            })
        }
        else{
            window.alert("No member found !");
            return;
        } 
    }

    roleTable = () => {
        const roles = [
            "Toastmaster of the evening",
            "Surgent At Arms",
            "Grammarian",
            "Ah-Counter",
            "General Evaluator",
            "Topics Master",
            "Speaker 1",
            "Speaker 2",
            "Speaker 3",
            "Speaker 4",
            "Evaluator 1",
            "Evaluator 2",
            "Evaluator 3",
            "Evaluator 4"
        ]
        var count = 0;
        var array = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-"]

        var sortedDated = [{
            roleName: "",
            date: ""
        }]

        for(var i = 0; i < this.state.roles.length; i++){
            sortedDated.push({
                roleName: this.state.roles[i].roleName,
                date:  this.state.roles[i].expiryDate.date
            })
        }

        sortedDated.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
        })

        for(var j = 0; j<14; j++){
            for(var x = 0; x<sortedDated.length; x++){
                if(roles[j]===sortedDated[x].roleName){
                    array[j]=sortedDated[x].date
                } 
            }
        }
        
        const doubled = array.map((roleName) => {
            return <div key={count++} className={styles.roleName}>{roleName}</div>
        });

        return(
            <div className={styles.nameContainer}>
                {doubled}             
            </div>
        )
    }
    
      
     promiseOptions = async inputValue =>{
        let options = await this.getUserName();
        if (options) {
            return options.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
              );
        }
        
    };
    handlePass = async ()=>{
        this.setState({
            passwordSuc:1
        })
        let progress = await UpdateUserHTTP("", this.state.password, this.state.email)
        if (progress) {
            this.setState({
                passwordS:true,
                passwordSuc:2
            })
        }
        else{
            this.setState({
                passwordS:false,
                passwordSuc:2
            })
        }

        
    }
    handleUser = async ()=>{
        this.setState({
            usernameSuc:1
        })
        let progress = await UpdateUserHTTP(this.state.username, "", this.state.email)
        if (progress) {
            this.setState({
                usernameS:true,
                usernameSuc:2
            })
        }
        else{
            this.setState({
                usernameS:false,
                usernameSuc:2
            })
        }
    }
    handleInputChange = (inputValue, actionMeta) => {
        const inputValue2 = inputValue.replace(/\W/g, '');
        this.setState({ inputValue2 });
        
        return inputValue2;
    };
    handleChange = (newValue, actionMeta) => {
        if(newValue!==null) {
            this.fetchUsers(newValue.value)
            this.setState({
                show: true
            })
        }
        else {
            this.setState({
                show: false
            })
        }
        
      };
    showAll = () => {
        if(this.state.show === true){
            return (
                <div>
                    <div className={styles.containerProfil}>
                        <div className={styles.memberName}>{this.state.firstname + " " + this.state.lastname}</div>
                        <input 
                            className={this.state.missingI ? "inputError" :style.input }
                            type="text"
                            value={this.state.username}
                            name="username"
                            placeholder="Change Username"
                            style={{top: "70px",left:" 122px",position:"absolute", width: "270px"}}
                            onChange={(e)=>{this.setState({username:e.target.value})}}
                        />
                        <input 
                            className={this.state.missingI ? "inputError" :style.input }
                            type="text"
                            value={this.state.password}
                            name="username"
                            placeholder="Change Password"
                            style={{top: "70px",left:"427px",position:"absolute", width: "270px"}}
                            onChange={(e)=>{this.setState({password:e.target.value})}}
                        />
                        {
                            this.state.usernameSuc === 0 &&
                                <i className="fas fa-check-circle" 
                                onClick={this.handleUser} 
                                style={{color: colors[4],fontSize: "2rem",left: "355px",position: "absolute",top: "75px",cursor:"pointer"}}/>
                        }
                        {
                            this.state.passwordSuc === 0 &&
                                <i className="fas fa-check-circle"  
                                onClick={this.handlePass} 
                                style={{color: colors[4],fontSize: "2rem",left: "655px",position: "absolute",top: "75px",cursor:"pointer"}}/>
                        }


                        {
                            this.state.usernameSuc === 1 &&
                                <HalfCircleSpinner
                                    color={colors[1]}
                                    size={35}
                                    style={{
                                        zIndex:1,
                                        top: "75px",
                                        left: "355px",
                                    }}
                                />
                        }
                        {
                            this.state.passwordSuc === 1 &&
                                <HalfCircleSpinner
                                    color={colors[1]}
                                    size={35}
                                    style={{
                                        zIndex:1,
                                        top: "75px",
                                        left: "655px",
                                    }}
                                />
                        }
                        


                        {
                            this.state.usernameSuc === 2 &&
                                <i className={ this.state.usernameS ?"fas fa-check-circle":"fas fa-times-circle"}
                                onClick={this.handleUser} 
                                style={{color: this.state.usernameS ? colors[1] : colors[2],fontSize: "2rem",left: "355px",position: "absolute",top: "75px",cursor:"pointer"}}/>
                        }
                        {
                            this.state.passwordSuc === 2 &&
                                <i className={ this.state.passwordS ?"fas fa-check-circle":"fas fa-times-circle"}
                                onClick={this.handlePass} 
                                style={{color: this.state.passwordS ? colors[1] : colors[2],fontSize: "2rem",left: "655px",position: "absolute",top: "75px",cursor:"pointer"}}/>
                        }
                      
                        
                        <div className={styles.profilPic} style={{backgroundImage:this.state.imageLocation}}></div>
                        <div className={styles.statusRole}>
                            <div className={styles.statusValue}>{this.state.totalRoles}</div>
                            <div className={styles.statusText}>Roles taken</div>
                        </div>
                        <div className={styles.statusPoint}>
                            <div className={styles.statusValue}>{this.state.points}</div>
                            <div className={styles.statusText}>Points</div>
                        </div>
                        <div className={styles.statusTrophies}>
                            <div className={styles.statusValue}>{this.state.trophies}</div>
                            <div className={styles.statusText}>Trophies</div>
                        </div>     
                    </div>
                    <div className={styles.recordContainer}>
                        <div className={styles.roleTitle}>Role</div>
                        <div className={styles.dateTitle}>Date</div>
                        <div className={styles.roleContainer}>
                            <div className={styles.roleName}>Toastmaster of the evening</div>
                            <div className={styles.roleName}>Surgent At Arms</div>
                            <div className={styles.roleName}>Grammarian</div>
                            <div className={styles.roleName}>Ah-Counter</div>
                            <div className={styles.roleName}>General Evaluator</div>
                            <div className={styles.roleName}>Topics Master</div>
                            <div className={styles.roleName}>Speaker 1</div>
                            <div className={styles.roleName}>Speaker 2</div>
                            <div className={styles.roleName}>Speaker 3</div>
                            <div className={styles.roleName}>Speaker 4</div>
                            <div className={styles.roleName}>Evaluator 1</div>
                            <div className={styles.roleName}>Evaluator 2</div>
                            <div className={styles.roleName}>Evaluator 3</div>
                            <div className={styles.roleName}>Evaluator 4</div>
                        </div>
                    {this.roleTable()}
                    </div>
                </div>
            )
        }
        else{
            return null;
        }
    }

    render(){
        // if (!this.props.show){
        //     return null;
        // }
        
        return(
            <div className={(style.bg)}>
                    <div className={styles.animateTop} style={{transform: this.state.transform,transformOrigin: "left top",position: "absolute"}}>
                        {/* <input className={styles.searchBar} placeholder="Search member" type="text" ref={this.usernameEl}/> */}
                        <Link to={"/Main/Admin"}>
                            <button className={styles.backBtn} >Back</button>
                        </Link>
                        <button className={styles.searchBtn} >Search</button>
                        {this.showAll()}
                        <AsyncSelect
                            isClearable
                            onInputChange={this.handleInputChange}
                            onChange={this.handleChange}
                            defaultOptions={this.state.options}
                            styles={customStyles}
                            loadOptions={this.promiseOptions}
                        />
                    </div>
            </div>
        )
    }
}

export default SearchMember;