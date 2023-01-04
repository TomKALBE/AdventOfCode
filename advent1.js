const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', function(err, data) {
    if (err) throw err;

    const lines = data.split('\n');
    const elfArray = [];
    let elfIndex = 0;
    
    for (const line of lines) {
        if(line.trim() === '') elfIndex++;
        else elfArray[elfIndex] = elfArray[elfIndex] ? elfArray[elfIndex] + parseInt(line) : parseInt(line);
    }

    const topThreeElfSumCalories = elfArray.slice().sort(function(a, b) {
        return b - a;
    }).slice(0, 3).reduce(function(a, b) {
        return a + b;
    });;

    console.log(topThreeElfSumCalories);
});