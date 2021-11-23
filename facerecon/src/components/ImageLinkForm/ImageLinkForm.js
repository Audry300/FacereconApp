import React,{useState,useEffect} from 'react';
import Clarifai from 'clarifai';
import './ImageLinkForm.css';


const ImageLinkForm =()=>{

    const app = new Clarifai.App({
        apiKey: 'e4d110c01e2849a7a7b7f73b640a80d9'
       });
    const [input,setInput]=useState(" ");

    const [buttonSubmit,setbuttonSubmit]= useState(" ");

    useEffect(()=>{
        console.log(input);
    }) 

    return(
        <div >
        
        <p>
         {'This Brain will detect faces in the pictures provided'}   
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type="text" onChange={(e)=>setInput(e.target.value)}/>
                
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={(e)=>setbuttonSubmit(

                app.models.predict(Clarifai.FACE_DETECT_MODEL,"https://samples.clarifai.com/face-det.jpg").then(
                    function(response){
                        console.log(response)
                    },
                
                    function(err){
                    }

                )




                )}>Detect</button>

            </div>
            
        </div>
       
        </div>

    );
    
}


    
export default ImageLinkForm;