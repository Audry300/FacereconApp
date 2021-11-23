import React,{Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'e4d110c01e2849a7a7b7f73b640a80d9'
 });

class App extends Component {
    constructor(){
      super()
      this.state={
        input:'',
        imageURL:''
      }
    }
    onInputChange=(event)=>{
      this.setState({input:event.target.value});
    }

    onButtonSubmit=()=>{
      this.setState({imageURL:this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
        function(response){
            console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
    
        function(err){
        }

    )
    }

    render(){
    

    return(<div className="App">
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm  
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}
    />
    <FaceRecognition  imageURL={this.state.imageURL}/>
    </div>)
    

  } 
    
  
}

export default App;
