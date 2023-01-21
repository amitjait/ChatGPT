
let signform = document.forms['signUp'];
let sbtn = document.getElementById('sbtn');


if(sbtn != null){
    sbtn.addEventListener('click', signUp);
}

let id = 0;

function signUp(event){
    event.preventDefault();
    // let inputs = document.getElementsByTagName('input');
    let name = signform['name'];
    let email = signform['email'];
    let pwd = signform['pwd'];
    let cpwd = signform['cpwd'];

    // console.log(name.value, email.value, pwd.value, cpwd.value);

    
    let alert = document.getElementById('alert');

    if(name.value.length < 2){
        alert.innerHTML = "Name should have at least 2 letter word!";
        alert.style.display = "block";
        return;
    }else{
        alert.innerHTML = "";
    }

    let validEmail = ValidateEmail(email.value);
    if(!validEmail){
        alert.innerHTML = "Invalid Email address! Please enter valid Email!";
        alert.style.display = "block";
        return;
    }

    let validPwd = ValidPassword(pwd.value);

    if(pwd.value == name.value || pwd.value == email.value){
        if(pwd.value == name.value){
            alert.innerHTML = "Password can't be same as name!";
        }else{
            alert.innerHTML = "Password can't be same as Email!";
        }
        alert.style.display = "block";
        return;
    }else if(!validPwd){
        alert.innerHTML = "Please consists 1 capital, 1 small, 1 number and 1 special character at least";
        alert.style.display = "block";
        return;
    }
    
    if(pwd.value != cpwd.value){
        alert.innerHTML = "Password & Confirm Password is not same!";
        alert.style.display = "block";
        return;
    }


    if(hasMethod(email.value)){
        alert.innerHTML = "This Email is already registered";
        alert.style.display = "block";
        return;
    }else{
        id++;
        let user = {
            "id":id, 
            "name":name.value,
            "email":email.value,
            "password":pwd.value
        }

        sessionStorage.setItem(email.value, JSON.stringify(user));
    }

    
    console.log(sessionStorage);

    alert.innerHTML = "";

    window.location.href = "sigIn.html";
}

function hasMethod(value){
    for(let i=0; i<sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        if(key == value){
            return true;
        }
    }

    return false;
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    // alert("You have entered an invalid email address!")
    return (false)
}

function ValidPassword(Password){
    var capital = /[A-Z]/;
    var small = /[a-z]/;
    let number = /[0-9]/;
    let special = /[^a-zA-Z0-9]/;

    if(capital.test(Password) && small.test(Password) && number.test(Password) && special.test(Password)){
        return true;
    }else{
        return false;
    }

    
}



// sing in page script

let singBtn = document.getElementById('signIn');

if(singBtn != null){
    singBtn.addEventListener('click', login);
}

let signUpform = document.forms['login'];

function login(){
    let email = signUpform['email'].value;
    let password = signUpform['pwd'].value;

    if(hasMethod(email)){
        let user = sessionStorage.getItem(email);
        let obj = JSON.parse(user);

        if(obj["password"] == password){
            let token = generateString(10);
            user["token"] = token;
            user["calls"] = 0;

            sessionStorage.setItem(email, JSON.stringify(user));
            sessionStorage.setItem(token, JSON.stringify(user));

            window.location.href = "ChatGPT.html";
        }else{
            document.getElementById('alertS').style.innerHTML = "Wrong Credentials!"
            return;
        }
    }
}



// random string

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
