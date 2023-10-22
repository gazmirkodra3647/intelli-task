/* 
Filename: complexCode.js
Content: Complex JS code example
*/

// Class representing a Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method to calculate the birth year based on age
  getBirthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }

  // Method to greet the person
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Subclass representing a Programmer, which extends Person class
class Programmer extends Person {
  constructor(name, age, programmingLanguages) {
    super(name, age);
    this.programmingLanguages = programmingLanguages;
  }

  // Method to display the programmer's skills
  displaySkills() {
    console.log(`My name is ${this.name} and I know ${this.programmingLanguages.length} programming languages:`);
    this.programmingLanguages.forEach(lang => console.log(lang));
  }
}

// Creating an instance of Person
const john = new Person("John", 30);
john.greet();
console.log(`John was born in ${john.getBirthYear()}`);

// Creating an instance of Programmer
const mary = new Programmer("Mary", 25, ["JavaScript", "Python", "C++"]);
mary.greet();
console.log(`Mary was born in ${mary.getBirthYear()}`);
mary.displaySkills();

// Asynchronous function to fetch data from an API
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Invoking the asynchronous function
fetchData();