function formValidation() {
  var fname = document.getElementsByName('firstName').value;
  var lname = document.getElementsByName('lastName').value;
  var email = document.getElementsByName('email').value;

  var text = "";

if (FirstName(fname)) {
}
if (LastName(lname)) {
}
if (Email(email)) {
}

return false;
}

/*first name input validation*/
function FirstName(fname) {
var message = document.getElementsByClassName("error-message");
var letters = /^[A-Za-z]+$/;
if ( fname =="" || fname.match(letters)) {
  text="";
  message[0].innerHTML = text;
  return true;
}

else {
  text="First name should contain only letters";
  message[0].innerHTML = text;
  return false;
}
}

/*last name input validation*/
function  LastName(lname) {
var message = document.getElementsByClassName("error-message");
var letters = /^[A-Za-z]+$/;
if ( lname =="" || lname.match(letters)) {
  text="";
  message[1].innerHTML = text;
  return true;
}

else {
  text="Last name should contain only letters";
  message[1].innerHTML = text;
  return false;
}
}

/*email address input validation*/
function Email(email) {
var message = document.getElementsByClassName("error-message");
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
var atpos = email.indexOf("@");
var dotpos = email.lastIndexOf(".");
        
if ( email =="" || email.match(mailformat) || atpos > 1 && ( dotpos - atpos > 2 )) {
  text="";
  message[2].innerHTML = text;
  return true;
}
       
else {
  text="Wrong email format";
  message[2].innerHTML = text;
  return false;
}
}

