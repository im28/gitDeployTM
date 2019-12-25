import React, { useState } from 'react';
import TagComponent from "../MiniComponents/TagComponent"

import CustomButtonBig from "../MiniComponents/CustomButtonBig";
import styles from "../MiniComponents/miniComponents.module.sass";
import classnames from "classnames";
import HalfCircleSpinner from '@bit/bondz.react-epic-spinners.half-circle-spinner';
import axios from 'axios'
import {getIP} from "../../ipAddressPic";

const GroupComponent = () => {
  const [UserName, setUserName] = useState("");
  const [missingI, setmissingI] = useState(false);
  const [loading, setloading] = useState(false);
  const [failed, setfailed] = useState(false);

  
  async function sendEmail (){
      console.log(UserName);
      const username = UserName;
      try {
        setloading(true);
        const response = await axios.post(
          `${getIP()}/forgotPassword`,
          {username},
        );
        if (response) {
          setloading(false);
        }
      } catch (error) {
        console.error(error.response.data);
        setfailed(true)
        setloading(false);
      }
  };
  
  return(
  <div className={classnames("container",styles.container)}>
      <TagComponent style={{width:"auto"}} value="Forgot Password"/>
      <div className={styles.loginInput}>
          <input 
          className={missingI ? "inputError" :styles.input }
          type="text"
          value={UserName}
          name="username"
          placeholder="Username"
          onChange={(e)=>{setUserName(e.target.value);setmissingI(false)}}
          />
      </div>
        <CustomButtonBig style={{marginTop: "19.25rem",backgroundColor: failed? "red" :"#004165"}}  value={
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
            :"Reset" } 
            onClick={sendEmail}/>
    </div>
)};

export default GroupComponent;
