import React from 'react';
import firebase from 'firebase';
import data from './data'

const MeditationOptions = ({fn, state, index, add}) => {
  const instructions = data.instructions;
  const instructionsArray = [];
  for (const shortName in instructions ) {
    const instructionInfo = instructions[shortName];
    instructionsArray.push(instructionInfo);
  }
  console.log('instructionsArray', instructionsArray)

  return (
    <section className={`meditation-options ${(state.meditationOptions.show) ? 'show'  : 'fade-options'}`} >
        <h2>Choose a Recording</h2>
        <ul className="options-list" >
          {/* The first option is for adding a silent section */}
          <li className="option">
            <h3>Silence</h3>
            <h4>{state.silenceOption} { (state.silenceOption === 1  ) ? 'Minute'  : 'Minutes'}</h4>
            <form action="">
              <input
                name="silenceOption"
                className="slider"
                type="range"
                min="0"
                max="120"
                value={state.silenceOption}
                onChange={fn.handleChange }
              />
            </form>

            <button
              className="select-option"
              onClick={() => {
                const info = {
                  duration: state.silenceOption * 60,
                  mp3Url: null,
                  sectionName: 'Silence',
                  shortName: null
                }
                if (add && state.meditationOptions.show) {
                  fn.addSectionAfterIndex(index, info);
                } else if (state.meditationOptions.show) {
                  fn.replaceSectionAtIndex(index,info);
                }
                //Reset the meditation Options state
                fn.thisApp().setState({meditationOptions: {
                  show: false,
                  index: null,
                  add: false
                }});
              } }
              >{ (add)  ? 'Add Section' : 'Select' }
            </button>
          </li>
          {instructionsArray.map((info, i) => {
            const durationMin = Math.floor(info.duration / 60);
            return (
              <li className="option" key={'option-'+i} >
                <h3>{info.sectionName}</h3>
                <h4>{durationMin} { (durationMin === 1  ) ? 'Minute'  : 'Minutes'}</h4>
                {/* <button className="play-option" >Listen</button> */}
                <button
                  className="select-option"
                  onClick={() => {

                    if (add) {
                      fn.addSectionAfterIndex(index, info);
                    } else {
                      fn.replaceSectionAtIndex(index,info);
                    }


                  fn.thisApp().setState({meditationOptions: {
                    show: false,
                    index: null,
                    add: false
                  }});
                }}

                  >{ (add)  ? 'Add Section' : 'Select' }</button>
              </li>
            )
          } ) }

        </ul>



    </section>
  );
}


export default MeditationOptions