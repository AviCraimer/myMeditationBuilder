import React from 'react';
import firebase from 'firebase';
import MeditationSection from './MeditationSection'

const Meditation = ({fn, state, meditation}) => {
  return (
    <section className="meditation" >
      <h2>{ `${meditation.title} - ${fn.getMeditationDuration( fn.getShorthandArray( meditation.sections), 'minutes' )} Minutes` }</h2>
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