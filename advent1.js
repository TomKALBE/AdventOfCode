const fs = require('fs');

fs.readFile('./input1.txt', 'utf-8', function(err, data) {
    if (err) throw err;

    const lines = data.split('\n');
    const elfArray = [];
    let elfIndex = 0;
    
    for (const line of lines) {
        if(line.trim() === '') elfIndex++;
        else elfArray[elfIndex] = elfArray[elfIndex] ? elfArray[elfIndex] + parseInt(line) : parseInt(line);
    }
    const topElfSumCalories = elfArray.slice().sort(function(a, b) {
        return b - a;
    }).slice(0, 1)[0];

    const topThreeElfSumCalories = elfArray.slice().sort(function(a, b) {
        return b - a;
    }).slice(0, 3).reduce(function(a, b) {
        return a + b;
    });;

    console.log(topElfSumCalories, topThreeElfSumCalories);
});

/*
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000

The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
The second Elf is carrying one food item with 4000 Calories.
The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
The fifth Elf is carrying one food item with 10000 Calories.

24000
*/