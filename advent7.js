const fs = require('fs');

class Node {
    name = "";
    parent = null;

    isDirectory = true;
    size = 0;
    children = [];
}

const solve = () => {
    const rootNode = new Node();
    rootNode.name = "/";

    let currentPosition = rootNode;

    fs.readFile('./input7.txt', 'utf-8', function(err, data) {
        if (err) throw err;
    
        for (const line of data.split('\n')) {
            if(line.charAt(0) === "$"){
                currentPosition = processCommand(line, currentPosition, rootNode)
            }else{
                processFile(line, currentPosition)
            }

        }
        updateSizeOfDirectory(rootNode)
        // console.log(rootNode)
        const result = findResult(rootNode, 100000, 0)
        console.log(rootNode)
    })
}
const findResult = (node, max, total) => {
    if(!node.isDirectory) return total;

    for(let child of Object.values(node.children)){
        total = findResult(child, 100000, total)
    }
    if(node.size <= max){
        return total + node.size;
    }
    return total;
}
const updateSizeOfDirectory = (node) => {
    // console.log("coucou", node)
    if(!node.isDirectory){ 
        // console.log(node.name, node.size, node.parent.name)
        return node.size
    };
    
    let size = 0;
    // console.log(size, node.name)
    // console.log(Object.values(node.children)[0])
    for(let child of Object.values(node.children)){
        // console.log(Object.values(node.children))
        size += updateSizeOfDirectory(child)
    }
    node.size = size;
    // console.log(size, node.name)
    return size;
}
const processFile = (line, currentPosition) => {
    const splitResult = line.split(' ')
    const newNode = new Node();
    newNode.name = splitResult[1];
    newNode.parent = currentPosition;
    currentPosition.children[splitResult[1]] = newNode;

    if(splitResult[0] === "dir"){
        newNode.isDirectory = true;
    }else{
        newNode.isDirectory = false;
        newNode.size = parseInt(splitResult[0]);
    }
    // console.log(currentPosition.name)
}
const processCommand = (line, currentPosition, rootNode) => {
    let newPosition = currentPosition;
    const [_, command, argument] = line.split(' ')
    if(command === "cd"){
        if(argument === ".."){
            newPosition = currentPosition.parent;
        }
        else if(argument === "/"){
            newPosition = rootNode;
        }
        else{
            if (currentPosition.children[argument]) {
                newPosition = currentPosition.children[argument];
            }

        }
    }
    return newPosition
}
solve()