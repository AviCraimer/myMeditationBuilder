import React from 'react';
import firebase from 'firebase';


const PageMyMeditations = ({fn, state}) => {
  fn.test();

  let userMeditations = [];
  for (const key in state.userMeditations) {
    const meditation = state.userMeditations[key];
    meditation.dbKey = key;

    //Use unshift so that the most recently saved meditation is at the start of the array
    userMeditations.unshift(meditation);
  }



  return (
    <main className="my-meditations">
      <h1>My Meditations</h1>
      <ul>
      { userMeditations.map( meditation => {

        const duration = fn.getMeditationDuration(  fn.getShorthandArray(meditation.sections), 'minutes' ) ;
        return (
        <li className="saved-meditation" key={meditation.dbKey} >
          <h3>{meditation.title}</h3>
          <h4>{ duration} { (duration === 1  ) ? 'Minute'  : 'Minutes'}</h4>
          <button
            className="load-button"
            onClick={() => {
              fn.thisApp().setState({activeMeditation: meditation});
              fn.pageTransition('builder');
            }}
           >Load</button>
          <button
            className="delete-button"
            onClick={() => firebase
              .database()
              .ref('users/' + state.user.id + '/meditations/' + meditation.dbKey  )
              .remove()  }
            >Delete</button>
        </li>
        )
      } ) }    {/* End of map */}
      </ul>
    </main>

  );//End of main JSX return


}//End of component




export default PageMyMeditations