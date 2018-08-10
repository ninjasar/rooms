import React from 'react';
import dateFormat from 'dateformat';
import {NavLink} from 'react-router-dom';
import Accordion from 'react-collapsy';

//import Transparent from './Transparent.js';

import API from '../utils';
import Card from '../components/booking/Card';
import Filter from '../components/booking/Filter';
import './search.css';
import '../../node_modules/react-collapsy/lib/index.css';





class SearchPg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      occupants: 2,
      duration: 1,
      location: [2,4],
      eMessage: '',
      srchRes: {},
      questions: [],
      key: ';myname',
      reserve: () => {console.log('hello')},
    };
    this.displayResults = this.displayResults.bind(this);

  }



  componentDidMount() {
    API.search()
      .then((results) => {
          this.setState({
            srchRes: results,
            // results: Object.entries(results).map(item => ({[item[0]]:item[1]})),
          });
        //console.log(this.state.srchRes)
      }).catch((error) => {
        this.setState({
          eMessage: error,
        });
        console.log(error);
      });
    // API.getLocs()
    //   .then((results) => {
    //     console.log(results.idArray);
    //   }).catch((error) =>  {
    //   this.setState({
    //       eMessage: error,
    //     });
    //     console.log(error);
    //   });
      API.getLocInfo('BOBST')
        .then((results) => {
          console.log(results);
        }).catch((error) => {
          console.log(error);
      });

  }


  // confirm() {
  //   console.log('yay');
  // }



/*Display results is creating a list of links that will open a modal with*/
  displayResults() {
    var rArr = [];
    rArr = this.state.srchRes.map((r) => (

          <Card title={r.room.locationId.toLowerCase() + ' ' + r.room.name}
            key={this.state.key}  suppQ={this.state.questions}>
            <span className="rmAttribute">Occupants: </span>{r.room.capacity}
            <br/>
            <br/>
            <span className="rmAttribute">Time: </span>{dateFormat(r.times[0].openTime, 'default')}
            <br/>
            <br/>
            <span className="rmAttribute">Duration: </span>{r.times[0].duration} hour(s)
            <br/>
            <br/>
            <span className="rmAttribute">Amenities: </span>{r.room.amenities[0].name}
            <br/>
            <br/>
            <form className="slctTime">
              <label>Select a time:</label>
              <div onClick={this.showQuestions}>
                <button></button>
                  {this.state.questions[0]}
                  {console.log(this.state.questions)}

              </div>
            </form>


          </Card>

      )
    );
    console.log(this.state.srchRes)
      this.setState({
        srchResultsComponents: rArr,
      });
      return rArr;
  }

  getQsObj(qs, name) {

  }

   showQuestions = async () => {
    // console.log(this.state.srchRes)
    // console.log(this.state.srchRes);
    const proms = this.state.srchRes.map((r) => { API.getLocInfo(r.locationId) });

    const questions = await Promise.all(proms);

    this.setState({

    });
  }






  render () {
    var x = [];


    return (

      <div className='container'>
          <Filter homePg={true} apply={this.displayResults} search={true}/>
            <div className="roomRecContain">
              <div>
                {this.state.srchResultsComponents}
              </div>

            </div>



      </div>
    )

  }



}


export default SearchPg;
