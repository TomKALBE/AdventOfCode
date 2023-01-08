const fs = require('fs');

fs.readFile('./input2.txt', 'utf-8', function(err, data) {
    if (err) throw err;

    // Crée un objet pour mapper les chaînes de caractères aux valeurs numériques
    const scoreMap = {
        'A X': 4,
        'A Y': 8,
        'A Z': 3,
        'B X': 1,
        'B Y': 5,
        'B Z': 9,
        'C X': 7,
        'C Y': 2,
        'C Z': 6,
    };
    // Calcule le score total de la stratégie
    function calculateTotalScore(strategy) {
        let totalScore = 0;

        for (const line of strategy.split('\n')) {

            const opponent = line.substring(0, 1);
            const player = line.substring(2, 3);

            let score = whoWin(opponent, player);

            totalScore += score;
        }
        return totalScore;
    }
    function whoWin (opponent, player) {

        const loose = player === 'X';
        const draw = player === 'Y';
        const matchOptions = Object.keys(scoreMap).filter((key) => key.includes(opponent));

        if(loose) return findRightOption("loose", matchOptions)

        else if(draw) return findRightOption("draw", matchOptions)

        else return findRightOption("win", matchOptions)
    }

    function findRightOption(condition, options){

        if(condition === "loose"){
            return scoreMap[options.find((option)=> scoreMap[option] <= 3)]
        }
        else if(condition === "draw"){
            return scoreMap[options.find((option)=> scoreMap[option] >= 4 && scoreMap[option] <= 6)]
        }
        else {
            return scoreMap[options.find((option)=> scoreMap[option] >= 7 )]
        }
    }
    console.log(calculateTotalScore(data));
});
