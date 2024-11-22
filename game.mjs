import * as readlinePromises from 'node:readline/promises';
import fs from 'node:fs';
import { HANGMAN_UI } from './graphics.mjs';
import { GREEN, RED, WHITE, RESET } from './colors.mjs';
import Dictionary from './dictionary.mjs';

const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let selectedLanguage = 'en';
let wrongGuesses = new Set();
let startTime;
let guessedWord;
let word;

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const displayTitle = () => {
    console.clear();
    console.log(GREEN);


const hangmanArt =

'░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓██████████████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░ \n' +
'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░\n' + 
'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░\n' + 
'░▒▓████████▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒▒▓███▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░\n' + 
'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░\n' + 
'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░\n' + 
'░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░\n';
                                                                                                

    /*const lines = hangmanArt.split('\n');
    const maxWidth = Math.max(...lines.map(line => line.length));
    const padding = " ".repeat(Math.floor((process.stdout.columns - maxWidth) / 2));

    lines.forEach(line => console.log(padding + line));*/
    console.log(hangmanArt);
    
    delay(1000);
};

const displayMainMenu = () => {
    const menuItems = [
        "1. Start Game",
        "2. Select Language",
        "3. Exit"
    ];
    const longestItemLength = longestString(menuItems);
    const boxWidth = longestItemLength + 6;
    const topBottomBorder = "_".repeat(boxWidth);
    const sideBorder = "|";

    console.log(topBottomBorder);
    const menuTitle = "Main Menu";
    const titlePadding = " ".repeat(Math.floor((boxWidth - menuTitle.length) / 2));
    console.log(`${sideBorder}${titlePadding}${menuTitle}${titlePadding.padStart(titlePadding.length + (boxWidth - menuTitle.length - 2 * titlePadding.length))}${sideBorder}`);

    menuItems.forEach(item => {
        const itemPadding = " ".repeat(Math.floor((boxWidth - item.length) / 2));
        console.log(`${sideBorder}${itemPadding}${item}${itemPadding.padStart(itemPadding.length + (boxWidth - item.length - 2 * itemPadding.length))}${sideBorder}`);
    });

    console.log(topBottomBorder);
};

const selectLanguage = async () => {
    const languageOptions = Object.keys(Dictionary);
    console.clear();
    const menuItems = languageOptions.map((lang, index) => `${index + 1}. ${lang}`);
    const longestItemLength = longestString(menuItems);
    const boxWidth = Math.max(longestItemLength + 6, "Select Language".length + 6);
    const topBottomBorder = "_".repeat(boxWidth);
    const sideBorder = "|";

    console.log(topBottomBorder);
    const selectLangTitle = "Select Language";
    const titlePadding = " ".repeat(Math.floor((boxWidth - selectLangTitle.length) / 2));
    console.log(`${sideBorder}${titlePadding}${selectLangTitle}${titlePadding.padStart(titlePadding.length + (boxWidth - selectLangTitle.length - 2 * titlePadding.length))}${sideBorder}`);

    menuItems.forEach(item => {
        const itemPadding = " ".repeat(Math.floor((boxWidth - item.length) / 2));
        console.log(`${sideBorder}${itemPadding}${item}${itemPadding.padStart(itemPadding.length + (boxWidth - item.length - 2 * itemPadding.length))}${sideBorder}`);
    });

    console.log(topBottomBorder);

    if (languageOptions.length > 0) {
        const choice = await promptForNumber('Enter choice: ', 1, languageOptions.length);
        selectedLanguage = languageOptions[choice - 1];
    } else {
        console.log("No languages available!");
    }
};

