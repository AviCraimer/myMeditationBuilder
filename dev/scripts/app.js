import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

//Components
import PageLanding from './PageLanding';
import PageMyMeditations from './PageMyMeditations';
import PageBuilder from './PageBuilder';
import PagePlay from './PagePlay';


//Other Modules
import fn from './fn';



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
      activePage: 'landing',
      totalMinutes: 20,
      meditationMethod: 'breath',
      user: firebase.auth().currentUser
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
    fn.logout();

  }//End of constructor()


  componentDidMount () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // this.setState({
        //   user: user
        // });
        // User is signed in.
        console.log(`user is signed in: `, user )
      } else {
        // this.setState({
        //   user: null
        // });
        // No user is signed in.
        console.log(`No user is signed in`, user)
      }
    });
  }


  render() {
    return (
      <React.Fragment>
        <button className="login-button"  onClick={(e) => {
          e.preventDefault();
          if (this.state.user === null) {
            fn.login();
          } else {
            fn.logout();
          }


          }} >
          {this.state.user === null ? 'Login' : 'Logout' }
        </button>
        {this.state.activePage === 'landing'
        ? <PageLanding fn={fn} state={this.state}/>
        : null }

        {this.state.activePage === 'login'
        ? <PageLogin fn={fn} state={this.state}/>
        : null }

        {this.state.activePage === 'myMeditations'
        ? <PageMyMeditations fn={fn} state={this.state}/>
        : null }

        {this.state.activePage === 'builder'
        ? <PageBuilder fn={fn} state={this.state}/>
        : null }

        {this.state.activePage === 'play'
        ? <PagePlay fn={fn} state={this.state}/>
        : null }
      </React.Fragment>
    )
  }//End of render()
}

ReactDOM.render(<App />, document.getElementById('app'));
