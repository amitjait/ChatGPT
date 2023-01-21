

let arr = [];

let dog = {
    question: 'What is a dog',
    answer: 'Dog is a animal with 4 legs', 
    imageLink: "dog.jpg"
}

let cat = {
    question: 'What is a cat',
    answer: 'Cat is an Animal', 
    imageLink:'cat.jpg'
}

let fish = {
    question: 'What is a fish',
    answer: 'Fish are aquatic vertebrate animals that have gills but lack limbs with digits, like fingers or toes', 
    imageLink:'fish.jpg'
}

let virat = {
    question: 'Who is Virat Kohli',
    answer: 'Virat Kohli is an Indian international cricketer and former captain of the Indian national team.', 
    imageLink:'viratKohli.jpg'
}

arr.push(cat);
arr.push(dog);
arr.push(fish);
arr.push(virat);

let findBtn = document.getElementById('find');

if(findBtn != null){
    findBtn.addEventListener('click', findAns);
}

function findAns(){
    let question = document.getElementById('question').value;
    
    for(let t of arr){
        console.log(t["question"], question);
        if(t["question"] == question){
            let div = document.getElementById('ansDiv');
            div.innerHTML = "";
            let p = document.createElement('p');
            let img = document.createElement('img');

            p.innerHTML = t["answer"];

            img.src = t["imageLink"];
            img.classList.add('imgFor');

            div.appendChild(img);
            div.appendChild(p);

            let input = document.createElement('input');
            input.setAttribute('id', 'inp');
            input.placeholder = "Enter your token here";

            let btn = document.createElement('button');
            btn.innerText = "Speak Text";
            btn.setAttribute('id', 'speakBtn');
            

            let speakDiv = document.getElementById('speak');
            speakDiv.innerHTML = "";

            speakDiv.appendChild(input);
            speakDiv.appendChild(btn);

            btn.onclick = checkToken;

            function checkToken(){
                let value = document.getElementById('inp').value;
                if(hasMethod(value)){
                    let obj = sessionStorage.getItem(value);
                    let calls = obj["calls"];
                    let p = document.createElement('p');
                    if(calls == 10){
                        p.innerHTML = "You has used your all calls!";
                        p.style.color = "red";
                    }else{
                        calls++;
                        p.innerHTML = obj["name"] +" "+calls;

                        obj["calls"] = calls;

                        sessionStorage.setItem(obj["email"], JSON.stringify(obj));
                        sessionStorage.setItem(value, JSON.stringify(obj));
                    }
                    
                    speakDiv.appendChild(p);
                    return;
                }else{
                    p.innerHTML = "Token is worng!";
                    p.style.color = "red";
                    
                    speakDiv.appendChild(p);
                    return;
                }
            }


        }
    }

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
