document.addEventListener('DOMContentLoaded', () => {
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

    const wordLists = {
        easy: easyWords,
        medium: mediumWords,
        hard: hardWords,
    };

    function selectWordList(difficulty) {
        currentWordList = wordLists[difficulty];
    }

    function scrambleWord(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    function startGame() {
        messageDisplay.textContent = '';
        guessInput.value = '';
        const difficulty = difficultySelect.value;
        selectWordList(difficulty);
        currentWord = currentWordList[Math.floor(Math.random() * currentWordList.length)];
        scrambledWord = scrambleWord(currentWord);
        while(scrambledWord === currentWord){
            scrambledWord = scrambleWord(currentWord);
        }
        scrambledWordDisplay.textContent = scrambledWord;
    }

    function checkGuess() {
        const userGuess = guessInput.value.toLowerCase();
        if (userGuess === currentWord) {
            score++;
            scoreDisplay.textContent = score;
            messageDisplay.textContent = 'Correct!';
            startGame();
        } else {
            messageDisplay.textContent = 'Incorrect. Try again.';
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

    startGame();
});
