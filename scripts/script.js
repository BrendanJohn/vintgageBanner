"use strict";
//clears out anything left behind in session storage
sessionStorage.clear();


//**part 1 form validation**

//gets the elements we need and assigns them to variables
var message = document.getElementById('banner');
var hint = document.getElementById('hint');
var good = document.getElementById('good');
//creates a regular expression to test user input
var regex = /\w{4}/;

message.onkeyup = function() {
    //tests the user input against the pattern
    var result = regex.test(message.value);

    if (result) {
        hint.style.display = "none";
        good.style.display = "block";
    }
    //does not match the pattern, show the hint
    else {
        hint.style.display = "block";
        good.style.display = "none";
    }
    //hides the hint if the user clears the field
    if (message.value == "") {
        hint.style.display = "none";
    }


}

//**part 2 capturing and handling events**

//gets the elements we need and assigns them to variables
var seeIt = document.getElementById('seeIt');
var output = document.getElementById('output');
var imageAddimageAdd = document.getElementById('imageAdd');
var bannerText = document.getElementById('banner-text');

//fires anonymous function to change the masthead to reflect user entered banner
seeIt.addEventListener("click", function() {
    //validates the form to ensure the user has input something in the banner area
    if (message.value == null || message.value == "") {
        alert("Please enter something");
        event.preventDefault()
        return false;
    } else {
        output.innerHTML = "<h1>" + message.value + "</h1>";
        bannerText.value = message.value;
        good.style.display = "none";
        imageAdd.style.display = "block";
    }
});


//**part 3 DOM element creation/deletion**

//gets the elements we need and assigns them to variables
var cake = document.getElementById('cakeBtn');
var balloonBtn = document.getElementById('balloonBtn');
var removeCake = document.getElementById('removeCake');
var removeBalloon = document.getElementById('removeBalloon');
var container = document.getElementById('container');

//creates a new image element to show a cake on the banner when cake button is clicked
cake.addEventListener("click", function() {

    //prevents the user from adding more than one cake
    if (document.getElementById('cake')) {
        //shows a button that allows the user to remove the cake
        $('#cakeWarning').finish().fadeIn("slow").delay(1000).fadeOut("slow");
        removeCake.addEventListener("click", function() {
            remove(document.getElementById('cake'));
        });
    } else {
        //adds a cake to the banner
        var d = document.createElement("img");
        d.setAttribute("id", "cake");
        d.setAttribute("src", "images/cake.gif");
        output.appendChild(d);
    }

});

//creates a new image element to show a cake on the banner when balloon button is clicked
balloonBtn.addEventListener("click", function() {

    //prevents the user from adding more than one balloon
    if (document.getElementById('balloon')) {
        //shows a button that allows the user to remove the balloon
        $('#balloonWarning').finish().fadeIn("slow").delay(1000).fadeOut("slow");
        removeBalloon.addEventListener("click", function() {
            remove(document.getElementById('balloon'));
        });
    } else {
        //adds a cake to the banner
        var d = document.createElement("img");
        d.setAttribute("id", "balloon");
        d.setAttribute("src", "images/balloon.gif");
        container.insertBefore(d, output);
    }

});

//utility function to delete dom elements
function remove(element) {
    element.parentNode.removeChild(element);

}

//**Part 4 create the data structure to save order details using JSON

//gets the elements we need and assigns them to variables
var fName = document.getElementById('fName');
var lName = document.getElementById('lName');
var email = document.getElementById('email');
var orderNow = document.getElementById('orderNow');
var balloon = document.getElementById('balloon');

//constructor funtion to create orders
function Order(firstName, lastName, email, message) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = email;
    this.message = message;
}


// Prevent double clicks.
var submitted = false;

//adds event listener to the order now button
orderNow.addEventListener("click", function(event) {

    var valid = true;

	if(submitted) {
		event.preventDefault();
		return false;
	}else{
		submitted = true;
	}   	

    //validates the form to ensure the user has input a last name and email address
    $("[data-required]").each(function(index, item) {

    	var val = $(this).val(),
    		field = $(this).attr('data-required');

    	if(val == '' || val == null) {
    		alert("The value for " + field + " must be entered.");
		valid = false;
		return false;    	
    	}

    });

    if(!valid) {
        event.preventDefault();
        return false;    	
    }	

});