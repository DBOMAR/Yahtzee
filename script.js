// Variabelen aanmaken die ik de hele tijd nodig heb
let dice = [];
let rollables = [true, true, true, true, true];
let rollCount = 3;
let count = 3;
let sum = 0;
let totalSum = 0;
let totalScore = 0;

let threeOfAKind = false
let fourOfAKind = false

// Contact maken met HTML elementen die al bestaan
let rolldiceKnop = document.getElementById("rolldice");
let diceDivs = document.getElementsByClassName("die");
let restart = document.getElementById("herstel");
let trying = document.getElementById("trying");
let knop = document.getElementById("knop6");

// Toevoegen van eventlisteners
rolldiceKnop.addEventListener('click', rolldiceHandler);

// Add event listener to every dice image
for (let i = 0; i < 5; i++) {
    diceDivs[i].addEventListener('click', function () {
        if (rollables[i] === true) {
            rollables[i] = false;
            diceDivs[i].style.border = "solid 2px red";
        } else {
            rollables[i] = true;
            diceDivs[i].style.border = "solid 1px black";
        }

    })
}

// Functies
function rolldiceHandler() {
    // Update images on every roll
    if (count > 0) {
        for (let i = 0; i < 5; i++) {
            if (rollables[i] === true) {
                dice[i] = Math.floor((Math.random() * 6 + 1));
                diceDivs[i].innerHTML = '<img src="die' + dice[i] + '.png" alt="">';
            }
        }
        // Update stats on every roll
        count--;
        trying.innerHTML = count + " TIMES LEFT...";
    }
}

function reload() {
    window.location.reload();
}

function knopKeuze(e) {
    verzamel(e);
}


function showTotalScore() {
    document.getElementById("totalScore").innerHTML = totalScore + totalSum;
}

function ShowTotalSum() {
    document.getElementById("totalSum").innerHTML = totalSum;
}

function verzamel(getal) {
    sum = 0
    // Calc sum first - top row
    for (let teller = 0; teller < dice.length; teller++) {
        if (dice[teller] == getal) {
            sum = sum + getal;
        }
    }

    totalSum += sum

    document.getElementById(findSelecedChoice(getal)).innerHTML = sum;
    ShowTotalSum();
    showTotalScore();


    // reset count and grid

    resetAfterRoll();

}

function findSelecedChoice(number) {
    const choices = ['one', 'two', 'three', 'four', 'five', 'six'];

    if (number == 1) {
        return choices[0]
    } else if (number == 2) {
        return choices[1]
    } else if (number == 3) {
        return choices[2]
    } else if (number == 4) {
        return choices[3]
    } else if (number == 5) {
        return choices[4]
    } else if (number == 6) {
        return choices[5]
    }
}

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

//  three of a kind //
function THREE_OF_A_KIND(array) {
    let threeOfAKind = [dice]
    let newSum = 0

    for (let teller = 0; teller < dice.length; teller++) {
        if (countInArray(array, dice[teller]) === 3) {

            newSum += dice[teller];
        }
    }

    document.getElementById("threeOfAKind").innerHTML = newSum;
    totalScore += newSum;
    resetAfterRoll();
    showTotalScore();
    // showTotaal();
}

function calcThreeOfAKind() {
    THREE_OF_A_KIND(dice)
}
//  two of a kind //
function Two_OF_A_KIND(array) {
    let newSum = 0
    for (let teller = 0; teller < dice.length; teller++) {
        if (countInArray(array, dice[teller]) === 2) {

            newSum = dice[teller] * 2
        }
    }
    // document.getElementById("threeOfAKind").innerHTML = newSum;
    totalScore += newSum;
    showTotalScore();
    // showTotaal();
}

function calcTwoOfAKind() {
    Two_OF_A_KIND(dice)
}
//  four of a kind //

