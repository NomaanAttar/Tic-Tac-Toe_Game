let boxes = document.querySelectorAll('.box');          //Access the Elements.....
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let music = new Audio('/music/mymusic.wav'); 
let music2 = new Audio('/music/mymusic2.mp3');
let music3 = new Audio('/music/mymusic3.wav');
let body = document.querySelector('body');
let player = document.querySelector('.player');

let turnX = true;       // Assume turn
let count = 0;          // Assume count as 0

const winPatterns = [       //store win pattern
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

resetBtn.addEventListener('click',()=>{         //Add event listner on clicking on reset button
    turnX = true;
    enableBoxes();
    music3.play();
    count=0;
});

newGameBtn.addEventListener('click',()=>{       //Add event listner on clicking on new game button     
    turnX = true;
    enableBoxes();
    msgContainer.classList.add('hide')
    music3.play();
    count = 0;
    document.body.style.backgroundImage = "url('gamebackground.avif')";
    player.innerHTML = "turn for Player 1"
});

boxes.forEach((box)=>{                          //Add for each for accesing each box
    box.addEventListener('click',()=>{          //Add eventlistener on each box
        music.play();
        if(turnX===true){                       //access the turn here
            box.innerHTML="X";
            turnX=false;
        }
        else {
            box.innerHTML="O";
            turnX=true;
        }
        box.disabled = true;
        count++;
       let isWinner =  checkWinner();           
        
        if(box.innerHTML === "X"){
            player.innerHTML = "turn for Player 2"
        }
        else {
            player.innerHTML = "turn for Player 1"
        }

        if(count === 9 && !isWinner){        // check for game draw
            gameDraw();
        }
    });
});


const gameDraw =()=>{                           // function for game draw function
    setTimeout(()=>{
        msg.innerHTML = 'Game was Draw, Play Again!!!';
        msgContainer.classList.remove('hide');
        document.body.style.backgroundImage = "url('gamebackground.avif')";
        disableBoxes();
    },500)
}

const disableBoxes = ()=>{                      //function for disable boxes
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{                       //function for enable boxes
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML="";
    }
}

const showWinner = (winner)=>{                  // function for showing winner
    setTimeout(()=>{
        msg.innerHTML = `Congratulations winner is ${winner}`;
        msgContainer.classList.remove('hide');
        music2.play();
        document.body.style.backgroundImage = "url('/images/winner.jpg')";
        document.body.style.backgroundSize = "cover";
        disableBoxes();
    },500)
}

const checkWinner = ()=>{                       //function for checking winner
    for(let pattern of winPatterns){
    let pos1val = boxes[pattern[0]].innerHTML;
    let pos2val = boxes[pattern[1]].innerHTML;
    let pos3val = boxes[pattern[2]].innerHTML;

    if(pos1val!="" && pos2val!="" && pos3val!=""){
        if(pos1val===pos2val && pos2val===pos3val) {
            showWinner(pos1val);
            return true;
        }
    }
    }
};


