import React, {Component} from 'react';
import styles from "./confirm.module.sass"

class Confirm extends Component{
    render(){
        if(!this.props.show){
            return null;
        }

        setTimeout(
            function() {
                this.props.setTheme()
            }
            .bind(this),
            3000
        );

        return(
            <div>

                <div className= {styles.background}></div>
                <div className= {styles.bluerectangle}></div>
                <div className= {styles.login}>
                    JOIN US
                </div>
                <div className= {styles.confirmed}>
                    Confirmed
                </div>
                <div className= {styles.text1}>
                    We will be in contact
                    with you
                </div>
            
            </div>
        )
    }
}

export default Confirm;