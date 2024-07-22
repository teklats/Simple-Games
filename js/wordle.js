document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid-frame');
    const keyboard = document.querySelector('.keyboard');
    let currentRow = 1;
    let currentTile = 0;
    let currentGuess = '';
    const answer = 'GVELI'.toUpperCase();
    let letterColors = {}; // To see which color is now each letter; 3 - green; 2 - yellow; 1 - grey; 0 - not used

    reserList(letterColors);

    function updateGrid(letter) {
        document.getElementById("winner-message").innerHTML = "";
        if (currentTile < 5) {
            const row = document.querySelector(`.Row${currentRow}`);
            const tile = row.children[currentTile];
            updateCurrTile(tile, letter);
            currentGuess += letter;
            currentTile++;
        }
    }

    function handleKeyPress(key) {
        if (key === 'ENTER' || key === 'ENTER\n') { // Some systems might add newline
            submitGuess();
        } else if (key === 'BACKSPACE' || key === 'ERASE') {
            eraseLetter();
        } else if (/^[A-Z]$/.test(key)) {
            updateGrid(key);
        }
    }

    function eraseLetter() {
        if (currentTile > 0) {
            currentTile--;
            const row = document.querySelector(`.Row${currentRow}`);
            const tile = row.children[currentTile];
            tile.textContent = '';
            tile.style.backgroundColor = ''; 
            tile.style.border = '1.3px solid #878a8c';
            currentGuess = currentGuess.slice(0, -1);
        }
    }

    function submitGuess() {
        if (currentTile === 5) {
            if (currentGuess === answer) {
                updateRow(currentGuess, document.querySelectorAll(`.Row${currentRow} .tile`));
                document.getElementById("winner-message").innerHTML = "YOU WON!";  
            } else {
                updateRow(currentGuess, document.querySelectorAll(`.Row${currentRow} .tile`));
                currentRow++;
                currentTile = 0;
                currentGuess = '';
                if (currentRow > 6) {
                    document.getElementById("winner-message").innerHTML = "Game Over! The answer was: " + answer; 
                }
            }
        } else {
            document.getElementById("winner-message").innerHTML = "Enter a 5 letter word.";
        }
    }

    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();
        handleKeyPress(key);
    });

    keyboard.addEventListener('click', (event) => {
        const keyElement = event.target;
        if (keyElement.classList.contains('key') || keyElement.classList.contains('special-key')) {
            const key = keyElement.textContent.toUpperCase();
            handleKeyPress(key);
        }
    });

    function updateCurrTile(currTile, letter) {
        currTile.innerText = letter;
        currTile.style.display = 'flex';
        currTile.style.alignItems = 'center';
        currTile.style.justifyContent = 'center';
        currTile.style.fontSize = '32px';
        currTile.style.fontFamily = 'Helvetica';
        currTile.style.border = '1.3px solid #878a8c';
        if (letter === ' ') currTile.style.border = '1px solid #a6a6a6';
    }

    function updateTile(currTile, letter, color) {
        currTile.innerText = letter;
        currTile.style.display = 'flex';
        currTile.style.alignItems = 'center';
        currTile.style.justifyContent = 'center';
        currTile.style.fontSize = '32px';
        currTile.style.fontFamily = 'Helvetica';
        currTile.style.backgroundColor = color;
        currTile.style.color = 'white';
        currTile.style.fontWeight = 'bold';
        currTile.style.border = `1px solid ${color}`;
    }

    function updateKey(curr, letter, color) {
        if (letterColors[letter] === 3 && color === '#6aaa64') {
            curr.style.backgroundColor = color;
            curr.style.color = 'white';
            return;
        }

        if (letterColors[letter] === 2 && (color === '#6aaa64' || color === '#c9b458')) {
            curr.style.backgroundColor = color;
            curr.style.color = 'white';
            return;
        }
        if (letterColors[letter] === 1) {
            curr.style.backgroundColor = color;
            curr.style.color = 'white';
            return;
        }
        if (letterColors[letter] === 0) {
            curr.style.backgroundColor = color;
            curr.style.color = 'white';
        }
    }

    function updateRow(guess, currRow) {
        let usedIndexes = '';
        guess = guess.toUpperCase();
        let freqAnswer = {};
        reserList(freqAnswer);
        getFrequency(answer, freqAnswer);
    
        // Finds all green letters and saves their indexes
        for (let i = 0; i < 5; i++) {
            if (guess[i] === answer[i]) {
                const currLet = getKeyElement(guess[i]);
                updateTile(currRow[i], guess[i], '#6aaa64'); // green
                usedIndexes += i;
                letterColors[guess[i]] = 3;
                freqAnswer[guess[i]]--;
                updateKey(currLet, guess[i], '#6aaa64');
            }
        }
    
        // Checks yellow and grey letters
        for (let i = 0; i < 5; i++) {
            if (usedIndexes.includes(i)) continue;
            const currLet = getKeyElement(guess[i]);
            if (answer.includes(guess[i]) && freqAnswer[guess[i]] > 0) {
                updateTile(currRow[i], guess[i], '#c9b458'); // yellow
                if (letterColors[guess[i]] != 3) letterColors[guess[i]] = 2;
                freqAnswer[guess[i]]--;
                updateKey(currLet, guess[i], '#c9b458');
            } else {
                updateTile(currRow[i], guess[i], '#787c7e'); // grey
                if (letterColors[guess[i]] === 0) letterColors[guess[i]] = 1;
                updateKey(currLet, guess[i], '#787c7e');
            }
        }
    }
    
    // Helper function to get the key element by letter
    function getKeyElement(letter) {
        return Array.from(document.querySelectorAll('.key')).find(key => key.textContent === letter);
    }

    function getFrequency(word, freq) {
        for (let i = 0; i < 5; i++) {
            freq[word[i]]++;
        }
    }

    function reserList(freq) {
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            freq[letter] = 0;
        }
    }
});