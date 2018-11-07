console.log("loadGallery.js has been loaded...");
console.log("Loading Pictures...");
var gallery = firebase.database().ref('/galleryPics');

loadPictures();

$('#picturePopupModal').on('show.bs.modal',function(event){
    console.log("Entered the button event");
    var button = $(event.relatedTarget)//Button that triggered the modal
    var img_number = button.data('whatever')//Extract infor from data-* attributes
    //If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //Update the modal's content. We'll use JQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    var x = "/galleryPics/pic"+ img_number.toString();
    console.log(x);
    var picture = firebase.database().ref(x);
    
    picture.once('value',function(snapshot){
        console.log(snapshot.key+ ": "+snapshot.val().location);
        console.log(snapshot.key+ ": "+ snapshot.val().numlikes);
        document.getElementById('modalimg').src = snapshot.val().location;
    });
});

$('#likePicture').on('show.bs.modal',function(event){
   console.log("We Like a picture"); 
});
   



function getLikes(x){
    console.log("You are getting likes for this picture: "+ x);
    
    var picRef = "/galleryPics/pic"+x.toString();
    var picture = firebase.database().ref(picRef);
    picture.once('value',function(snapshot){
        document.getElementById("pic"+x.toString()).innerHTML = "&#10084    " + snapshot.val().numlikes;
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
            document.getElementById("gal"+index.toString()).src = child.val().location;
            picLikes = child.val().numlikes;
            console.log("Num Likes: "+ picLikes.toString());
           console.log(child.key+ ": "+ child.val().location); 
            console.log(child.key+ ": "+ child.val().numlikes);
            document.getElementById("pic"+index.toString()).innerHTML = "&#10084    " + picLikes; 
            index++;
        });
        
    });
}


function likePicture(x){
    
    var totalLikes;
    
    var picRef = "/galleryPics/pic"+x.toString();
    var picture = firebase.database().ref(picRef);
    var pics = firebase.database().ref('/galleryPics');
    var ref = pics.child('pic'+x.toString());
    console.log('We want to like the picture');
    picture.once('value',function(snapshot){
        
        picObject = snapshot.val();
        totalLikes = picObject.numlikes;
        console.log("There are "+ totalLikes + " likes");
        totalLikes ++;
        
        //ref.child('numlikes').set(totalLikes);
        //pics.push(totalLikes);
        ref.child('numlikes').set(totalLikes);
        document.getElementById("pic"+x.toString()).innerHTML = "&#10084    " + totalLikes;
        console.log("there is now " + totalLikes + " likes");
    });
    
    
}
