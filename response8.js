/**
 * https://adventofcode.com/2022/day/8
 *
 * Solution starts at #L112
 * - https://gitlab.com/fabianolothor/advent-of-code-solutions/-/blob/main/2022/day8.js#L112
 *
 * Live coding available on YouTube
 * - Part 1: https://youtu.be/2VZJW0QOMf8
 * - Part 2: https://youtu.be/Qt_3HBSadnA
 */

const input = `123123123
145675421
345789743
245545445
112331212`;

// Global Variables

let trees = [];

// Check if a tree is visible

function isVisibleTree(currentHeight, currentLineIndex, currentColumnIndex, lines, columns) {
  let isVisibleTop = true;
  let isVisibleLeft = true;
  let isVisibleRight = true;
  let isVisibleBottom = true;

  for (let topIndex = 0; topIndex < currentLineIndex; ++topIndex) {
    if (parseInt(lines[topIndex][currentColumnIndex]) >= currentHeight) {
      isVisibleTop = false;
      break;
    }
  }
  
  for (let leftIndex = 0; leftIndex < currentColumnIndex; ++leftIndex) {
    if (parseInt(lines[currentLineIndex][leftIndex]) >= currentHeight) {
      isVisibleLeft = false;
      break;
    }
  }

  for (let rightIndex = columns.length - 1; rightIndex > currentColumnIndex; --rightIndex) {
    if (parseInt(lines[currentLineIndex][rightIndex]) >= currentHeight) {
      isVisibleRight = false;
      break;
    }
  }

  for (let bottomIndex = lines.length - 1; bottomIndex > currentLineIndex; --bottomIndex) {
    if (parseInt(lines[bottomIndex][currentColumnIndex]) >= currentHeight) {
      isVisibleBottom = false;
      break;
    }
  }

  return isVisibleTop || isVisibleLeft || isVisibleRight || isVisibleBottom;
}

// Calc the viewing score of tree

function calcTreeScore(currentHeight, currentLineIndex, currentColumnIndex, lines, columns) {
  let topScore = 0;
  let leftScore = 0;
  let rightScore = 0;
  let bottomScore = 0;

  for (let topIndex = currentLineIndex - 1; topIndex > -1; --topIndex) {
    ++topScore;
    
    if (parseInt(lines[topIndex][currentColumnIndex]) >= currentHeight) {
      break;
    }
  }
  
  for (let leftIndex = currentColumnIndex - 1; leftIndex > -1; --leftIndex) {
    ++leftScore;
    
    if (parseInt(lines[currentLineIndex][leftIndex]) >= currentHeight) {
      break;
    }
  }

  for (let rightIndex = currentColumnIndex + 1; rightIndex < columns.length; ++rightIndex) {
    ++rightScore;

    if (parseInt(lines[currentLineIndex][rightIndex]) >= currentHeight) {
      break;
    }
  }

  for (let bottomIndex = currentLineIndex + 1; bottomIndex < lines.length; ++bottomIndex) {
    ++bottomScore;

    if (parseInt(lines[bottomIndex][currentColumnIndex]) >= currentHeight) {
      break;
    }
  }

  return topScore * leftScore * rightScore * bottomScore;
}

// Normalize Data

input
  .split('\n')
  .forEach((line, lineIndex, lines) => {
    line
      .split('')
      .forEach((column, columnIndex, columns) => {
        let isVisible = true;
        let treeScore = 0;
        let height = parseInt(column);
        let isEdge = (
          !lineIndex || lineIndex === lines.length - 1 ||
          !columnIndex || columnIndex === columns.length - 1
        );

        if (!isEdge) {
          isVisible = isVisibleTree(height, lineIndex, columnIndex, lines, columns);
          treeScore = calcTreeScore(height, lineIndex, columnIndex, lines, columns);
        }

        let tree = {
          isEdge: isEdge,
          isVisible: isEdge || isVisible,
          height: height,
          score: treeScore,
        }

        trees.push(tree);
      });
  });

// Get Answer 1

let answer1 = trees.filter(tree => tree.isVisible).length;

// Get Answer 2

let answer2 = Math.max(...trees.map(tree => tree.score));

// Output Answers

console.log(answer1, answer2);
