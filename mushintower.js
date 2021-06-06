const playButton = document.querySelector('.playButton');
const home = document.querySelector('.home');
const scene = document.querySelector('.scene');
const falling = document.querySelector('.falling');
const room = document.querySelector('.room');
const fallingGuy = document.querySelector('.falling .guy');
const hallGuy = document.querySelector('.hall .guy');
const towerGuy = document.querySelector('.room .guy');
const blackScreen = document.querySelector('#blackScreen');
const theDoors = document.querySelectorAll('.innerDoor');
const question = document.querySelector('.question');
const answers = document.querySelectorAll('.answer:not(.doorTitle)');
const stage = document.querySelector('.stage');
const hall = document.querySelector('.hall');
const digitalCode = document.querySelector('.digitalCode');
const wideDigitalCodeContainer = document.querySelector('.wideDigitalCodeContainer');
const exit = document.querySelector('.exit');
const digits = document.querySelectorAll('.digit');
const cancel = document.querySelector('.cancel');
const validate = document.querySelector('.validate');
const code = document.querySelector('.code');
const elevatorInnerLeftDoor = document.querySelector('.elevatorInnerLeftDoor');
const elevatorInnerRightDoor = document.querySelector('.elevatorInnerRightDoor');
const winnerGuy = document.querySelector('.winnerGuy');
const colorTheme = document.querySelector('.colorTheme');

const aaahhh = new Audio('./sound/AAAAAAAAAaaaaaaaaaaAAa.mp3');
const bahNon = new Audio('./sound/bah non.mp3');
const bip = new Audio('./sound/bip.mp3');
const bonneReponse = new Audio('./sound/bonne reponse.mp3');
const boum = new Audio('./sound/Boum.mp3');
const pas = new Audio('./sound/Bruit de pas.mp3');
const bonneReponse2 = new Audio('./sound/C_est la bonne réponse.mp3');
const souvenirMDP = new Audio('./sound/Es ce que je me souviens du mdp.mp3');
const gobi = new Audio('./sound/Gobi.mp3');
const jeSavais = new Audio('./sound/Je savais que ça allait arriver.mp3');
const porteAsscensseur = new Audio('./sound/porte assanceur.mp3');
const porte = new Audio('./sound/Porte qui grince.mp3');

let themeIsColored = false;

let curentStage = 1;
let currentQuestion;
let answeredQuestions = [];

function playWalkSound(seconds){
    const interval = setInterval(() => {
        pas.play();
    }, 100);
    setTimeout(() => {
        clearInterval(interval);
    }, seconds*1000);
}

function playNopeSound(){
    const sound = Math.floor(Math.random()*2);
    if(sound===0){
        bahNon.play();
    }else{
        jeSavais.play();
    }
}

function playYepSound(){
    const sound = Math.floor(Math.random()*3);
    if(sound===0){
        bonneReponse2.play();
    }else{
        bonneReponse.play();
    }
}

digitalCode.addEventListener('click', function(){
    wideDigitalCodeContainer.style.display="flex";
    souvenirMDP.play();
});

exit.addEventListener('click', function(){
    wideDigitalCodeContainer.style.display="none";
    code.innerText="";
});

digits.forEach(digit => {
    digit.addEventListener('click',function(){
        bip.play();
        code.innerText+=digit.innerText;
    });
});

cancel.addEventListener('click', function(){
    bip.play();
    code.innerText="";
});

