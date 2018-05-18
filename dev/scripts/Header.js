import React from 'react';
import firebase from 'firebase';


const Header = ({fn, state}) => {

  return (
    <div className="login">
          { (state.user)
            ? (<div className="imgWrap">
                <img
                  src={state.user.photo}
                  alt={state.user.name}
                  onMouseOver={(x)=> fn.thisApp().setState({showMenu:true }) }
                  onMouseOut={(x)=> fn.thisApp().setState({showMenu:false }) }

                />
              </div>)
            : null }
          <button className="login-button"  onClick={(e) => {
              e.preventDefault();
              if (state.user === null) {
                fn.login();
              } else {
                fn.logout();
              }
            }}>
            {state.user === null ? 'Login' : 'Logout' }
          </button>
    </div>
  );
}


export default Header