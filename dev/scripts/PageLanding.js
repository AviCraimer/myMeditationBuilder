import React from 'react';
import firebase from 'firebase';


const PageLanding = ({fn, state}) => {
  // console.log(`basicMeditation fn call: `,  fn.basicMeditation('body',1200 ) ) ;
  return (
    <main className="page-landing">

    <h1>My Meditation Builder</h1>

    <div className="landing-image">
      <img src="public/assets/images/meditation.png" alt="A person sits in meditation posture"/>
    </div>
    <form action="">
      <div className="meditation-type-buttons">
        <button state-property="meditationMethod" className={ (state.meditationMethod === 'breath'  ) ? 'active-button'  :'' }  name="breath" onClick={fn.simpleButtonClick}   >
          Breath
        </button>
        <button state-property="meditationMethod" className={ (state.meditationMethod === 'body'  ) ? 'active-button'  :'' }  name="body" onClick={fn.simpleButtonClick} >
          Body
        </button>
        <button state-property="meditationMethod" className={ (state.meditationMethod === 'lk'  ) ? 'active-button'  :'' }  name="lk" onClick={fn.simpleButtonClick} >
          Loving-Kindness
        </button>
      </div>
      <label className="hidden"  htmlFor="totalMinutes">Total Time</label>
      <input
        id="totalMinutes"
        name="totalMinutes"
        type="range"
        value={state.totalMinutes}
        step="5"
        min="0"
        max="120"
        className="slider"
        id="myRange"
        onChange={fn.handleChange}
      />
      <h3 className="minutes-display">Meditate for <span>{state.totalMinutes}</span> Minutes</h3>

      <div className="user-choice-buttons">
        {/* <button onClick={(e) => {
          e.preventDefault();
          fn.meditationFromState();
          fn.pageTransition ('play') } }>
          Meditate Now
        </button> */}
        <button onClick={(e) => {
          e.preventDefault();
          fn.meditationFromState();
          fn.pageTransition ('builder') } } >
          Customize
        </button>
      </div>
    </form>
    </main> ); //End of page-landing

}


export default PageLanding