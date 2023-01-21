import {map} from './script.js'

let signBtn = document.getElementById('signIn');


let logForm = document.forms['login'];


signBtn.addEventListener('click', loginIN);

function loginIN(event){
    event.preventDefault();
    console.log("clincked SignIN");
}

console.log(map);




