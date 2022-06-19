const express= require('express');

const bodyParser = require('body-parser')

const bcrypt= require('bcrypt-nodejs')

const cors= require('cors')

const knex=require('knex')

const db=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'Umy1609201.',
        database:'FaceRecon',
    }
})

db.select('*').from('users').then(data=>{
    console.log(data)

});


const app=express();
app.use(bodyParser.json())
app.use(cors())

const database={
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined:new Date()


        },
        {
            id:'124',
            name:'Sally',
            email:'Sally@gmail.com',
            password:'bananas',
            entries:0,
            joined:new Date()


        }
    ]
    
}




app.get('/',(req,res)=>{

    res.send(database.users);


})

// Score increase

app.post('/image',(req,res)=>{
    const {id}=req.body;
    let found=false;

    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
            user.entries++;
            return res.json(user.entries);
        }
        if(!found){
            res.status(400).json('not found');
        }
    })
})

// profile ID 
 app.get('/profile/:id',(req,res)=>{

    const {id} = req.params;

    db.select('*').from('users').where({
        id})
    .then(user=>{
        if(user.length){
            res.json(user[0])
        } else{
            res.status(400).json("not found")
        }
        
    })
    .catch(err=>res.status(400).json("Error getting a user"))
     
 })




// REGISTERING PROCESS

app.post('/register',(req,res)=>{
    const{email,password,name}=req.body;
    db('users')
    .returning('*')
    .insert({
        name:name,
        email:email,
        joined:new Date()
    })
    .then(response=>{
        res.json(response)
        console.log("Registered the user successfully")
    })
    .catch(err=>res.status(400).json("Unable to register"))
})

// SIGN IN PROCESS    //


app.post('/sign',(req,res)=>{
    if (req.body.email===database.users[0].email && req.body.password===database.users[0].password){
        res.json('success');
        
    }
    else{
        res.status(400).json('error logging in');
    }
    
   
})

app.listen(3000,()=>{
    console.log('app is running on port 3000');

})