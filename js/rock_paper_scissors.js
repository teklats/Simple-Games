let me_score = 0;
let ai_score = 0;

document.addEventListener('DOMContentLoaded', () => {
    const restartButton = document.getElementById('restart');
    if (me_score == 0 && ai_score == 0) game();
    restartButton.addEventListener('click', () => {
        startAgain();
        game();
    });
});

function game() {
    const rock = document.getElementById('rock');
    const paper = document.getElementById('paper');
    const scissor = document.getElementById('scissor');

    rock.addEventListener('click', handleClick);
    paper.addEventListener('click', handleClick);
    scissor.addEventListener('click', handleClick);
}

function handleClick(event) {
    const choice = event.target.id;
    resetAll();

    let ans = getAnswer();
    let winner = chooseWinner(choice, ans);
    let ans_id = ans + "_item";

    if (winner === "me") {
        me_score++;
        showResult(choice + "_item", ans_id, false);
    } else if (winner === "ai") {
        ai_score++;
        showResult(ans_id, choice + "_item", false);
    } else {
        showResult(choice + "_item", ans_id, true);
    }

    updateScore();
}

function getAnswer() {
    if (Math.random() < 0.333) {
        return "rock";
    }
    if (Math.random() < 0.667) {
        return "paper";
    }
    return "scissor";
}

function chooseWinner(me, ai) {
    switch (me + "," + ai) {
        case "rock,rock":
        case "paper,paper":
        case "scissor,scissor":
            return "draw";
        case "rock,scissor":
        case "paper,rock":
        case "scissor,paper":
            return "me";
        case "rock,paper":
        case "paper,scissor":
        case "scissor,rock":
            return "ai";
        default:
            return "Try again";
    }
}

function resetAll() {
    document.getElementById("rock_item").style.border = "0px";
    document.getElementById("paper_item").style.border = "0px";
    document.getElementById("scissor_item").style.border = "0px";
}

function showResult(winner, loser, draw) {
    if (draw) {
        document.getElementById(winner).style.border = "7px solid gray";
        document.getElementById(winner).style.borderRadius = "200px";
        return;
    }
    document.getElementById(winner).style.border = "7px solid green";
    document.getElementById(winner).style.borderRadius = "200px";

    document.getElementById(loser).style.border = "7px solid red";
    document.getElementById(loser).style.borderRadius = "200px";
}

function showWinner(winner) {
    document.getElementById('winner-message').textContent = `${winner} won!`;
    document.getElementById('winner-message').style.display = "flex";
    document.getElementById("restart").innerText = "Restart";
    document.getElementById("restart").style.display = "flex";
}

function updateScore() {
    if (me_score == 3 || ai_score == 3) {
        disableIcons();
        showWinner(me_score == 3 ? "You" : "AI");
    }

    let ans = me_score + " : " + ai_score;
    document.getElementById("result").innerHTML = ans;
}

function startAgain() {
    me_score = 0;
    ai_score = 0;
    document.getElementById('winner-message').style.display = "none";
    document.getElementById("restart").style.display = "none";
    enableIcons();
}

function disableIcons() {
    const rock = document.getElementById('rock');
    const paper = document.getElementById('paper');
    const scissor = document.getElementById('scissor');

    rock.removeEventListener('click', handleClick);
    paper.removeEventListener('click', handleClick);
    scissor.removeEventListener('click', handleClick);
}

function enableIcons() {
    const rock = document.getElementById('rock');
    const paper = document.getElementById('paper');
    const scissor = document.getElementById('scissor');

    rock.addEventListener('click', handleClick);
    paper.addEventListener('click', handleClick);
    scissor.addEventListener('click', handleClick);
}