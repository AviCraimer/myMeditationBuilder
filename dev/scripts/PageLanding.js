import React from 'react';
import firebase from 'firebase';


const PageLanding = ({fn, state}) => {
  // fn.test();
  // fn.setAppState({
  //   flumox: 'fluster',
  //   cat: 'allergy'
  // });
  return (
    <div className="page-landing">

    <h1>My Meditation Builder</h1>
    <div className="landing-image">
      <img src="public/assets/images/meditation.png" alt="A person sits in meditation posture"/>
    </div>
    <form action="">
      <div className="meditation-type-buttons">
        {/* Change these to radio buttons */}
        <button>
          Breath
        </button>
        <button>
          Body
        </button>
        <button>
          Loving-Kindness
        </button>
      </div>
      <label htmlFor="totalMinutes">Total Time</label>
      <input
        id="totalMinutes"
        name="totalMinutes"
        type="range"
        // value="20"
        step="5"
        min="1"
        max="120"
        className="slider"
        id="myRange"
        onInput={fn.handleChange}
      />
      <h3 className="minutes-display">Meditate for <span>{state.totalMinutes}</span> Minutes</h3>

      <div className="user-choice-buttons">
        <button>
          Meditate Now
        </button>
        <button>
          Login to Customize
        </button>
      </div>
    </form>
    </div> ); //End of page-landing

}


export default PageLanding