function FOUR_OF_A_KIND(array) {

    let newSum = 0

    for (let teller = 0; teller < dice.length; teller++) {
        if (countInArray(array, dice[teller]) === 4) {
            // console.log("four of a kind!")
            newSum = dice[teller] * 4
        } else {
            // console.log("Not four of a kind!")
        }
    }
    document.getElementById("fourOfAKind").innerHTML = newSum;
    totalScore += newSum;
    resetAfterRoll();
    showTotalScore();
    // showTotaal();
}

function calcfourOfAKind() {
    FOUR_OF_A_KIND(dice)
}
//  full house //

function fullHouse() {
    if (calcTwoOfAKind && calcThreeOfAKind) {
        document.getElementById("fullHouse").innerHTML = "25";
        totalScore += 25;
    } else {
        document.getElementById("fullHous").innerHTML = "0"
        totalScore += 0;
    }
    showTotalScore();
    resetAfterRoll();
    // showTotaal();
}

// smallStright();

function smallStright() {
    let correct = false;
    let smallStraight1 = [1, 2, 3, 4]
    let smallStraight2 = [2, 3, 4, 5]
    let smallStraight3 = [3, 4, 5, 6]

    for (let i = 0; i < smallStraight1.length; i++) {
        found = dice.includes(smallStraight1[i]);
        if (found === true && i == smallStraight1.length - 1) {
            correct = true
            break;
        }
        continue;
    }

    for (let i = 0; i < smallStraight2.length; i++) {
        found = dice.includes(smallStraight2[i]);
        if (found === true && i == smallStraight2.length - 1) {
            correct = true
            break;
        }
        continue;
    }

    for (let i = 0; i < smallStraight3.length; i++) {
        found = dice.includes(smallStraight3[i]);
        if (found === true && i == smallStraight3.length - 1) {
            correct = true
            break;
        }
        continue;
        totalScore += 0;
        // showTotaal();
    }
    if (correct) {
        document.getElementById("smallStraight").innerHTML = "30";
        totalScore += 30;
    }
    resetAfterRoll();
    showTotalScore();
}

// largeStright//

function largeStright() {
    let goed = false;
    let largeStraight1 = [1, 2, 3, 4, 5]
    let largeStraight2 = [2, 3, 4, 5, 6]

    for (let i = 0; i < largeStraight1.length; i++) {
        found = dice.includes(largeStraight1[i]);
        if (found === true && i == largeStraight1.length - 1) {
            break;
        }
        continue;
    }

    for (let i = 0; i < largeStraight2.length; i++) {
        found = dice.includes(largeStraight2[i]);
        if (found === true && i == largeStraight2.length - 1) {
            break;
        }
        continue;
        totalScore += 0;
    }
    if (goed) {
        document.getElementById("largeStraight").innerHTML = "40";
        totalScore += 40;
    }
    resetAfterRoll();
    showTotalScore();
    // showTotaal();
}

// Chance//
function Chance() {
    let chance = [dice]
    let chanceSum = 0
    for (let i = 0; i < 5; i++) {
        chanceSum += dice[i];
    }
    document.getElementById("chance").innerHTML = chanceSum;
    totalScore += chanceSum;
    resetAfterRoll();
    showTotalScore();
    // showTotaal();
}

// Yahtzee();

function Yahtzee(array) {
    let Yahtzee = [0, 0, 0, 0, 0, 0];

    for (let teller = 0; teller < dice.length; teller++) {
        Yahtzee[dice[teller] - 1] += 1

    }
    if (Yahtzee.indexOf(5) != -1) {
        document.getElementById("Yahtzee").innerHTML = "50";
        totalScore += 50;
    } else {
        totalScore += 0;
    }
    resetAfterRoll();
    showTotalScore();
    // showTotaal();
}

// rol reset 
function resetAfterRoll() {
    count = 3;
    rollables = [true, true, true, true, true];
    trying.innerHTML = count + " TIMES LEFT";

    for (let i = 0; i < 5; i++) {
        diceDivs[i].innerHTML = '...';
        diceDivs[i].style.border = 'unset';
    }
}