/*
What types of objects do you need?

List out nouns and verbs involved in creating TODO lists.
Decide which nouns and verbs you want/need to model.
The nouns will be your objects and the values the functions.

Write simple functions that work on a few number of well-defined objects.

Keep the responsibilities separated as best you can:

1. Representing a real-life todo list as in-memory objects
2. Manipulating those in-memory objects
3. Reading and writing from the todos.txt file
4. Displaying information to the user
5. Rather user input and taking the appropriate actions
*/
let process = require('process');
let command = process.argv[2];
let secondCommand = process.argv[3];
// takes the third argument because the first two are the node and the location of the file
let fs = require('fs');

// file system, reads files

function openAndRead(filename) {
  let text = fs.readFileSync(filename, 'utf-8');
  text = text.split('\n');
  console.log('Here is your list!');
  for (let i = 0; i < text.length - 1; i += 1) {
    console.log(` ${i + 1}. ${text[i]} `);
    // prints out the literal string, you put the data within the ${} when it is a variable and not a string
  }
}

function writingList() { // no parameter because command is on the command line
  if (command === 'list') {
    openAndRead('todos.txt');
    // takes the information from the other function, any variables from there, edit that function
  }
}

function addToList() {
  let addition = (`${secondCommand} \n`);
  // includes an entire string in the 3rd index
  if (command === 'add') {
    console.log(`Appending '${secondCommand}' to your TODO list`);
    console.log();
    fs.appendFileSync('todos.txt', addition);
    // first parameter is the text file you add it to, next is what you're adding
    // use appendFileSync to write into a new file but APPEND to it rather than create an entirely new file
    // writeFileSync can completely create a new text file
    console.log('Your list is newly updated.');
    console.log(openAndRead('todos.txt'));
  }
}

function deleteFromList() {
  if (command === 'delete') {
    console.log(`Deleting '${secondCommand}' from your TODO list`);
    fs.writeFileSync('todos.txt', 'todos.txt'[-1], secondCommand);
    console.log('here is your new list');
    console.log(openAndRead('todos.txt'));
  }
}
writingList();
addToList();
deleteFromList();
