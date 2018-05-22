import React from 'react';
import firebase from 'firebase';


const Header = ({fn, state}) => {

  return (
    <header>
     {(state.activePage !== 'landing')
     ? <button onClick={() => { fn.thisApp().setState({activePage: 'landing'})  } } >Home</button> : null   }
     {(state.activePage === 'builder' && state.user )
     ? <button onClick={fn.saveMeditation } title="Save Current Meditation"   >Save</button> : null }

    <div className="login">
          { (state.userMeditations && state.user )
            ? (<div className="imgWrap" title="My Meditations" >
                <img
                  src={state.user.photo}
                  alt={state.user.name}
                  title={`Go to ${state.user.name.split(' ')[0]}'s Meditations` }
                  onClick={() => {
                    fn.thisApp().setState({activePage: 'myMeditations' });
                  }}
                />
              </div>)
            : null }
          <button className={ (state.user === null) ? 'login-button'  : 'logout-button'  }  onClick={(e) => {
              e.preventDefault();
              if (state.user === null) {
                fn.login();
              } else {
                fn.logout();
                if (state.activePage === 'myMeditations') {  fn.thisApp().setState({activePage: 'landing' }); }
              }
            }}>
            {state.user === null ? 'Login' : 'Logout' }
          </button>
    </div>
    </header>
  );
}


export default Header