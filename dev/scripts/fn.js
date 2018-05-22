import React from 'react';
import firebase from 'firebase';
import data from './data'

const fn =  {};

fn.test = function (testString) {
   (testString) ? console.log(testString) : null ;
  console.log(`Should be the App`, this)
}

fn.thisApp = function () {
  return this;
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

fn.meditationFromState = function () {
  const {totalMinutes, meditationMethod } =  this.state;
  const duration  =  fn.getSeconds(totalMinutes);
  const sections = fn.basicMeditation(meditationMethod, duration );

  const title = (meditationMethod === 'lk') ? 'Loving-Kindness' : fn.capitalize(meditationMethod) ;

  this.setState({
    activeMeditation: {
      title: `${title} Meditation`,
      sections: sections
    }
  });

}


fn.removeSectionAtIndex = function (index) {
  const sectionsClone = Array.from(this.state.activeMeditation.sections);
  sectionsClone.splice(index, 1);

  //Copy the active meditation from state
  const meditationClone = Object.assign({}, this.state.activeMeditation );

  //set the sections property of the clone to the sections clone which has had the section removed.
  meditationClone.sections = sectionsClone;
  //set the active meditation state to the meditation clone.
  this.setState({
    activeMeditation: meditationClone
  })
}

fn.replaceSectionAtIndex = function (index, replaceWith) {  //Second argument is a meditation section info object
  const sectionsClone = Array.from(this.state.activeMeditation.sections);
  sectionsClone[index] = replaceWith;

  const meditationClone = Object.assign({}, this.state.activeMeditation );
  meditationClone.sections = sectionsClone;
  this.setState({
    activeMeditation: meditationClone
  })
}

fn.addSectionAfterIndex = function (index, addAfter) {
  const sectionsClone = Array.from(this.state.activeMeditation.sections);

  //Add the new section info object after the index
  sectionsClone.splice(index + 1, 0, addAfter);

  const meditationClone = Object.assign({}, this.state.activeMeditation );
  meditationClone.sections = sectionsClone;
  this.setState({
    activeMeditation: meditationClone
  })
}



fn.capitalize = function (string) {
  return string[0].toUpperCase() + string.substring(1)
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

      fn.getMeditations();

      const dbRef = firebase.database().ref('users/' + uid);
      dbRef.once('value',(snapshot) => {

        if (!snapshot.exists() ) {
          console.log('user does not exist')
          //Set the user data to user key.
          dbRef.set(user);
        } else {

          console.log('user exists');

        }

      });


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



fn.getSeconds = function (min, sec) { //Second argument is optional
  //If there was a second argument (see what I did there?), keep that value, otherwise set it to zero
  sec = (sec) ? sec : 0;
  return (min * 60) + sec;
}

fn.basicMeditation = function (type, duration ) {

  let sections = [
    'bell',
    'settleIn',
    60,
    type+'Intro',
    0,
    type+'Callback',
    0,
    type+'Closing',
    60,
    'endingMeditation',
    60,
    'bell'
  ];

  let dur = fn.getMeditationDuration(sections);
  console.log(`dur from inside basicMeditaton: `,  dur)
  //This calculates how much time to put after into and after callback
  let extraTime = (duration - dur) / 2 ;

  sections[4] = extraTime;
  sections[6] = extraTime;

  sections = sections.map(shortHand => {
    if (typeof shortHand === 'string' ) {
      //If it is a string return the instruction section object from data
      return data.instructions[shortHand];
    }  else if (typeof shortHand === 'number' ) {
      //If it is a number return a silence section object
      return {
        sectionName: 'Silence',
        duration: shortHand,
        mp3Url: null,
        shortName: null
      };
    } //End else if
  }); //End Map
  return sections;
}//End basicMeditation function


//This calculates the duration from the shorthand meditation array
fn.getMeditationDuration = function (shorthandArray, optionalFlag) { ////Optional flag can be left out or set to truthy
  const secondsDur = shorthandArray.reduce((acc, cur) => {
    if (typeof cur === 'string' ) {
      const dur = data.instructions[cur].duration;
      return acc + dur;
    }  else if (typeof cur === 'number' ) {
      return acc + cur;
    }
  },0);

  if (optionalFlag) {
    //Returns minutes if the optional flag is truthy
    return Math.floor(secondsDur/60);
  } else {
    //Returns seconds if optional flag is undefined or falsey.
    return secondsDur;
  }
}

//Gets the short hand from an array of meditation sections objects
fn.getShorthandArray = function (longHandSections) {
  const shorthand =  longHandSections.map(section => {
     return (section.shortName) ? section.shortName : section.duration;
  });
  return shorthand;
}

fn.saveMeditation = function () {
  const meditationToSave = Object.assign({}, this.state.activeMeditation);
  const meditaitonDbKey = meditationToSave.dbKey ? meditationToSave.dbKey : null;

  const userId = this.state.user.id;

  if (meditaitonDbKey) {
    //If the active Meditation has a meditationDbKey, this means it already exists in the database.
    //Make a db reference to that key inside the user, then set that equal to the current meditation. This will overwrite the previous version of the meditation.
    const dbRef = firebase
      .database()
      .ref('users/'+ userId + '/meditations/'+ meditaitonDbKey);
    dbRef.set(meditationToSave);
  } else {
    //If there is no dbKey, then push a new meditation inside the meditations reference for that user.
    const dbRef = firebase
      .database()
      .ref('users/'+ userId + '/meditations');
    const savedMeditationRef = dbRef.push(meditationToSave);

    //After pushing the new meditation, update the state for active meditation with the db key of the newly stored.
    const newDbKey =  savedMeditationRef.path.pieces_[3];
    meditationToSave.dbKey = newDbKey;
    this.setState({ activeMeditation: meditationToSave });
  }



}//End of save meditation function


//Used to populate the state with user meditations, updated on change. It is called inside the login function
fn.getMeditations = function () {
  if (this.state.user.id) {
    const uid = this.state.user.id;


    const dbRef = firebase.database().ref('users/' + uid + '/meditations');
    dbRef.on('value',(snapshot) => {

      console.log('user meditations', snapshot.val() );
      this.setState({
        userMeditations: snapshot.val()
      });
    });
  }//End if user id
}




export default fn