const startGame = async () => {
    const words = fs.readFileSync(Dictionary[selectedLanguage].wordFile, 'utf-8')
        .toLowerCase()
        .split('\n')
        .map(word => word.trim())
        .filter(word => word.trim() !== '');

    word = getRandomWord(words);
    guessedWord = createGuessList(word.length);
    wrongGuesses = new Set();
    let isGameOver = false;
    startTime = new Date();

    do {
        updateUI();
        if (isWordGuessed(word, guessedWord)) {
            print(Dictionary[selectedLanguage].winCelebration, GREEN);
            print(`The word was ${word}!`, GREEN);
            isGameOver = true;
        } else {
            let guess = (await rl.question(Dictionary[selectedLanguage].guessPrompt)).toLowerCase();
            if (guess.length === 1) {
                if (word.includes(guess)) {
                    updateGuessedWord(guess, word, guessedWord);
                    if (isWordGuessed(word, guessedWord)) {
                        print(Dictionary[selectedLanguage].winCelebration, GREEN);
                        print(`The word was ${word}!`, GREEN);
                        isGameOver = true;
                    }
                } else {
                    if (!wrongGuesses.has(guess)) {
                        print(Dictionary[selectedLanguage].wrongGuessMessage, RED);
                        wrongGuesses.add(guess);
                        if (wrongGuesses.size >= HANGMAN_UI.length) {
                            isGameOver = true;
                            print(Dictionary[selectedLanguage].gameOverLose, RED);
                        }
                    }
                }
            } else {
                if (guess === word) {
                    print(Dictionary[selectedLanguage].winCelebration, GREEN);
                    print(`The word was ${word}!`, GREEN);
                    isGameOver = true;
                } else {
                    if (!wrongGuesses.has(guess)) {
                        print(Dictionary[selectedLanguage].wrongGuessMessage, RED);
                        wrongGuesses.add(guess);
                        if (wrongGuesses.size >= HANGMAN_UI.length) {
                            isGameOver = true;
                            print(Dictionary[selectedLanguage].gameOverLose, RED);
                        }
                    }
                }
            }
        }
    } while (!isGameOver);

    await displayGameStats();
    await displayPostGameMenu();
};

const displayGameStats = async () => {
    let endTime = new Date();
    let timeTaken = (endTime - startTime) / 1000;
    print(`Game Statistics:`);
    print(`Number of wrong guesses: ${wrongGuesses.size}`);
    print(`Time taken: ${timeTaken} seconds`);
};

const displayPostGameMenu = async () => {
    const menuItems = [
        "1. Play Again",
        "2. Main Menu",
        "3. Exit Game"
    ];
    const longestItemLength = longestString(menuItems);
    const boxWidth = longestItemLength + 6;

    const topBottomBorder = "_".repeat(boxWidth);
    const sideBorder = "|";

    console.log(topBottomBorder);
    const postGameTitle = "Post Game Menu";
    const titlePadding = " ".repeat(Math.floor((boxWidth - postGameTitle.length) / 2));
    console.log(`${sideBorder}${titlePadding}${postGameTitle}${titlePadding.padStart(titlePadding.length + (boxWidth - postGameTitle.length - 2 * titlePadding.length))}${sideBorder}`);

    menuItems.forEach(item => {
        const itemPadding = " ".repeat(Math.floor((boxWidth - item.length) / 2));
        console.log(`${sideBorder}${itemPadding}${item}${itemPadding.padStart(itemPadding.length + (boxWidth - item.length - 2 * itemPadding.length))}${sideBorder}`);
    });

    console.log(topBottomBorder);

    let choice = await promptForNumber('Enter your choice (1-3): ', 1, 3);
    switch (choice) {
        case 1:
            await startGame();
            break;
        case 2:
            return;
        case 3:
            console.log('Exiting game. Goodbye!');
            rl.close();
            process.exit();
            break;
    }
};

const longestString = (arr) => {
    if (arr.length === 0) return 0;
    return arr.reduce((max, str) => Math.max(max, str.length), 0);
};


const getRandomWord = (words) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

const updateGuessedWord = (guess, word, guessedWord) => {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
            guessedWord[i] = guess;
        }
    }
};

const createGuessList = (length) => {
    return Array(length).fill('_');
};

const isWordGuessed = (correct, guessed) => {
    return correct === guessed.join('');
};

const print = (msg, color = WHITE) => {
    console.log(color, msg, RESET);
};

const updateUI = () => {
    console.clear();
    print(guessedWord.join(''), GREEN);
    print(HANGMAN_UI[wrongGuesses.size]);
    if (wrongGuesses.size > 0) {
        print(Dictionary[selectedLanguage].wrongGuesses + RED + [...wrongGuesses].join(',') + RESET);
    }
};

const promptForNumber = async (prompt, min, max) => {
    let choice;
    do {
        choice = parseInt(await rl.question(prompt), 10);
    } while (isNaN(choice) || choice < min || choice > max);
    return choice;
};

async function main() {
    displayTitle();
    displayMainMenu();
    let choice;
    do {
        choice = await promptForNumber('Enter your choice (1-3): ', 1, 3);
        switch (choice) {
            case 1:
                await startGame();
                break;
            case 2:
                await selectLanguage();
                break;
            case 3:
                console.log('Exiting game. Goodbye!');
                rl.close();
                process.exit();
                break;
        }
    } while (choice !== 3);
}

main();
