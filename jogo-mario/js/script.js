var isFirstRound = true;

/* Selecionando os elementos */
const mario = document.querySelector('.game-mario-running');
const pipe = document.querySelector('.game-pipe');
const cloudsDiv = document.querySelector('.clouds');
const clouds = document.querySelector('#clouds');
const montainsDiv = document.querySelector('.montains');
const montains = document.querySelector('#montains');
const pressToStart = document.querySelector('.press-start-game');
const gameOver = document.querySelector('.press-reaload-game-over');

let recordCoins = sessionStorage.getItem('recordCoins') > 0 ? sessionStorage.getItem('recordCoins') : 0;
let quantitysCoins = 0;

document.querySelector('#recordCoins').innerHTML = recordCoins;


const audio = new Audio('meu_audio.mp3');
audio.play();

/* Função que faz com que o mario pule */
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500)
}

/* Função que verifica qual a tecla foi clicada */
const verifyKey = () => {
    if (event.keyCode == 38) {
        jump();
    }
}

/* Função de inicio do jogo */
const startFirstGame = () => {
    /* Função que mostra a tela de Game Over */
    const reloadPageGameOver = () => {
        gameOver.style.display = 'flex';
        const verifyKeyReloadGameOver = () => { event.keyCode == 38 ? document.location.reload(false) : document.location.reload(false) }
        document.addEventListener('keydown', verifyKeyReloadGameOver);
    }
    
    /* Função do jogo */
    const game = () => {
        const loop = setInterval(() => {
            const heightMario = +window.getComputedStyle(mario).bottom.replace('px','');
            const pipePosition = pipe.offsetLeft;
            const cloudsPosition = clouds.offsetLeft;
            const montainsPosition = montains.offsetLeft;
            
            /* Contador de coins */
            if (pipePosition <= 140 && heightMario > 105) {
                quantitysCoins += 1;
                document.querySelector('#quantitysCoins').innerHTML = quantitysCoins;
            }
            
            /* Aumentando a velocidade de acordo com a quantidade de coins */
            switch (quantitysCoins) {
                case 100:
                    setTimeout(() => {
                        pipe.style.animationDuration = '1.3s';
                    }, 115);
                    break;
                case 200:
                    setTimeout(() => {
                        pipe.style.animationDuration = '1.1s';
                    }, 400);
                    break;
                case 400:
                    setTimeout(() => {
                        pipe.style.animationDuration = '0.95s';
                    }, 10);
                    break;
                case 800:
                    setTimeout(() => {
                        pipe.style.animationDuration = '0.8s';
                    }, 300);
                    break;
            }
            
            /* Verificando se o jogador não bateu no pipe */
            if ((pipePosition <= 130) && (pipePosition > 0) && (heightMario < 100)) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;
                
                mario.style.animation = 'none';
                mario.style.bottom = `${heightMario}px`;
                mario.src = 'img/mario_dead.png';
                mario.style.width = '70px';
                
                clouds.style.animation = 'none';
                clouds.style.left = `${cloudsPosition}px`;
                
                montains.style.animation = 'none';
                montains.style.left = `${montainsPosition}px`;
                
                clearInterval(loop);
                quantitysCoins > recordCoins ? sessionStorage.setItem('recordCoins', quantitysCoins) : false;
                console.log(recordCoins)
                reloadPageGameOver();
            } else {
                document.addEventListener('keydown', verifyKey)
            }
        }, 100);
    }
    
    /* Iniciando o jogo */
    if (event.keyCode == 38) {
        mario.classList.remove('pause-initial-mario');
        pipe.classList.remove('pause-initial-pipe');
        cloudsDiv.classList.remove('pause-initial-clouds');
        montainsDiv.classList.remove('pause-initial-montains');
        pressToStart.style.display = 'none';
        game();
    }
}

if (isFirstRound == true) {
    document.addEventListener('keydown', startFirstGame);
}