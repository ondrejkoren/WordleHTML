import constants from "./constants.js";

export function renderPlayboard() {
    const board = document.getElementById("board");
    board.innerHTML = '';
    for(let rowIndex = 0; rowIndex < constants.grid.rows; rowIndex++) {
        for(let columnIndex = 0; columnIndex < constants.grid.colums; columnIndex++) {
            let tile = document.createElement("div");
            tile.classList = "tile";
            tile.dataset.rowIndex = rowIndex;
            tile.dataset.columnIndex = columnIndex;
            board.appendChild(tile);
        }
    }
};

export function attachLetterToTile(row, column, letter) {
    const tile = document.querySelector(`.tile[data-row-index='${row}'][data-column-index='${column}']`);
    tile.innerText = letter;
}

export function attachCssClassToTile(row, column, cssClass) {
    const tile = document.querySelector(`.tile[data-row-index='${row}'][data-column-index='${column}']`);
    tile.classList.add(cssClass);
}

export function renderKeyboard(disabledLetters) {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = '';
    constants.keyboard.forEach(row => {
        const keyboardRowDiv = document.createElement(`div`);
        row.forEach(letter => {
            let button = document.createElement("button");
            button.dataset.letter = letter;
            button.innerText = letter;
            button.classList = "button";
            if(disabledLetters.includes(letter)) {
                button.disabled = 'disabled';
            }
            keyboardRowDiv.appendChild(button);
        });
        keyboard.appendChild(keyboardRowDiv);
    });
};
