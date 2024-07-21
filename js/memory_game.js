document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart');

    const emojis = ['🐹', '🐮', '🐶', '🦊', '🐷', '🦁', '🐒', '🐨'];
    let cardsArray = [...emojis, ...emojis]; 

    let firstCard, secondCard;
    let lockBoard = false;
    let matchesFound = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initGame() {
        restartButton.style.display = "none";
        grid.innerHTML = '';
        cardsArray = shuffle([...emojis, ...emojis]);
        matchesFound = 0;
        updateScore();

        cardsArray.forEach(emoji => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="front-card"></div>
                <div class="back-card">${emoji}</div>
            `;
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.innerHTML === secondCard.innerHTML;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchesFound++;
        updateScore();
        resetBoard();

        if (matchesFound === emojis.length) {
            scoreDisplay.textContent = "You found all the matches!";
            restartButton.style.display = "flex";
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 700);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function updateScore() {
        scoreDisplay.textContent = `${matchesFound}/8 matches found`;
    }

    restartButton.addEventListener('click', initGame);

    initGame();
});