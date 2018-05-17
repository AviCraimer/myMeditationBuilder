import React from 'react';
import firebase from 'firebase';

const fn =  {};

fn.test = function () {
  console.log(`Should be the App`, this)
}

fn.handleChange = function (e) {
  this.setState ({
    [e.target.name]: e.target.value
  });
}

fn.simpleButtonClick = function (e) {
  e.preventDefault();

  //Get the first attribute which is state-property

  const stateProperty =  e.target.attributes[0].value;

  this.setState ({
    [stateProperty]: e.target.name
  });

  console.log(e.target.attributes[0].value);

  // [e.target[data-state-type]]: e.target.value
}


fn.pageTransition = function (pageName) {
  this.setState({
    activePage: pageName
  });
}

fn.login = function () {
  const provider = new firebase.auth.GoogleAuthProvider();
  let thisApp = this;
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      console.log(`token`, token);

      // Get the signed-in user info.
      let user = result.user;
      const {uid, displayName, email, photoURL } = user;

      user = {
        name: displayName,
        id: uid,
        email: email,
        photo: photoURL
      };

      //Update the sate with user
      thisApp.setState({
        user: user
      });


      const dbRef = firebase.database().ref('users/' + uid);
      dbRef.once('value',(snapshot) => {

        if ( snapshot.exists() ) {

          console.log('user exists');
        } else {

          isNewUser = false;
          console.log('user does not exist')
          //Set the user data to user key.
          dbRef.set(user);
        }
        thisApp.setState({
          activePage: 'myMeditations'
        });
      });
      console.log(`isNewUser`,isNewUser);

      //This way downloads all the data from the database, not just the users data
      //Get value once.
      // firebase.database().ref('users').once('value', (snapshot) => {
      //   const users = snapshot.val();
      //   console.log(users);
      //   let add = true;
      //   for (let userKey in users) {
      //     if (userKey === uid) {
      //       add = false;
      //     }
      //   }

      //   if (add === true) {
      //     const dbRef = firebase.database().ref('users/' + uid);
      //     dbRef.set(user);
      //   }
      // });



  }).catch(function(error) {
  // Error handling goes in here.
      console.log(`error`, error)
  });

}//End login


fn.logout = function () {
  const thisApp = this;
  firebase.auth().signOut().then(function() {
  thisApp.setState({
    user: null,
    activePage: 'landing'
  });

    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

}



//A simple function to allow setting the state of App from within any scope
fn.setAppState  = function (obj) {
  console.log(`This inside setAppState`, this)
  for (let key in obj) {
    console.log(`key`, key);
    console.log(`obj`, obj);

    // this.setState ({
    //  [key]: obj[key]
    // });
  }
}



export default fn