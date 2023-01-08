const fs = require('fs');


fs.readFile('./input3.txt', 'utf-8', function(err, data) {
    if (err) throw err;
    let total = 0;
    for (const line of data.split('\n')) {
        total += findPrioritySum(line); // Outputs 1

        // console.log(findPrioritySum(line),total)
    }
    // console.log(total);   
})

function findPrioritySum(contents) {
    // Initialize counts for both compartments
    let compartment1 = {};
    let compartment2 = {};
  
    // Iterate through characters in the string
    for (let i = 0; i < contents.length; i++) {
      let char = contents[i];
  
      // Increment count for the character in the appropriate compartment
      if (i < contents.length / 2) {
        compartment1[char] = compartment1[char] + 1 || 1;
      } else {
        compartment2[char] = compartment2[char] + 1 || 1;
      }
    }
  
    // Initialize sum to 0
    let sum = 0;
  
    // Iterate through characters in the string
    for (let i = 0; i < contents.length; i++) {
      let char = contents[i];
  
      // If the character appears in both compartments, add its priority to the sum
      if (compartment1[char] > 0 && compartment2[char] > 0) {
        sum += getPriority(char);
        compartment1[char]--;
        compartment2[char]--;
      }
    }
  
    return sum;
  }
  
  // Returns the priority of a given character
  function getPriority(char) {
    if (char >= 'a' && char <= 'z') {
      return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else if (char >= 'A' && char <= 'Z') {
      return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    } else {
      // If the character is not a letter, return 0
      return 0;
    }
  }
  let contents = "vJrwpWtwJgWrhcsFMMfFFhFp";
console.log(findPrioritySum(contents)); // Outputs 16
contents = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";
console.log(findPrioritySum("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")); // Outputs 38
contents = "PmmdzqPrVvPwwTWBwg";
console.log(findPrioritySum(contents)); // Outputs 42
contents = "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn";
  
  // Sum of priorities is 157
  
