import React from 'react';
import firebase from 'firebase';


const MeditationSection = ({fn, state, index, section: {sectionName, duration, mp3Url }}) => {
  const durationMin = Math.floor(duration / 60);
  return  (
    <React.Fragment>
      <h3>{sectionName}</h3>
      <h4>{Math.floor(state.activeMeditation.sections[index].duration / 60 )+ " " }
           { Math.floor(state.activeMeditation.sections[index].duration / 60 )
             ? 'Minute'
             : 'Minutes'}</h4>

      {
        (mp3Url)
        ? <button
            className="change-section"
            title="Change this section."
            onClick={ () => fn.thisApp()
              .setState({
                meditationOptions: {
                  show: true,
                  add: false,
                  index: index
                }
               }) } ></button>
        : (
          <form action="">

            <input
              type="range"
              className="slider"
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
      <img src="public/assets/images/delete-icon.svg"
        alt="Remove this section."
        title="Remove this section."
        className="delete-section"
        onClick={() => fn.removeSectionAtIndex(index) }
      />
      <img className="add-section"  src="public/assets/images/add-icon.svg" alt="Add a new section" title="Add a section"
      onClick={ () => fn.thisApp()
        .setState({
          meditationOptions: {
            show: true,
            add: true,
            index: index
          }
         }) }
      />

    </React.Fragment>
  )
}


export default MeditationSection