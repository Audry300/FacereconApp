import React,{Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Clarifai from 'clarifai';
import { BrowserRouter } from 'react-router-dom';

const app = new Clarifai.App({
  apiKey: 'e4d110c01e2849a7a7b7f73b640a80d9'
 });

class App extends Component {
    constructor(){
      super()
      this.state={
        input:'',
        imageURL:'',
        box:{},
        route:'signIn',
        isSignedIn: false,
        user:{
          id:'',
          name:'',
          email:'',
          entries:0,
          joined:''
        }
      }
    }


   


    loadUser = (data)=>{

      this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries: data.entries,
        joined:data.joined

      }})


    }
    calculateFaceLocation=(response)=>{
      
      const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
      console.log(clarifaiFace);
      const image = document.getElementById('inputimage');
      const width= Number(image.width);
      const height = Number(image.height);

      return{
        leftCol:clarifaiFace.left_col * width,
        topRow:clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    }

    displayFaceBox = (box)=>{
      this.setState({box: box})
    }


    onInputChange=(event)=>{
      this.setState({input:event.target.value});
    }

    onButtonSubmit=()=>{
      this.setState({imageURL:this.state.input});
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL,
          this.state.input)
        .then(response => {this.displayFaceBox(this.calculateFaceLocation(response))})
          
        .catch(err=> console.log(err));

    }

    onRouteChange=(route)=>{
      
      if(route ==='home'){
        this.setState({isSignedIn:true})
      }  else if(route ==='signout'){
        this.setState({isSignedIn:false})
      } 
      this.setState({route: route})
    }

    render(){
      return(

        
       
          <div className="App">
          <BrowserRouter>

          
              <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
            
              {this.state.route==='home' 
              ? <div>
                    <Logo />
                    <Rank />
                    <ImageLinkForm  
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}
                    />
                    <FaceRecognition  imageURL={this.state.imageURL} box={this.state.box}/>
                  </div> 
                : (
                  this.state.route==='signIn'
                  ? <SignIn onRouteChange={this.onRouteChange}/>
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  )
              } 
            </BrowserRouter>
            
          </div>
     
      
      );
    } 
}

export default App;
