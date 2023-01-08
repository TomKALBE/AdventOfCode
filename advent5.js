const fs = require('fs');

fs.readFile('./input5.txt', 'utf-8', function(err, data) {
    if (err) throw err;

    const regex = /\d/;
    let stackDeclaration = true;
    const map = {}
    let map2 = {}
    for (const line of data.split('\n')) {
        if(stackDeclaration){
            if(!line.match(regex)){
                for(let i = 1; i < line.length; i+=4){
                    if(map[Math.floor(i/4) + 1]){
                        if(line[i] != " "){
                            map[Math.floor(i/4) + 1].push(line[i])

                        }
                    }
                    else{
                        if(line[i] != " "){
                            map[Math.floor(i/4) + 1] = new Array()
                            map[Math.floor(i/4) + 1].push(line[i])
                        }
                    }
                }
            }else{
                stackDeclaration = false;
                reverseMap(map)
                map2 = JSON.parse(JSON.stringify(map))
            }
        }
        else{
            if(line){
                const regex = /\b\d+\b/g;
                const [numberToMove, firstStack, secondStack] = line.match(regex);
                /* First Rearrangement */
                for(let i = 0; i < numberToMove; i++){
                    map[secondStack].push(map[firstStack].slice(-1)[0])
                    map[firstStack].pop()
                }
                /* Second Rearrangement */
                for(let i = numberToMove; i > 0; i--){
                    map2[secondStack].push(map2[firstStack].slice(-i)[0])
                }
                for(let i = 0; i < numberToMove ; i++){
                    map2[firstStack].pop()
                }
            }
        }
        
    }

    console.log("question 1 :",response(map), "question 2 :",response(map2))
})
const reverseMap = (map) => {
    for(const key in map)
        key && map[key].reverse()
}
const response = (map) => {
    let result = "";
    for(const key in map){
        result += map[key].slice(-1)[0]
    }
    return result
}