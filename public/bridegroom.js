console.log("bridegroom.js has been loaded...");
console.log("Loading Pictures...");
var gallery = firebase.database().ref('/bridegroomPics');

loadPictures();

$('#picturePopupModal').on('show.bs.modal',function(event){
    console.log("Entered the button event");
    var button = $(event.relatedTarget)//Button that triggered the modal
    var img_number_string = button.data('whatever')//Extract infor from data-* attributes
    //If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    //Update the modal's content. We'll use JQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    var x = "/bridegroomPics/pic0"+ img_number_string;
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

function loadPictures(){
    
    console.log("Load web gallery has been called.");
    gallery.once('value',function(snapshot){
        console.log("Getting number of objects in database that is referenced to the web page.");
        var galObjects = snapshot.numChildren();
        var index = 1;
        var picLikes;
        console.log("Gallery reference contains "+ galObjects + " objects.");
        snapshot.forEach(function(child){
            console.log(child.key);
            document.getElementById("gal"+index.toString()).src = child.val().location;
            picLikes = child.val().numlikes; 
            console.log(child.key+ ": "+ child.val().numlikes);
            index++;
            
        });
        
    });
}

function getLikes(x){
    console.log("Picture ID: "+ x + " is getting attibute of likes.");
    
    var picRef = "/bridegroomPics/pic0"+x;
    
    var picture = firebase.database().ref(picRef);
    picture.once('value',function(snapshot){
        console.log("Picture ID: "+ x + " contains " + snapshot.val().numlikes + " likes.")
        document.getElementById("pic"+ x).innerHTML = "        " + snapshot.val().numlikes;
    });
    
}

function likePicture(x){
    console.log("Picture ID: "+x +" has been selected to be liked.");
    var totalLikes;
    
    var picRef = "/bridegroomPics/pic0"+x;
    var picture = firebase.database().ref(picRef);
    var pics = firebase.database().ref('/bridegroomPics');
    var ref = pics.child('pic0'+x);
    console.log('Picture ID: '+ x +' reference has been instatiated.');
    picture.once('value',function(snapshot){
        
        picObject = snapshot.val();
        totalLikes = picObject.numlikes;
        console.log("Picture ID: "+x+" has" + totalLikes + " likes.");
        totalLikes ++;
        
        //ref.child('numlikes').set(totalLikes);
        //pics.push(totalLikes);
        //Heart Symbol: &#10084
        ref.child('numlikes').set(totalLikes);
        console.log("Picture ID: "+x + " likes field has been updated in the database to "+ totalLikes+ " likes.");
        
        document.getElementById("pic"+x).innerHTML = "        " + totalLikes;
        
        document.getElementById("modalLike").innerHTML = "        "+totalLikes;
        
    });    
}

$('.popupTwitter').click(function(event){
    console.log("Twitter Share Icon has been selected.")
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
    console.log("Facebook Share Icon has been selected.")
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
    console.log("Goolge+ Share Icon has been selected.")
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