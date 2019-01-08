$( "form" ).on( "submit",function(event){
    console.log("Submit button was clicked.");
    event.preventDefault();
    //console.log($(this).serialize());
    var data = $(this).serialize();
    console.log("Message: "+ data);
    $.ajax({
        url: '/sendmailendpoint',
        type: "POST",
        data: data,
        success: function(data){
            alert('Email Message has benn sent. Thank you!');
            console.log("We created an email.");
            document.getElementById("contact").reset();
        }
    });
    console.log("out of success.")
});
//JSON.stringify(data)
//function sendMail(){
   
    
    /*$.ajax({
        url: '/sendmail',
        type: "POST",
        data: req.body,
        success: function(response){
            alert('evaluate response and show alert');
        }
    }); */
//}
function moveTopPage(){
    //location.href = "#top";
    $(document).ready(function(){
    $(this).scrollTop(0);
});
}