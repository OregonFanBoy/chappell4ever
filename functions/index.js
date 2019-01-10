const functions = require('firebase-functions');
const express = require('express');
//const bodyParser = require('body-parser');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const app = express();
const nodemailer = require('nodemailer');




//View Engine Set up

app.engine('jade',engines.jade);
app.set('views','./views');
app.set('view engine','jade');



//Body Parser Middleware
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',function(req,res,next) {
    res.render('index', {title: 'Hello FireBase!'});
});
//app.listen(5000,() => console.log('Server Started...'));



app.get('/ourstory',function(req,res,next){
    res.render('ourstory',{title: 'OurStory'});
});

app.get('/gallery',function(req,res,next){
    
    res.render('gallery',{title: "Gallery"});
    
});

app.get('/ceremony',function(req,res,next){
   res.render('ceremony',{title: "Ceremony"}); 
});


app.get('/brideandgroom',function(req,res,next){
   res.render('brideandgroom',{title: "Bride and Groom"}); 
});

app.get('/groomsmen',function(req,res,next){
   res.render('groomandgroomsmen',{title: "Groomsmen"}); 
});

app.get('/weddingparty',function(req,res,next){
   res.render('weddingparty',{title: "Wedding Party"}); 
});

app.get('/the-suprise',function(req,res,next){
   res.render('thesuprise',{title: "The Suprise"}); 
});

app.get('/test',function(req,res,next){
    res.send('<script>alert("Test Message")</script>');
});

app.get('/meet-the-family', function(req,res,next){
   res.render('family',{title: "Meet The Family"}) 
});

app.post('/',(req,res)=>{
   console.log('Post was made for email.');
    console.log(req.body);
});

// Send email
app.post('/sendmailendpoint', (req, res)=>{
    console.log(req.body);
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.message);
  const output= `
    <h3> Contact Details:</h3>
    <ul>
      <li> <strong>Name:</strong> ${req.body.firstname} ${req.body.lastname}</li>
      
    </ul>
    <h3> Message: </h3>
    <p> ${req.body.message} </p>
  `;
    console.log("Mail body created. Initializing transporter...");
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'Redacted',
      pass: 'Redacted'
    },
    //allows use to send mail when using local host.
    tls:{
      rejectUnauthorized:false
    }
  });
    console.log("Transporter intialized. Initializing Mail Options....");
  let mailOptions={
    from: 'The Chappells Wedding',
    to: 'oregonfanboy@gmail.com',
    subject: 'Chappells Wedding Contact Request', //Subject line
    text: 'Hello world?', //plain text body
    html: output
  };
  console.log("Mail Options intialized. Starting transporter send mail.");
  transporter.sendMail(mailOptions, (error, info)=> {
    if(error){
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //Render a view template that displays a message to the user that their email was sent.
    //res.render('sentmail', {title: 'Sent'});
    //res.send('<script>alert("Thank you for sending an email.")</script>');
    //res.render('index', {title: 'Hello FireBase!'});
   
    res.json({success:true});
  });


});


 exports.app = functions.https.onRequest(app);


 
//app.post('/send',(req,res)=>{
//    console.log(req.body);
//});



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

