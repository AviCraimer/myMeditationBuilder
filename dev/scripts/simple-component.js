import React from 'react';
import firebase from 'firebase';


const SimpleComponent = ({fn}) => {
  fn.test();
  return <p></p>;
}


export default SimpleComponent