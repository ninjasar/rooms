import React from 'react';
import { BrowserRouter as  Route, BrowserRouter, NavLink} from 'react-router-dom';

import './index.css';
import App from './App.js';



class Transparent extends React.Component {

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
          backgroundColor: '#a1b3d1',
          marginTop: '3%',
          fontVariant: 'small-caps',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginRight: '25px'
        },
        description : {
          fontSize: '1.5rem',
          marginTop : '20px',
          fontStyle : 'italic'
        }
      }
      return (

        <div ref="trans" id="loginPg" >
          <div className="joinTxt">
            {console.log(this.props.loginClicked)}
          NYU Rooms <br/>
          </div>
          <div style={styles.description}>
            The easiest way to book your room at NYU
          </div>

            <button style={styles.logIn} onClick={this.loginClicked} >
              join now
            </button>

        </div>
      )
    }
}

export default Transparent;
