$( "form" ).on( "submit",function(event){
    console.log("Submit button was clicked.");
   // if (validateMessage()){
        console.log("All inputs are true.")
        event.preventDefault();
        var data = $(this).serialize();
        console.log("Message: "+ data);
        $.ajax({
            url: '/sendmailendpoint',
            type: "POST",
            data: data,
            success: function(data){
                alert('Email message has been sent. Thank you!');
                console.log("We created an email.");
                document.getElementById("contact").reset();
            }
        });
        console.log("out of success.")
    //}else{
        
      //  return false;
    //}
    
});

function resetTextArea(){
    document.getElementById('message-text').style.backgroundColor = "#fff";
    document.getElementById('message-text').style.borderColor = "rgb(169,169,169)";    
}

/*
function validateMessage(){
    let message = document.forms['contact']['message-text'].value;
   let isValidText =/^[A-Za-z][a-zA-Z0-9\.\?,!\s]*$/g;
    let errorMessage = 'Invalid Input! Enter letters, numbers or symbols (. , ! ?)';  
    if(message.match(isValidText)){
        setValidInputField('message-text');
        return true;
    }else{
        setInValidInputField('message-text',errorMessage);
        return false;
    }
}
*/
function setValidInputField(idname){
    document.getElementById(idname).style.borderColor = "transparent";
}

function setInValidInputField(idname, message){
    document.getElementById(idname).style.borderColor = "red";
    document.getElementById(idname).style.backgroundColor = 'rgba(255,153,153)';
    document.getElementById(idname).title = message;
}


function moveTopPage(){
    $(document).ready(function(){
    $(this).scrollTop(0);
});
}