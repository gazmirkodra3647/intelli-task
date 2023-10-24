/*
Filename: sophisticated_code.js

This code demonstrates a sophisticated and elaborate JavaScript program that showcases a web-based chat application with various features like user registration, messaging, and notifications. It uses modern JavaScript techniques like classes, async/await, and event listeners for an interactive user experience.

Please note that this code is simplified and may not include error handling or security measures that a production-ready application would require.

*/

// User class representing a user of the chat application
class User {
  constructor(username, fullName, email) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.isLoggedIn = false;
    this.messages = [];
  }

  async login() {
    // Simulating an asynchronous login process
    console.log(`${this.username} is logging in...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.isLoggedIn = true;
    console.log(`${this.username} logged in successfully!`);
  }

  logout() {
    this.isLoggedIn = false;
    console.log(`${this.username} logged out.`);
  }

  sendMessage(message) {
    if (this.isLoggedIn) {
      console.log(`${this.username} sent a message: "${message}"`);
    } else {
      console.log(`Cannot send message. ${this.username} is not logged in.`);
    }
  }
}

// Chat class representing the chat application
class Chat {
  constructor() {
    this.users = [];
    this.messages = [];
  }

  registerUser(user) {
    this.users.push(user);
    console.log(`${user.username} registered successfully!`);
  }

  displayUserList() {
    console.log('--- Registered Users ---');
    this.users.forEach((user) => console.log(user.fullName));
    console.log('---');
  }

  async start() {
    console.log('Chat application started.');

    // Registering users
    const user1 = new User('user1', 'User One', 'user1@example.com');
    this.registerUser(user1);
    user1.login();

    const user2 = new User('user2', 'User Two', 'user2@example.com');
    this.registerUser(user2);
    user2.login();

    // Sending messages
    user1.sendMessage('Hello, user2!');
    user2.sendMessage('Hi, user1!');

    // Logging out users
    user1.logout();
    user2.logout();

    console.log('Chat application stopped.');
  }
}

// Creating an instance of the Chat class and starting the program
const chat = new Chat();
chat.start();