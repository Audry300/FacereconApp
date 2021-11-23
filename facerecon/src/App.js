import React,{useState} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';




function App() {
 


  

  
  return (
    <div className="App">
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm  />
    <FaceRecognition  />
      
    </div>
  );
}

export default App;
