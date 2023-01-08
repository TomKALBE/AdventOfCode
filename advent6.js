const fs = require('fs');

fs.readFile('./input6.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    const line = data.split('\n')[0];
    let result = '';
    let cmp = 0;
    for(let i = 0; i < line.length; i++){
        if(!result.includes(line[i]) && result.length < 4){
            result += line[i];
            cmp ++;
        }
        else{
            result = '';
            i--;
        }
        if(result.length == 4)
            break;

    }
    console.log(result, cmp - 1)
})