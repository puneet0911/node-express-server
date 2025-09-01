# 🚀 Node Express Server

A modular Node.js server built with Express, featuring:

- 🔐 User authentication (signup/login)
- 📝 CRUD operations for posts
- 💬 Real-time chat and call functionality via Socket.IO
- 🧪 Health check endpoint for monitoring

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   SESSION_SECRET=your_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000` by default.

---

## 📡 API Endpoints

### 👤 User Routes

| Endpoint         | Method | Description       |
|------------------|--------|-------------------|
| `/user/signup`   | POST   | Register a new user |
| `/user/login`    | POST   | Authenticate user |
| `/user/all`      | GET    | Retrieve all users |

**Example: Sign Up**
```json
POST /user/signup
{
  "email": "test@example.com",
  "password": "yourpassword"
}
```

---

### 📝 Post Routes

| Endpoint               | Method | Description         |
|------------------------|--------|---------------------|
| `/post/add`            | POST   | Create a new post   |
| `/post/all`            | GET    | Get all posts       |
| `/post/update/:postId` | PUT    | Update a post       |

**Example: Update Post**
```json
PUT /post/update/123
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

---

### 🩺 Health Check

| Endpoint     | Method | Description         |
|--------------|--------|---------------------|
| `/health`    | GET    | Check server status |

---

## 🔴 Real-Time Chat/Call (Socket.IO)

**Join a room**
```js
socket.emit('joinRoom', 'room1');
```

**Send a message**
```js
socket.emit('chatMessage', {
  room: 'room1',
  user: 'Alice',
  message: 'Hello!',
});
```

**Listen for messages**
```js
socket.on('message', (data) => {
  console.log(data);
});
```

---

## 🤝 Contribution Guidelines

1. Fork the repository and create your branch from `main`.
2. Write clear, descriptive commit messages.
3. Add tests for new features or bug fixes.
4. Ensure consistent code style using ESLint and Prettier.
5. Open a pull request with a summary of your changes.

---

## 💡 Feedback & Support

Feel free to open issues, suggest improvements, or contribute new features. We welcome collaboration!
