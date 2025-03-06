import { useState } from 'react';

export default () => {
    const [gameHistory, setGameHistory] = useState<any[]>([]);
    const choices = ['Rock', 'Paper', 'Scissors'];

    const determineWinner = (player: string, computer: string): string => {
        if (player === computer) return 'Draw';

        const winConditions = {
            'Rock': ['Scissors'],
            'Paper': ['Rock'], 
            'Scissors': ['Paper']
        };

        return winConditions[player as keyof typeof winConditions]?.includes(computer) 
            ? 'Win' 
            : 'Lose';
    };

    const getGameHistory = () => {
        const storedHistory = localStorage.getItem('gameHistory');
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory);
            setGameHistory(parsedHistory);
            return parsedHistory;
        }
        return [];
    };

    const playGame = (playerChoice: string) => {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = determineWinner(playerChoice, computerChoice);

        const newGameRecord = {
            playerChoice,
            computerChoice,
            result,
            timestamp: new Date().toLocaleString()
        };

        const updatedHistory = [newGameRecord, ...gameHistory].slice(0, 10);
        localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
        setGameHistory(updatedHistory);

        return { playerChoice, computerChoice, result };
    };

    const clearHistory = () => {
        localStorage.removeItem('gameHistory');
        setGameHistory([]);
    };

    return {
        gameHistory,
        setGameHistory,
        getGameHistory,
        playGame,
        clearHistory,
        choices
    };
};