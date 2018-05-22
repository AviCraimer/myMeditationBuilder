import React from 'react';
import firebase from 'firebase';
import MeditationSection from './MeditationSection'

const Meditation = ({fn, state, meditation}) => {
  return (
    <section className="meditation" >
      <h2>
        {(state.meditationTitleEdit)
        ? (
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              fn.thisApp().setState({meditationTitleEdit: false});
            } }
           >
            <input type="text" value={meditation.title} onChange={(e) => {
              const activeMed = Object.assign({}, state.activeMeditation);
              activeMed.title = e.target.value;
              fn.thisApp().setState({activeMeditation: activeMed} );
            }  }  />
          </form>

        )
        : (
        <span onClick={() => fn.thisApp().setState({meditationTitleEdit: true})  } >
         <img src="./public/assets/images/edit-icon.svg" alt="Edit Title"/> { meditation.title + ' ' }
        </span>
        )}{` - ${fn.getMeditationDuration( fn.getShorthandArray( meditation.sections), 'minutes' )} Minutes` }</h2>
      <ul>
        {meditation.sections.map((section, i) =>  {
          return(
          <li className="meditation-section" key={section.sectionName + i}>
            <MeditationSection  fn={fn} state={state} index={i} section={section}  />
          </li>
          )
        } ) }

      </ul>
    </section>

  ) ;
}


export default Meditation