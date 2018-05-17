import React from 'react';
import firebase from 'firebase';


const PageBuilder = ({fn}) => {
  fn.test();
  return <p>Builder Page</p>;
}


export default PageBuilder