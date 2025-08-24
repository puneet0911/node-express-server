# Node Express Server

This project demonstrates a Node.js server built with Express, featuring user authentication, CRUD operations for posts, and real-time chat/call functionality using Socket.IO.

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add:
     ```
     PORT=3000
     SESSION_SECRET=your_secret
     MONGODB_URI=your_mongodb_connection_string
     ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

---

## API Examples

### User Routes

- **Sign Up**

  ```
  POST /user/signup
  {
    "email": "test@example.com",
    "password": "yourpassword"
  }
  ```

- **Login**

  ```
  POST /user/login
  {
    "email": "test@example.com",
    "password": "yourpassword"
  }
  ```

- **Get All Users**
  ```
  GET /user/all
  ```

### Post Routes

- **Create Post**

  ```
  POST /post/add
  {
    "title": "My Post",
    "content": "Post content here"
  }
  ```

- **Get All Posts**

  ```
  GET /post/all
  ```

- **Update Post**
  ```
  PUT /post/update/:postId
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```

### Health Check

- **Check server health**
  ```
  GET /health
  ```

---

## Real-Time Chat/Call (Socket.IO)

- **Join a room:**
  ```js
  socket.emit('joinRoom', 'room1');
  ```
- **Send a message:**
  ```js
  socket.emit('chatMessage', {
    room: 'room1',
    user: 'Alice',
    message: 'Hello!',
  });
  ```
- **Listen for messages:**
  ```js
  socket.on('message', (data) => {
    console.log(data);
  });
  ```

---

## Contribution Guidelines

1. **Fork the repository** and create your branch from `main`.
2. **Write clear, concise commit messages.**
3. **Add tests** for new features or bug fixes.
4. **Ensure code style** with ESLint and Prettier.
5. **Open a pull request** with a description of your changes.

---

**Feel free to open issues or suggest improvements.**
