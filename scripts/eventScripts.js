;
"use strict";
let onloads = [];  // Массив функций, которые должны быть обработаны при полной загрузке страницы;
const doc = document; // Кэшируем документ;
///////////////////////////
function getStart() {
  let currentUser = getCookie('username');
  if(currentUser != ''){
     doc.getElementById('form').style.visibility = 'hidden';
     doc.write(currentUser);
  }
  else{
    let button = doc.getElementById('buttonOk');
    button.onclick = saveUserInfo;
  }
};



   



onloads.push(getStart);
let saveUserInfo = function(){
    console.log('User info');
};





function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
///////////////////////////
window.onload = function() {
    for (let i in onloads) {
        onloads[i]();
    }
};