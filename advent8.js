const fs = require('fs');

fs.readFile('./input8.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    const matrix = [[]];
    const resultMap = {}

    data.split('\n').forEach((line, i) => {
        line.split('').forEach((element, j) => {
            if (!matrix[i]) matrix[i] = [];
                matrix[i][j] = element;
        });
    });

    lookFromLeft(matrix, resultMap)
    lookFromRight(matrix, resultMap)
    lookFromTop(matrix, resultMap)
    lookFromBottom(matrix, resultMap)

    console.log(resultMap,Object.keys(resultMap).length)

})
const lookFromLeft = (map, result) => {
    for(let i = 0; i < map.length; i++){
        let biggestTree = 0;
        for(let j = 0; j < map[0].length; j++){
            if((j === 0 && i === 0) || biggestTree < map[i][j]){
                biggestTree = map[i][j];
                result[i.toString() + j.toString()] = map[i][j];
            }
            // console.log(i, j)
        }
    }
    // console.log(map, result)
}
const lookFromRight = (map, result) => {
    for(let i = 0; i < map.length; i++){
        let biggestTree = 0;
        for(let j = map[0].length - 1; j >= 0; j--){
            if((j === map[0].length - 1 && i === 0) || biggestTree < map[i][j]){
                biggestTree = map[i][j];
                result[i.toString() + j.toString()] = map[i][j];
            }
        }
    }
}
const lookFromTop = (map, result) => {
    for(let j = 0; j < map[0].length; j++){
        let biggestTree = 0;
        for(let i= 0; i < map.length; i++){
            if((i === 0 && j === 0)|| biggestTree < map[i][j]){
                biggestTree = map[i][j];
                result[i.toString() + j.toString()] = map[i][j];
            }
        }
    }    
}
const lookFromBottom = (map, result) => {
    for(let j = 0; j < map[0].length; j++){
        let biggestTree = 0;
        for(let i = map.length - 1; i >= 0; i--){
            if((i === map.length -1 && j === 0)|| biggestTree < map[i][j]){
                biggestTree = map[i][j];
                result[i.toString() + j.toString()] = map[i][j];
            }
        }
    }    
}
/*
30373
25512
65332
33549
35390
*/