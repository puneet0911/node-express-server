# Node Express Server

This project demonstrates a Node.js server built with Express. It includes user authentication, CRUD operations for posts, and real-time communication using Socket.IO.

## Features

- **User Authentication**: 
  - Sign up and log in using Passport.js with a local strategy.
  - Passwords are hashed using bcrypt for security.

- **Post Management**:
  - Create, read, update, and delete posts.
  - Posts are associated with users and include likes and comments.

- **Real-Time Communication**:
  - Real-time socket-based communication using Socket.IO.

- **Database**:
  - MongoDB is used as the database, with Mongoose as the ODM.

- **Environment Configuration**:
  - Environment variables are managed using `dotenv`.

## Project Structure