import React from 'react';
import { BrowserRouter, NavLink} from 'react-router-dom';

import '../index.css';



class LandingPg extends React.Component {

  constructor(props) {

    super(props);

    this.loginClicked = this.props.loginClicked

}



    render() {

      const styles = {
        choiceBtn : {
          width: '12rem',
          height: '6rem',
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: '#e5cce3',
          marginTop: '30%',
          fontVariant: 'small-caps',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginRight: '25px',
          border: '1px solid black',
          borderRadius: '3px',
          color: '#303030'
        },
        description : {
          fontSize: '1.3rem',
          marginTop : '20px',
          marginLeft: '-20px',
          fontStyle : 'italic',
          width: '90%'
        },
        or : {
          fontSize: '1.5rem',
          marginRight: '25px',
          marginTop: '1.5rem',
          marginBottom: '-2rem'
        }
      }

  
      return (
        <div id="landingPg" >
          <div className="joinTxt">
          NYU Rooms <br/>
          </div>
          <div style={styles.description}>
            The easiest way to book your room at NYU
          </div>
          <div>
            <NavLink to="/login/">
              <button style={styles.choiceBtn} >
                log in
              </button>
            </NavLink>
          </div>
          <div style={styles.or}>or</div>
          <div>
            <button style={styles.choiceBtn} onClick={() => {this.loginClicked("rmr478", "password")}} >
              join now
            </button>
          </div>

        </div>

      )
    }
}

export default LandingPg;
