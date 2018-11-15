console.log("ceremony.js has been loaded...");
console.log("Loading Pictures...");
var gallery = firebase.database().ref('/ceremonyPics');

loadPictures();

$('#picturePopupModal').on('show.bs.modal',function(event){
    console.log("Entered the button event");
    var button = $(event.relatedTarget)//Button that triggered the modal
    var img_number_string = button.data('whatever')//Extract infor from data-* attributes
    //If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //Update the modal's content. We'll use JQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    var x = "/ceremonyPics/pic0"+ img_number_string;
    console.log(x);
    var picture = firebase.database().ref(x);
    var totalLikes;
    picture.once('value',function(snapshot){
        console.log(snapshot.key+ ": "+snapshot.val().location);
        console.log(snapshot.key+ ": "+ snapshot.val().numlikes);
        totalLikes = snapshot.val().numlikes;
        document.getElementById('modalimg').src = snapshot.val().location;
        document.getElementById('modalLike').setAttribute("onclick",'likePicture("'+img_number_string+'")');
        document.getElementById('modalLike').innerHTML = "        " + totalLikes;
    });
});



$('#likePicture').on('show.bs.modal',function(event){
   console.log("We Like a picture"); 
});
   

function getLikes(x){
    console.log("You are getting likes for picture ID: "+ x);
    
    var picRef = "/ceremonyPics/pic0"+x;
    console.log(picRef);
    var picture = firebase.database().ref(picRef);
    picture.once('value',function(snapshot){
        document.getElementById("pic"+ x).innerHTML = "        " + snapshot.val().numlikes;
    });
    
}

function loadPictures(){
    //const gallery = firebase.database().ref('/galleryPics');
    
    gallery.once('value',function(snapshot){
       var galObjects = snapshot.numChildren();
        
        var index = 1;
        var picLikes;
        console.log("number of objects: "+ galObjects);
        snapshot.forEach(function(child){
            console.log(child.key);
            document.getElementById("gal"+index.toString()).src = child.val().location;
            picLikes = child.val().numlikes;
          //  console.log("Num Likes: "+ picLikes.toString());
           //console.log(child.key+ ": "+ child.val().location); 
            console.log(child.key+ ": "+ child.val().numlikes);
          //  document.getElementById("pic"+index.toString()).innerHTML = "&#10084    " + picLikes; 
            index++;
            
        });
        
    });
}


function likePicture(x){
    console.log("We want to like the pciture ID: "+x);
    var totalLikes;
    
    var picRef = "/ceremonyPics/pic0"+x;
    var picture = firebase.database().ref(picRef);
    var pics = firebase.database().ref('/ceremonyPics');
    var ref = pics.child('pic0'+x);
    console.log('We have liked the picture');
    picture.once('value',function(snapshot){
        
        picObject = snapshot.val();
        totalLikes = picObject.numlikes;
        console.log("There are "+ totalLikes + " likes");
        totalLikes ++;
        
        //ref.child('numlikes').set(totalLikes);
        //pics.push(totalLikes);
        //Heart Symbol: &#10084
        ref.child('numlikes').set(totalLikes);
        
        document.getElementById("pic"+x).innerHTML = "        " + totalLikes;
        
        document.getElementById("modalLike").innerHTML = "        "+totalLikes;
        console.log("there is now " + totalLikes + " likes");
    });
    
    
}
function test(x){
    console.log("Picture Like ID: "+x);
}

$('.popupTwitter').click(function(event){
    console.log("Twitter has been selected.")
   let width = 575,
       height = 430,
       left = ($(window).width() - width) / 2,
       top = ($(window).height() - height) / 2,
       url =  this.href,      
       opts = 'status=1' +
            ',width='+ width +
            ',height=' +height+
            ',top=' + top +
            ',left=' + left;
     
    window.open(url,'twitter',opts);
    
    
    return false;
});

$('#popupFacebook').click(function(event){
    console.log("facebook has been selected.")
   let width = 575,
       height = 400,
       left = ($(window).width() - width) / 2,
       top = ($(window).height() - height) / 2,
       url =  this.href,      
       opts = 'status=1' +
            ',width='+ width +
            ',height=' +height+
            ',top=' + top +
            ',left=' + left;
     
    window.open(url,'facebook',opts);
    
    
    return false;
});
$('#popupGooglePlus').click(function(event){
    console.log("facebook has been selected.")
   let width = 575,
       height = 400,
       left = ($(window).width() - width) / 2,
       top = ($(window).height() - height) / 2,
       url =  this.href,      
       opts = 'status=1' +
            ',width='+ width +
            ',height=' +height+
            ',top=' + top +
            ',left=' + left;
     
    window.open(url,'google+',opts);
    
    
    return false;
});
