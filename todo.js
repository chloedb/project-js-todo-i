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
let fs = require('fs');
// file system, reads files

function openAndReadFile(filename) {
  let text = fs.readFileSync(filename, 'utf-8');
  text = text.split('\n');
  return text;
}
function printList(text) {
  console.log('Here is your list!');
  for (let i = 0; i < text.length - 1; i += 1) {
    console.log(` [] ${i + 1}. ${text[i]} `);
    // prints out the literal string, you put the data within the ${} when it is a variable and not a string
  }
}

function addToList(filename, addition) {
  console.log(`Appending '${addition}' to your TODO list`);
  console.log();
  fs.appendFileSync(filename, addition);
  fs.appendFileSync(filename, '\n');
  // first parameter is the text file you add it to, next is what you're adding
  // use appendFileSync to write into a new file but APPEND to it rather than create an entirely new file
  // writeFileSync can completely create a new text file
  console.log('Your list is newly updated.');
}

function deleteFromList(text, deleteTask, filename) {
  for (let i = 0; i < text.length + 1; i += 1) {
    if (i === deleteTask) {
      text.splice(i - 1, 1);
    }
  }
  console.log('Congrats for finishing! Your list is updated.');
  console.log(printList(text));
  text = text.join('');
  fs.writeFileSync(filename, text);
}

let command = process.argv[2];
let todoFileName = './todos.txt';

if (command === 'list') {
  printList(openAndReadFile(todoFileName));
  // don't want to mix the code and the print out, so you put the code out here to use that
} else if (command === 'add') {
  let taskDescription = process.argv[3];
  addToList(todoFileName, taskDescription);
  printList(openAndReadFile(todoFileName)); //
} else if (command === 'delete') {
  let taskPosition = Number(process.argv[3]);

  if (Number.isNaN(taskPosition)) {
    console.log('You entered an invalid number.');
    process.exit();
  }

  deleteFromList(openAndReadFile(todoFileName), taskPosition, 'todos.txt');
} else {
  console.log(`Unknown command: '${command}'`);
  process.exit();
}
