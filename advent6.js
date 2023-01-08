const fs = require('fs');

fs.readFile('./input6.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    const line = data.split('\n')[0];
    console.log("First step : ",solve(line, 4), "Second step : ", solve(line, 14))
})
const solve = (line, characters) => {
    let result = '';
    let cmp = 0;
    for(let i = 0; i < line.length; i++){
        if(!result.includes(line[i]) && result.length < characters){
            result += line[i];
            cmp ++;
        }
        else{
            result = '';
            i--;
        }
        if(result.length === characters)
            break;
    }
    return cmp;
}