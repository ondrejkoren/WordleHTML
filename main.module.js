import constants from "./constants.js";
import { mapGuessToWord, getWord, attachButtonClickEventHandlers } from "./logic.module.js";
import { renderKeyboard, renderPlayboard, attachLetterToTile, attachCssClassToTile } from './ui.module.js';

const state = {
    correctWord: null,
    guessedWords: [''],
    disabledLetters: []
};

function playNextWord() {
    renderKeyboard(state.disabledLetters);
    attachButtonClickEventHandlers(letter => {
        state.guessedWords[state.guessedWords.length - 1] += letter;
        
        const rowIndex = state.guessedWords.length - 1;
        const columnIndex = state.guessedWords[state.guessedWords.length - 1].length - 1
        attachLetterToTile(rowIndex, columnIndex, letter);
        
        if (state.guessedWords.at(-1).length == 5) {
            const currentGuessWordHeatMap = mapGuessToWord(state.guessedWords.at(-1), state.correctWord);
            console.log(`currentGuessWordHeatMap: `, currentGuessWordHeatMap.map(_ => _.tile));
            
            // disable wrong letters
            const newDisabledLetters = currentGuessWordHeatMap
                .filter(_ => _.status == 2)
                .map(_ => _.letter);
            state.disabledLetters = state.disabledLetters.concat(newDisabledLetters);

            // apply CSS based on heatmap
            for(let columnIndex = 0; columnIndex < constants.grid.colums; columnIndex++) {
                attachCssClassToTile(rowIndex, columnIndex, currentGuessWordHeatMap[columnIndex].cssClass);
            }

            //evaluate game state
            const heatMapSum = currentGuessWordHeatMap.reduce((prev, curr) => prev + curr.status, 0);
            if(heatMapSum == 0) {
                // you win!
                console.log(`YOU WIN!!!`);
                const gameresult = document.getElementById("gameresult");
                gameresult.innerText = `!!! YOU WIN !!!`;
                gameresult.style.color = 'green';
                gameresult.style.display = 'block';
                // disable all buttons
                document.querySelectorAll('button.button').forEach(btn => {
                    btn.disabled = 'disabled';
                })
            } else if(heatMapSum > 0 && state.guessedWords.length >= constants.grid.rows) {
                // you lose!
                console.log(`YOU LOSE!!!`);
                const gameresult = document.getElementById("gameresult");
                gameresult.innerText = `!!! YOU LOSE !!!`;
                gameresult.style.color = 'red';
                gameresult.style.display = 'block';
                // disable all buttons
                document.querySelectorAll('button.button').forEach(btn => {
                    btn.disabled = 'disabled';
                })
            } else {
                // continue game
                console.log(`Continue game`);
                state.guessedWords.push('');
                playNextWord();
            }
        }
    });
}

async function startNewGame() {
    state.correctWord = null;
    state.guessedWords = [''];
    state.disabledLetters = [];
    state.correctWord = await getWord();
    const gameresult = document.getElementById("gameresult");
    gameresult.style.display = 'none';
    renderPlayboard();
    playNextWord();
}

// main execution entrypoint
(function () {
    document.addEventListener('DOMContentLoaded', async () => {
        const newGameButton = document.getElementById("newGame");
        newGameButton.addEventListener('click', async () => {
            await startNewGame();
        });
        await startNewGame();
    });
})();