const questions = {
    "1":{
        "value":"Churchill est-il un personnage de fiction ?",
        "answers":{
            "1":{
                "value":"Oui",
                "isCorrect":false
            },
            "2":{
                "value":"Non",
                "isCorrect":true
            },
            "3":{
                "value":"Je ne sais pas",
                "isCorrect":false
            }
        }
    },
    "2":{
        "value":"En quelle année Churchill est-il né ?",
        "answers":{
            "1":{
                "value":"30 novembre 1874",
                "isCorrect":true
            },
            "2":{
                "value":"22 décembre 1873",
                "isCorrect":false
            },
            "3":{
                "value":"13 août 1872",
                "isCorrect":false
            }
        }
    },
    "3":{
        "value":"Quelle est la nationalité de Churchill ?",
        "answers":{
            "1":{
                "value":"Italien",
                "isCorrect":false
            },
            "2":{
                "value":"Britannique",
                "isCorrect":true
            },
            "3":{
                "value":"Français",
                "isCorrect":false
            }
        }
    },
    "4":{
        "value":"Traduire en allemand : If you're going through hell, keep going.",
        "answers":{
            "1":{
                "value":"Als je door een hel gaat, ga dan door.",
                "isCorrect":false
            },
            "2":{
                "value":"Wenn Sie durch die Hölle gehen, machen Sie weiter.",
                "isCorrect":true
            },
            "3":{
                "value":"Ha a poklok poklát éled át, menj tovább.",
                "isCorrect":false
            }
        }
    },
    "5":{
        "value":"Traduire en japonais : If you're going through hell, keep going.",
        "answers":{
            "1":{
                "value":"지옥을보고 있다면, 계속하십시오.",
                "isCorrect":false
            },
            "2":{
                "value":"如果你正在经历地狱，请继续前进",
                "isCorrect":false
            },
            "3":{
                "value":"地獄を見ているのなら、続けてください",
                "isCorrect":true
            }
        }
    },
    "6":{
        "value":"Traduire en estonien : If you're going through hell, keep going.",
        "answers":{
            "1":{
                "value":"Kui sa lähed läbi põrgu, mine edasi.",
                "isCorrect":true
            },
            "2":{
                "value":"Om du går igenom ett helvete, fortsätt.",
                "isCorrect":false
            },
            "3":{
                "value":"Jos käyt läpi helvettiä, jatka eteenpäin.",
                "isCorrect":false
            }
        }
    },
    "7":{
        "value":"Quel est le drapeau de l'Inde ?",
        "answers":{
            "1":{
                "value":"<img src='./img/flag1.jpg'>",
                "isCorrect":true
            },
            "2":{
                "value":"<img src='./img/flag2.jpg'>",
                "isCorrect":false
            },
            "3":{
                "value":"<img src='./img/flag3.jpg'>",
                "isCorrect":false
            }
        }
    },
    "8":{
        "value":"Quel est le drapeau de la Norvège ?",
        "answers":{
            "1":{
                "value":"<img src='./img/flag4.jpg'>",
                "isCorrect":false
            },
            "2":{
                "value":"<img src='./img/flag5.jpg'>",
                "isCorrect":false
            },
            "3":{
                "value":"<img src='./img/flag6.jpg'>",
                "isCorrect":true
            }
        }
    },
    "9":{
        "value":"Quel est le drapeau du Cameroun ?",
        "answers":{
            "1":{
                "value":"<img src='./img/flag7.jpg'>",
                "isCorrect":false
            },
            "2":{
                "value":"<img src='./img/flag8.jpg'>",
                "isCorrect":false
            },
            "3":{
                "value":"<img src='./img/flag9.jpg'>",
                "isCorrect":true
            }
        }
    },
}

function setQuestion(){
    if(answeredQuestions.length!=Object.keys(questions).length){
        let nb = Math.floor(Math.random()*9)+1;
        while (answeredQuestions.includes(nb)) {
            nb = Math.floor(Math.random()*9)+1;
        }
        console.log(nb);
        const writtenAnswers = [];
        question.innerText=questions[nb].value;
        for (let i = 0; i < 3; i++) {
            let answerNb = Math.floor(Math.random()*3)+1;
            while (writtenAnswers.includes(answerNb)) {
                answerNb = Math.floor(Math.random()*3)+1;
            }
            answers[i].innerHTML=questions[nb].answers[answerNb].value;
            answers[i].setAttribute('answerNb',answerNb);
            writtenAnswers.push(answerNb);
        }
        answeredQuestions.push(nb);
        currentQuestion=nb;
    }
}

// setQuestion();

