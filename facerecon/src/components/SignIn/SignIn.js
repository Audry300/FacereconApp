import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const SignIn = ({onRouteChange})=>{

    const navigate = useNavigate();

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    

    const onSubmit=()=>{
        fetch('http://localhost:3000/sign',{

            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email:email,
                password:password
            })
        })
        .then(response => {
            response.json()
            
        })
        .then(data => {
            
            if (data === "success"){
                navigate("/home");
                console.log(data);
               
            }
            
        })

        //onRouteChange('home');
       
        
        
    }

    return(
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                
                </fieldset>
                <div className="">
                <input 
                    onClick={onSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"/>
                </div>

                <div className="lh-copy mt3">

                <p  onClick={()=>onRouteChange('register')}
                    className="f6 link dim black db pointer">
                    Register
                </p>
                
                </div>
            </form>
        </main>
        </article>
        
        
    );
}

export default SignIn;