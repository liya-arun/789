document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded. Initializing game...");

    const difficultySelect = document.getElementById('difficulty-select');
    const scrambledWordDisplay = document.getElementById('scrambled-word');
    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-guess');
    const nextButton = document.getElementById('next-word');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');

    let currentWord = '';
    let scrambledWord = '';
    let score = 0;
    let currentWordList = [];

    // Check if word lists are loaded
    if (typeof easyWords === 'undefined' || typeof mediumWords === 'undefined' || typeof hardWords === 'undefined') {
        messageDisplay.textContent = 'Error: Word lists not found. Please check that easy.js, medium.js, and hard.js are loaded correctly.';
        console.error("Word lists not found. Make sure easy.js, medium.js, and hard.js are included before script.js");
        return; // Stop execution if word lists are not loaded
    }

    const wordLists = {
        easy: easyWords,
        medium: mediumWords,
        hard: hardWords,
    };

    function selectWordList(difficulty) {
        console.log(`Selecting word list for difficulty: ${difficulty}`);
        currentWordList = wordLists[difficulty];
        console.log(`Word list contains ${currentWordList.length} words.`);
    }

    function scrambleWord(word) {
        let scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
        console.log(`Scrambling word: ${word} -> ${scrambled}`);
        return scrambled;
    }

    function startGame() {
        console.log("Starting a new game...");
        messageDisplay.textContent = '';
        guessInput.value = '';
        const difficulty = difficultySelect.value;
        selectWordList(difficulty);

        if (currentWordList.length === 0) {
            messageDisplay.textContent = `No words available for ${difficulty} difficulty.`;
            console.error(`Word list for ${difficulty} is empty.`);
            return;
        }

        currentWord = currentWordList[Math.floor(Math.random() * currentWordList.length)];
        console.log(`Selected word: ${currentWord}`);

        scrambledWord = scrambleWord(currentWord);
        while(scrambledWord === currentWord){
            console.log("Scrambled word is the same as original, rescrambling...");
            scrambledWord = scrambleWord(currentWord);
        }
        scrambledWordDisplay.textContent = scrambledWord;
    }

    function checkGuess() {
        const userGuess = guessInput.value.toLowerCase();
        console.log(`User guess: ${userGuess}, Current word: ${currentWord}`);
        if (userGuess === currentWord) {
            score++;
            scoreDisplay.textContent = score;
            messageDisplay.textContent = 'Correct!';
            console.log("User guessed correctly. Starting new round.");
            setTimeout(startGame, 1000); // Start new game after 1 second
        } else {
            messageDisplay.textContent = 'Incorrect. Try again.';
            console.log("User guessed incorrectly.");
        }
    }

    submitButton.addEventListener('click', checkGuess);
    nextButton.addEventListener('click', startGame);
    difficultySelect.addEventListener('change', startGame);
    guessInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });

    // Initial game start
    startGame();
});
