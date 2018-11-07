const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const app = express();





app.engine('jade',engines.jade);
app.set('views','./views');
app.set('view engine','jade');

app.get('/',function(req,res,next) {
    res.render('index', {title: 'Hello FireBase!'});
});

app.get('/ourstory',function(req,res,next){
    res.render('ourstory',{title: 'OurStory'});
});

app.get('/gallery',function(req,res,next){
    
    res.render('gallery',{title: "Gallery"});
    
});

app.get('/ceremony',function(req,res,next){
   res.render('ceremony',{title: "Ceremony"}) 
});
 exports.app = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

