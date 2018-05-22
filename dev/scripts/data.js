import React from 'react';
import firebase from 'firebase';


const data = {
  instructions: {
    bell: {
      sectionName: 'Tibetan Bell',
      duration: 90,
      mp3Url: 'assets/audio/bell.mp3',
      shortName: 'bell'
    },
    settleIn: {
      sectionName: 'Settling in, Letting Go, Coming to the Present',
      duration: 90,
      mp3Url: 'assets/audio/settleIn.mp3',
      shortName: 'settleIn'
    },
    breathIntro: {
      sectionName: 'Starting to Focus on Your Breath',
      duration: 90,
      mp3Url: 'assets/audio/breathIntro.mp3',
      shortName: 'breathIntro'
    },
    breathCallback: {
      sectionName: 'Noticing Distraction and Returning to the Breath',
      duration: 90,
      mp3Url: 'assets/audio/breathCallback.mp3',
      shortName: 'breathCallback'
    },
    breathClosing: {
      sectionName: 'Releasing the Breath',
      duration: 90,
      mp3Url: 'assets/audio/breathClosing.mp3',
      shortName: 'breathClosing'
    },
    bodyIntro: {
      sectionName: 'Bringing Awareness to Your Body Sensations',
      duration: 90,
      mp3Url: 'assets/audio/bodyIntro.mp3',
      shortName: 'bodyIntro'
    },
    bodyCallback: {
      sectionName: 'Returing Attention to the Body',
      duration: 90,
      mp3Url: 'assets/audio/bodyCallback.mp3',
      shortName: 'bodyCallback'
    },
    bodyClosing: {
      sectionName: 'Bring Your Body Awareness Meditation to a Close',
      duration: 90,
      mp3Url: 'assets/audio/bodyClosing.mp3',
      shortName: 'bodyClosing'
    },
    lkIntro: {
      sectionName: 'Instructions for Beggining Loving-Kindness Meditation',
      duration: 90,
      mp3Url: 'assets/audio/lkInto.mp3',
      shortName: 'lkIntro'
    },
    lkCallback: {
      sectionName: 'Coming Back to the Loving-Kindness Practice',
      duration: 90,
      mp3Url: 'assets/audio/lkCallback.mp3',
      shortName: 'lkCallback'
    },
    lkClosing: {
      sectionName: 'Ending Loving-Kindess With the Dedication of Merit',
      duration: 90,
      mp3Url: 'assets/audio/lkClosing.mp3',
      shortName: 'lkClosing'
    },
    endingMeditation: {
      sectionName: 'Coming Out of Your Meditation',
      duration: 90,
      mp3Url: 'assets/audio/endingMeditation.mp3',
      shortName: 'endingMeditation'
    }

  }

}

const sampleData = {
  meditation1: {
    title: 'Breath Meditation',
    duration: 20, //Duration in minutes
    sections: [
      {
        sectionName: 'Starting to Focus on the Breath',
        duration: 120,   //Duration in seconds
        mp3Url: 'assets/audio/breath-intro.mp3'
      },
      {
        sectionName: 'Silence',
        duration: 300,   //Duration in seconds
        mp3Url: null
      },
      {
        sectionName: 'Reminder to Notice Distractions and Re-Focus',
        duration: 90,   //Duration in seconds
        mp3Url: 'assets/audio/breath-callback.mp3'
      }
    ],
    backgroundSound: null
    }, //End of meditation example

    //This is how the meditation data is stored in the database
    userMeditation: {
      title: 'Breath and Loving Kindness',
      sections: ['breathIntro', 360, 'breathCallback', 450, 'lk', 'bell' ],
      background: 'lightRain'
    },

    recordings: {
      //These property names match the short hand in database
      breathIntro: {
        sectionName: 'Starting to Focus on the Breath',
        duration: 120,   //Duration in seconds
        mp3Url: 'assets/audio/breathIntro.mp3'
      },

    },
    backgroundSounds: {
      lightRain: {
        sectionName: 'A Gentle Rain',
        duration: null, //This will be set when the section is created
        mp3Url: 'assets/audio/lightRain.mp3' //This is set to null when the section is created.
      }
    }

};

export default data