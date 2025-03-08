export function attachButtonClickEventHandlers(buttonPressCallback) {
    document.querySelectorAll('button.button').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(`Letter ${btn.dataset.letter} clicked`);
            buttonPressCallback(btn.dataset.letter);
        });
    });
}

export async function getWord() {
    const url = "./api.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const words = await response.json();
        const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        console.log(`randomly selected word is: ${randomWord}`);
        return randomWord;
    } catch (error) {
        console.error(error.message);
    }
};

export function mapGuessToWord(guessedWord, correctWord) {
    // 0 - correct letter, correct place
    // 1 - correct letter, wrong place
    // 2 - wrong letter
    if(guessedWord === correctWord) {
        return [
            { letter: guessedWord.charAt(0), status: 0, tile: '🟩', cssClass: 'true' },
            { letter: guessedWord.charAt(1), status: 0, tile: '🟩', cssClass: 'true' },
            { letter: guessedWord.charAt(2), status: 0, tile: '🟩', cssClass: 'true' },
            { letter: guessedWord.charAt(3), status: 0, tile: '🟩', cssClass: 'true' },
            { letter: guessedWord.charAt(4), status: 0, tile: '🟩', cssClass: 'true' }
        ];
    }
    const heatMap = [];
    guessedWord.split('').forEach((letter, letterIndex) => {
        if(correctWord[letterIndex] === letter) {
            heatMap.push({ letter: guessedWord.charAt(letterIndex), status: 0, tile: '🟩', cssClass: 'true' });
        } else if(correctWord.includes(letter)) {
            heatMap.push({ letter: guessedWord.charAt(letterIndex), status: 1, tile: '🟨', cssClass: 'maybe' });
        } else {
            heatMap.push({ letter: guessedWord.charAt(letterIndex), status: 2, tile: '⬜️', cssClass: 'wrong' })
        }
    });
    return heatMap;
}