function startGame(){
    home.style.display='none';
    scene.style.animation='towerSlide 5s linear';
    scene.style.animationFillMode='forwards';
    fallingGuy.style.display='block';
    aaahhh.play();
    setTimeout(() => {
        boum.play();
    }, 4500);
    setTimeout(() => {
        fallingGuy.classList.add('onTheFloor');
    },5500);
    setTimeout(() => {
        playWalkSound(3);
        fallingGuy.classList.add('walkRight');
    },7500);
    setTimeout(() => {
        blackScreen.className='black';
    }, 10500);
    setTimeout(() => {
        falling.style.display='none';
        hall.style.display='flex';
        blackScreen.className='transparent';
    }, 11500);
}

playButton.addEventListener('click',function(){
    gobi.play();
    setInterval(() => {
        gobi.play();
    }, 5000);
    startGame();
});

theDoors.forEach(door => {
    door.addEventListener('click', function(){
        if(door.attributes.isclickable){
            porte.play();
            door.classList.add('open');
            door.parentElement.parentElement.style.zIndex='1';
            const id = door.id;
            theDoors.forEach(door => {
                door.removeAttribute('isclickable');
            });
            if(id==="door1" || id==="hell"){
                towerGuy.classList.add('walkLeft');
                hallGuy.classList.add('walkLeft');
            }else if(id==="door2"){
                towerGuy.classList.add('walkBack');
            }else{
                towerGuy.classList.add('walkRight');
            }
            playWalkSound(3);
            setTimeout(() => {
                blackScreen.className='black';
            }, 3000);
            let answernb;
            if(id!=="hell"){
                answernb = door.parentElement.previousElementSibling.attributes.answernb.value;
            }
            if(answeredQuestions.length==Object.keys(questions).length && questions[currentQuestion].answers[answernb].isCorrect){
                winGame();
            }else{
                setTimeout(() => {
                    towerGuy.className="guy";
                    theDoors.forEach(door => {
                        door.setAttribute('isclickable',true);
                        door.className="innerDoor";
                    });
                    if(id!=="hell"){
                        if(questions[currentQuestion].answers[answernb].isCorrect){
                            playYepSound();
                            curentStage+=1;
                        }else{
                            playNopeSound();
                            curentStage=1;
                            answeredQuestions = [];
                        }
                    }else{
                        hall.style.display='none';
                        room.style.display='flex';
                        curentStage=1;
                        answeredQuestions = [];
                    }
                    stage.innerText="Etage "+curentStage;
                    setQuestion();
                    blackScreen.className='transparent';
                }, 4000);
            }
        }
    });
});

validate.addEventListener('click',function(){
    bip.play();
    if(code.innerText==="42"){
        porteAsscensseur.play();
        curentStage=1;
        wideDigitalCodeContainer.style.display="none";
        hallGuy.classList.add('walkRight');
        elevatorInnerLeftDoor.classList.add('elevatorOpenLeft');
        elevatorInnerRightDoor.classList.add('elevatorOpenRight');
        setTimeout(() => {
            blackScreen.className='black';
        }, 3000);
        winGame();
    }
    code.innerText="";
});

function winGame(){
    setTimeout(() => {
        theDoors.forEach(door => {
            door.setAttribute('isclickable',true);
            door.className="innerDoor";
        });
        answeredQuestions = [];
        hall.style.display='none';
        room.style.display='none';
        scene.style.animation='';
        fallingGuy.className='guy';
        fallingGuy.style.display='none';
        winnerGuy.style.display='block';
        winnerGuy.classList.add('walkLeft');
        falling.style.display='flex';
        blackScreen.className='transparent';
    }, 4000);
    setTimeout(() => {
        home.style.display='flex';
        winnerGuy.style.display='none';
        winnerGuy.className='winnerGuy';
        hallGuy.className='guy';
        elevatorInnerLeftDoor.className='elevatorInnerLeftDoor';
        elevatorInnerRightDoor.className='elevatorInnerRightDoor';
    }, 6000);
}

var head = document.getElementsByTagName('HEAD')[0]; 
var link = document.createElement('link');
link.rel = 'stylesheet'; 
link.href = 'colorTheme.css'; 

colorTheme.addEventListener('click',function(){
    themeIsColored=!themeIsColored;
    switchColorTheme();
});

function switchColorTheme(){
    if(themeIsColored){
        head.appendChild(link); 
    }else{
        link.remove();
    }
}