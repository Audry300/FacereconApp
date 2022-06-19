const express= require('express');

const bodyParser = require('body-parser')

const bcrypt= require('bcrypt-nodejs')

const cors= require('cors')

const knex=require('knex')

const postgres=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'Umy1609201.',
        database:'FaceRecon',
    }
})

console.log(postgres.select('*').from('users'));


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

    let found=false;

    database.users.forEach(user=>{
        if(user.id===id){
            found=true;
            return res.json(user);
        } 

        if (!found){
            res.status(400).json("no such user");
        }
    })
     
 })




// REGISTERING PROCESS

app.post('/register',(req,res)=>{
    const{email,password,name}=req.body;

    bcrypt.hash(password,null,null,function(err,hash){
        console.log(hash);
    })
    database.users.push({
        id:'125',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined:new Date()
    })
    res.json(database.users[database.users.length-1]);
    console.log(database.users[database.users.length-1]);
    
    
    
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