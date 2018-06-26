import React from 'react';
import { BrowserRouter as BrowserRouter, NavLink} from 'react-router-dom';

import './index.css';



class Login extends React.Component {

  constructor(props) {

    super(props);

    this.loginClicked = this.props.loginClicked

}



    render() {

      const styles = {
        logIn : {
          width: '12rem',
          height: '6rem',
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: '#e5cce3',
          marginTop: '20%',
          fontVariant: 'small-caps',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginRight: '25px',
          border: '1px solid black',
          borderRadius: '3px',
        },
        description : {
          fontSize: '1.5rem',
          marginTop : '20px',
          fontStyle : 'italic',
        },
        or : {
          fontSize: '1.5rem',
          marginRight: '25px',
          marginTop: '2%',
        }
      }

      const rendBeforeForm = () => {
        return (
          <div id="loginPg" >
            <div className="joinTxt">
            NYU Rooms <br/>
            </div>
            <div style={styles.description}>
              The easiest way to book your room at NYU
            </div>
            <div>
              <button style={styles.logIn} onClick={() => {this.loginClicked("rmr478", "password")}} >
                log in
              </button>

            </div>
            <div style={styles.or}>or</div>
            <div>
              <button style={styles.logIn} onClick={() => {this.loginClicked("rmr478", "password")}} >
                join now
              </button>
            </div>

          </div>
        )
      }
      /*const rendForm = () => {
        return (
            <div id="loginPg">
              <form onSubmit={this.loginClicked(document.forms.username, document.forms.password)}>
                  <input type="text" name="username" style={styles.or}>username: </input>
                  <input type="text" name="password" style={styles.or}>password: </input>

                  <input type="submit" value="Submit"/>


              </form>
            </div>
          )
        }*/
      return (
        rendBeforeForm()

      )
    }
}

export default Login;
