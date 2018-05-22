import React from 'react';
import firebase from 'firebase';

//Components
import Meditation from './Meditation'
import MeditationOptions from './MeditationOptions'
import { strictEqual } from 'assert';

const PageBuilder = ({fn, state}) => {

  return (
    <main className="builder" >
      <h1>Meditation Builder</h1>
      <Meditation fn={fn} state={state} meditation={state.activeMeditation} />
      <MeditationOptions
        fn={fn}
        state={state}
        index={state.meditationOptions.index}
        add={state.meditationOptions.add}
      />
    </main>
  ) ;
}


export default PageBuilder