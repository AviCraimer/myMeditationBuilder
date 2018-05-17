import React from 'react';

const fn =  {};

fn.test = function () {
  console.log(`Should be the App`, this)
}

fn.handleChange = function (e) {
  this.setState ({
    [e.target.name]: e.target.value
  });
}

//A simple function to allow setting the state of App from within any scope
fn.setAppState  = function (obj) {
  console.log(`This inside setAppState`, this)
  for (let key in obj) {
    console.log(`key`, key);
    console.log(`obj`, obj);

    // this.setState ({
    //  [key]: obj[key]
    // });
  }
}



export default fn