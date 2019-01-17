;
"use strict";
let onloads = []; // Массив функций, которые должны быть обработаны при полной загрузке страницы;
const doc = document; // Кэшируем документ;
///////////////////////////
function getStartCheck() {
    let currentUser = getCookie('username');
    let usersTheme = getCookie('userTheme');
    if (currentUser != '' && usersTheme != '') {
        createUsersInfo(usersTheme);
    } else {
        let button = doc.getElementById('buttonOk');
        button.onclick = saveUserInfo;
    }
};
onloads.push(getStartCheck);
let saveUserInfo = function() {
    let name = doc.getElementById('userName');
    setCookie('username', name.value, 1);
    let theme = doc.getElementById('selectTheme');
    if (theme.selectedIndex == 0) {
        setCookie('userTheme', 'light', 1);
    } else {
        setCookie('userTheme', 'dark', 1);
    }
    location.reload();
};
let createUsersInfo = function(theme) {
    doc.getElementById('form').style.visibility = 'hidden';
    let div = doc.createElement('div');
    doc.body.appendChild(div);
    div.setAttribute('class', 'formStyle');
    let nameLabel = doc.createElement('label');
    div.appendChild(nameLabel);
    nameLabel.setAttribute('class', 'label');
    nameLabel.innerHTML = "Name";
    let themeLabel = doc.createElement('label');
    div.appendChild(themeLabel);
    themeLabel.setAttribute('class', 'label');
    themeLabel.innerHTML = 'Theme';
    themeLabel.classList.add('labelTheme');
    let nameInput = doc.createElement('input');
    div.appendChild(nameInput);
    nameInput.setAttribute('class', 'input');
    nameInput.type = 'text';
    nameInput.readOnly = true;
    nameInput.value = getCookie('username');
    let themeInput = doc.createElement('input');
    div.appendChild(themeInput);
    themeInput.setAttribute('class', 'input');
    themeInput.classList.add('select');
    themeInput.type = 'text';
    themeInput.readOnly = true;
    themeInput.value = theme;
    if (theme === 'dark') {
        div.style.backgroundColor = 'blue';
        div.classList.add('darkFormStyle');
        nameLabel.style.color = 'red';
        themeLabel.style.color = 'red';
    }
    let deleteButton = doc.createElement('button');
    div.appendChild(deleteButton);
    deleteButton.setAttribute('class', 'buttonOk');
    deleteButton.innerHTML = "Delete all";
    deleteButton.style.color = 'red';
    deleteButton.onclick = clearListCookies;

};



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function clearListCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var spcook = cookies[i].split("=");
        document.cookie = spcook[0] + "=;expires=Thu, 21 Sep 1979 00:00:01 UTC;";
    }
  setTimeout(()=>{location.reload();}, 1000);
}
///////////////////////////
window.onload = function() {
    for (let i in onloads) {
        onloads[i]();
    }
};