const gameArea = document.querySelector('#game');
const main = document.querySelector('.main');
const cards = document.querySelectorAll('.game__card');
const header = document.querySelector('.header');

const firstPlayer = document.querySelector('#player1');
const secondPlayer = document.querySelector('#player2');

const imgLeft = document.querySelector('.game__img-left');
const imgRight = document.querySelector('.game__img-right');

const finishImgLeft = document.querySelector('.success-left');
const finishImgRight = document.querySelector('.success-right');

let firstPlayerScore = document.querySelector('#score1');
let secondPlayerScore = document.querySelector('#score2');

const start = document.querySelector('.header__btn');
const restart = document.querySelector('.restart');
const overlay = document.querySelector('.overlay');
const finishMessage = document.querySelector('.game-over');

const body = document.querySelector('#scroll');

let hasFlipedCard = false;
let boardLock = false;
let firstCard, secondCard;

let score = 0;
firstPlayerScore.innerHTML = `<span id="score1" class="score">%score%</span>`;
firstPlayerScore.innerText = score;

let score2 = 0;
secondPlayerScore.innerHTML = `<span id="score1" class="score">%score%</span>`;
secondPlayerScore.innerText = score2;


start.addEventListener('click', function() {
    header.classList.add('header-hide');
    firstPlayer.classList.add('collor');
    gameArea.classList.remove('hide');
    main.classList.add('up');
    start.classList.add('remove');
    // body.classList.add('scroll');
});


const flipCard = e => {
    if(boardLock) return;
   const target = e.target.parentElement;

   if(target === firstCard) return;

   target.classList.add('flip');
   

   console.log(target.dataset.img);

   if(!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = target;
   } else {
        hasFlipedCard = false;
        secondCard = target;

        checkForMatch();
   }
};

const checkForMatch = () => {
    if(firstCard.dataset.img === secondCard.dataset.img) {
        
        if(firstPlayer.classList.contains('collor')){
            calcScore();
        } else if(secondPlayer.classList.contains('collor')) {
            calcScore2();
        }

    } else {
        unflipCards();
        removePlayers();
    }

    gameOverResults();
    
};

const removePlayers = () => {
    if(firstPlayer.classList.contains('collor')){
        firstPlayer.classList.remove('collor');
        secondPlayer.classList.add('collor');
        

    } else {
        firstPlayer.classList.add('collor');
        secondPlayer.classList.remove('collor');
    }
};


const calcScore = () => {
    if(firstPlayerScore.innerText < score +1) {
        firstPlayerScore.innerText = score+1;
        score = score+1;
        imgLeft.classList.add('perfect-left');
        setTimeout(function(){
            imgLeft.classList.remove('perfect-left');
          }, 1500)
    } 
};


const calcScore2 = () => {
    if(secondPlayerScore.innerText < score2+1) {
        secondPlayerScore.innerText = score2+1;
        score2 = score2+1;
        imgRight.classList.add('perfect-right');
        setTimeout(function(){
            imgRight.classList.remove('perfect-right');
            
          }, 1500)
    }
};


const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
      
};

const unflipCards = () => {
    boardLock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
};

const resetBoard = () => {
    [hasFlipedCard, boardLock] = [false, false];
    [firstCard, secondCard] = [null, null];
};


const gameOverResults = () => {
        if(Math.floor(firstPlayerScore.innerText) + Math.floor(secondPlayerScore.innerText) == cards.length / 2) {
           gameOver();
            restartGame();
            setTimeout(function() {
                restart.classList.add('show');
                overlay.classList.remove('overlay-hide');
                finishMessage.classList.add('size');
            }, 2000);
            
        }
};

const gameOver = () => {
    if(score > score2) {
        firstPlayer.classList.remove('color');
        firstPlayer.classList.add('winner');
        setTimeout(function() {
            finishImgLeft.classList.add('perfect-left');
        }, 2000);
        
    } else if(score === score2) {
        firstPlayer.classList.remove('color');
        secondPlayer.classList.remove('color');
        secondPlayer.classList.add('draw');
        firstPlayer.classList.add('draw');
        setTimeout(function() {
            finishImgLeft.classList.add('perfect-left');
            finishImgRight.classList.add('perfect-right');
        },2000 );
        
    } else {
        secondPlayer.classList.remove('color');
        secondPlayer.classList.add('winner');
        setTimeout(function() {
            finishImgRight.classList.add('perfect-right');
        }, 2000);
        
    }
};

const restartGame = () => {
    restart.addEventListener('click', function() {
        window.location.reload();
    })
};

cards.forEach(card => {
    card.addEventListener('click', flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;

});
















