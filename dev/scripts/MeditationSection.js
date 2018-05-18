import React from 'react';
import firebase from 'firebase';


const MeditationSection = ({fn, state, index, section: {sectionName, duration, mp3Url }}) => {
  const durationMin = Math.floor(duration / 60);
  return  (
    <React.Fragment>
      <h3>{sectionName}</h3>
      <h4>{Math.floor(state.activeMeditation.sections[index].duration / 60 ) }
           { Math.floor(state.activeMeditation.sections[index].duration / 60 )
             ? 'Minute'
             : 'Minutes'}</h4>
        <button
          className="trash"
          onClick={() => fn.removeSectionAtIndex(index) }
        >
          X
        </button>
      {
        (mp3Url)
        ? <button
            className="change-button"
            onClick={ () => fn.thisApp()
              .setState({
                meditationOptions: {
                  show: true,
                  add: false,
                  index: index
                }
               }) } >Change</button>
        : (
          <form action="">

            <input
              type="range"
              value={Math.floor(state.activeMeditation.sections[index].duration / 60)}
              min="0"
              max="30"
              onChange={(e) => {
                const sectionCopy =  Object.assign({}, state.activeMeditation.sections[index]);

                sectionCopy.duration = Number(e.target.value) * 60;
                const sectionsClone =  Array.from(state.activeMeditation.sections);
                sectionsClone[index] = sectionCopy;
                const meditationClone = Object.assign({}, state.activeMeditation);
                meditationClone.sections = sectionsClone;
                fn.thisApp().setState({
                  activeMeditation: meditationClone
                });

             }}
            />
          </form>
        )
      }

      <button
        className="add-section"
        onClick={ () => fn.thisApp()
          .setState({
            meditationOptions: {
              show: true,
              add: true,
              index: index
            }
           }) }
        >+</button>
    </React.Fragment>
  )
}


export default MeditationSection