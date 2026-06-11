function random(min, max, num = 1, type = "no set"){
    if (num < 1) return [];
    if (min > max) [min, max] = [max, min];

    let range = max - min + 1;
    const rand = () => Math.floor(Math.random() * range) + min;

    if (num === 1) return rand();
    
    if (type === "no set") {
        let arr = [];
        for (let i = 1; i <= num; i++)
            arr.push(rand());

        return arr;
    }
    else {
        if (num > range) num = range;
        
        let set = new Set();
        while (set.size < num) set.add(rand());
        
        return [...set];
    }
}



let section1 = document.querySelector('.sec1');
let section2 = document.querySelector('.sec2');

let arr = [...section2.children];
let bomb = random(0, arr.length-1, 3, 'unique');


let isBet = false;
let countOpenCards = 0;
let whatIsBet = 0.00;


let dev2   = document.querySelector('.B1-2');
let times2 = document.querySelector('.B2x');
let max    = document.querySelector('.max');

let bet    = document.querySelector('.enter-money');
let money  = document.querySelector('.money');


let balance = Math.abs(parseFloat(prompt("What is your Balance?!")));
money.textContent = balance.toFixed(2) + '$';


dev2.addEventListener('click', event => {
    let betNum = Math.abs(parseFloat(bet.value.replace('$', '')));
    bet.value = '$' + (betNum / 2).toFixed(2);
});

times2.addEventListener('click', event => {
    let betNum = Math.abs(parseFloat(bet.value.replace('$', '')));
    bet.value = '$' + (betNum * 2).toFixed(2);
});

max.addEventListener('click', event => {
    let betNum = Math.abs(parseFloat(money.textContent.replace('$', '')));
    bet.value = '$' + betNum.toFixed(2);
});



let placeBet  = document.querySelector('.place-bet');
let showBet   = document.querySelector('.bet-p2');

let isLose = document.querySelector('.you-lose');
let isWin = document.querySelector('.you-win');


placeBet.addEventListener('click', event => {
    let betNum = Math.abs(parseFloat(bet.value.replace('$', '')));
    let moneyNum = parseFloat(money.textContent.replace('$', '')); 

    if (isLose.classList.contains('addYouLose') || isWin.classList.contains('addYouWin')) return;
    
    if (betNum >= moneyNum && !isBet){
        money.textContent = 0 + '$';
        betNum = moneyNum;
        showBet.textContent = moneyNum.toFixed(2) + '$';
        isBet = true;
    }
    else if (!isBet && betNum < moneyNum) {
        money.textContent = (moneyNum - betNum).toFixed(2) + '$';
        showBet.textContent = betNum.toFixed(2) + '$';
        isBet = true;
    }
    
    whatIsBet = betNum;
    bet.value = '$' + betNum.toFixed(2);
});


let rotatedCards = [];

section2.addEventListener("click", event => {
    if (event.target == section2) return;

    let target = event.target.closest('div');
    let index = arr.indexOf(target);
    rotatedCards.push(index);

    let img = event.target.src.split('/')[3];

    if (isBet && img == "card2.jpg") {
        arr[index].classList.add('rotate-card');
        
        setTimeout(() => {
            if (bomb.includes(index)){
                event.target.src = "bomb1.jpg";
                showBet.textContent = "0.00$";
                document.querySelector('.you-lose').classList.add("addYouLose");
                isBet = false;
                whatIsBet = 0.00;
            }
            else {
                event.target.src = "dolar1.jpg";
                let betMoney = parseFloat(showBet.textContent.replace('$', ''));
                betMoney *= 1.15;
                showBet.textContent = betMoney.toFixed(2) + '$';

                if (arr.length - bomb.length <= ++countOpenCards) {
                    document.querySelector('.you-win').classList.add("addYouWin");
                    let betNum = parseFloat(showBet.textContent.replace('$', ''));
                    let moneyNum = parseFloat(money.textContent.replace('$', ''));

                    showBet.textContent = "0.00$";
                    money.textContent = (betNum + moneyNum).toFixed(2) + '$';
                }
            }
            event.target.classList.add("rotate");
        }, 100);
    }
});



let withdraw  = document.querySelector('.withdraw');

withdraw.addEventListener('click', event => {
    let betNum = parseFloat(showBet.textContent.replace('$', ''));
    let moneyNum = parseFloat(money.textContent.replace('$', ''));

    showBet.textContent = "0.00$";
    money.textContent = (moneyNum + betNum).toFixed(2) + '$';

    for (let i = 0; i < rotatedCards.length; i++) {
        arr[rotatedCards[i]].querySelector('img').src = "card2.jpg";
        arr[rotatedCards[i]].classList.remove('rotate-card');
        arr[rotatedCards[i]].querySelector('img').classList.remove('rotate');
    }

    bomb = random(0, arr.length-1, 3, 'unique');

    isBet = false;
    countOpenCards = 0;
});



let reset = document.querySelector('.reset');



reset.addEventListener('click', event => {
    let moneyNum = parseFloat(money.textContent.replace('$', ''));
    let inputBet = Math.abs(parseFloat(bet.value.replace('$', '')));
    let betNum = parseFloat(showBet.textContent.replace('$', ''));

    if (isLose.classList.contains('addYouLose') || isWin.classList.contains('addYouWin'))
        whatIsBet = 0;

    money.textContent = (moneyNum + whatIsBet).toFixed(2) + '$';
    showBet.textContent = "0.00$";
    
    bomb = random(0, arr.length-1, 3, 'unique');

    document.querySelector('.you-win').classList.remove("addYouWin");
    document.querySelector('.you-lose').classList.remove("addYouLose");

    for (let i = 0; i < rotatedCards.length; i++) {
        arr[rotatedCards[i]].querySelector('img').src = "card2.jpg";
        arr[rotatedCards[i]].classList.remove('rotate-card');
        arr[rotatedCards[i]].querySelector('img').classList.remove('rotate');
    }

    isBet = false;
    countOpenCards = 0;
    whatIsBet = 0;
});