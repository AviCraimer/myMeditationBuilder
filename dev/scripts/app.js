import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

//Components
import PageLanding from './PageLanding'
import PageMyMeditations from './PageMyMeditations'
import PageLogin from './PageLogin'
import PageBuilder from './PageBuilder'


//Other Modules
import fn from './fn'



// Initialize Firebase
var config = {
  apiKey: "AIzaSyDwrP7YiezZQb5v0xYw8KI51rfV8M3n0Uw",
  authDomain: "my-meditation-builder.firebaseapp.com",
  databaseURL: "https://my-meditation-builder.firebaseio.com",
  projectId: "my-meditation-builder",
  storageBucket: "my-meditation-builder.appspot.com",
  messagingSenderId: "470420204766"
};
firebase.initializeApp(config);


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isApp: true,
      activePage: 'landing',

      totalMinutes: 20
    };

    //Bind all the 'this' of all functions in fn to App.
    for (const functionName in fn) {
      let func = fn[functionName];
      func = func.bind(this);
      fn[functionName] = func;
    }

    //This prints the App object using this inside the function.
    //Demonstrates that the bind has been successful
    // fn.test();


  }//End of constructor()

  render() {
    return (
      <React.Fragment>
        {this.state.activePage === 'landing'
        ? <PageLanding fn={fn} state={this.state}/>
        : '' }
        {this.state.activePage === 'login'
        ? <PageLogin fn={fn} state={this.state}/>
        : '' }
        {this.state.activePage === 'myMeditations'
        ? <PageMyMeditations fn={fn} state={this.state}/>
        : '' }
        {this.state.activePage === 'builder'
        ? <PageBuilder fn={fn} state={this.state}/>
        : '' }
      </React.Fragment>
    )
  }//End of render()
}

ReactDOM.render(<App />, document.getElementById('app'));
