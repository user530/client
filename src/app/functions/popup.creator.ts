
interface Popup {
    type: 'Error' | 'GameResult',
    heading: string,
    message: string,
}

export interface PopupGameResult extends Popup {
    type: 'GameResult',
    result: 'Win' | 'Lose' | 'Draw',
    heading: string,
    message: string,
}

export interface PopupError extends Popup {
    type: 'Error',
    heading: string,
    message: string,
}

export const createWinPopup = (): PopupGameResult => ({
    type: 'GameResult',
    result: 'Win',
    heading: 'Game Won',
    message: 'Congratulations, you won! Let\'s continue the win streak.',
});

export const createDrawPopup = (): PopupGameResult => ({
    type: 'GameResult',
    result: 'Draw',
    heading: 'Game Draw',
    message: 'The game is a draw! Not bad, but I bet you can win the next one.',
});

export const createLosePopup = (): PopupGameResult => ({
    type: 'GameResult',
    result: 'Lose',
    heading: 'Game Lost',
    message: 'You lost this time! No worries, just try to win the next one.',
});

export const createErrorPopup = ({ heading, message }: { heading: string, message: string }): PopupError => ({
    type: 'Error',
    heading,
    message,
});

