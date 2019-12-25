import React, { useState,useContext } from 'react';
import TagComponent from "../MiniComponents/TagComponent"

import CustomButtonBig from "../MiniComponents/CustomButtonBig";
import styles from "../MiniComponents/miniComponents.module.sass";
import classnames from "classnames";
import AuthContext from '../../context/auth-context';
import {LoginHTTP} from "../../HTTP/Login";
import {UserHTTP} from "../../HTTP/User";
import {CompleteRolesHTTP} from "../../HTTP/CompleteRoles"
import {GetMeetingHTTP} from "../../HTTP/GetMeeting"
import {GetPerformanceHTTP} from "../../HTTP/GetPerformance"
import Cookies from "js-cookie";
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import { Link } from "react-router-dom";

const GroupComponent = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [missingI, setmissingI] = useState(false);
  const [loading, setloading] = useState(false);

  const contextType = useContext(AuthContext);
  async function handelSubmit(params) {
    const Auth = {
      username: UserName,
      password: Password
    }
    if (UserName === "" || Password ==="") {
      setmissingI(true)
    }
    else{
      setloading(true)
      const isSuccess = await LoginHTTP(Auth);
      let userSuccess = false;
      if(!isSuccess){
        setmissingI(true);
      }else{
          userSuccess = await UserHTTP();
          await GetMeetingHTTP();

          if(userSuccess){
              if(Cookies.get("isAdmin") === "1"){
                  await CompleteRolesHTTP()
              }
              await GetPerformanceHTTP();
          }
          contextType.login();
      }
      setloading(false)
    }
  }
  
  return(
  <div className={classnames("container",styles.container)}>
      <TagComponent value="SIGN IN"/>
      <div className={styles.loginInput}>
          <input 
          className={missingI ? "inputError" :styles.input }
          type="text"
          value={UserName}
          name="username"
          placeholder="Username"
          onChange={(e)=>{setUserName(e.target.value);setmissingI(false)}}
          />
          <input 
          type="password" 
          name="password" 
          value={Password}
          placeholder="Password"
          className={ missingI ? "inputError" :styles.input}
          onChange={(e)=>{setPassword(e.target.value);setmissingI(false)}}
          id=""/>
      </div>
        <CustomButtonBig style={{backgroundColor: loading&& "gray"}} color={loading&& "DisabledButton" }value={
          loading ? 
          <HalfCircleSpinner
            color='#fff'
            size={35}
            style={{
                zIndex:1,
                left: "50%",
                transform: `translate(-50%,0)`,
            }}
            /> 
            :"CONTINUE" } 
            onClick={handelSubmit}/>
      {/* <a className={styles.forgotLogin} href="#mainContent">FORGOT PASSWORD</a> */}
      <Link to="/Forgot">
        <div className={styles.forgotLogin} style={{}}>
            FORGOT PASSWORD
        </div>
      </Link>
    </div>
)};

export default GroupComponent;
