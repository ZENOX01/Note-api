# 📔 GlassNote - Premium Full-Stack Notes App

A modern, secure, and visually stunning **Full-Stack** application built with **Node.js, Express, and MongoDB**. Features a premium **Glassmorphic** frontend and robust security patterns.

---

## 🎨 Design Philosophy
This project uses **Glassmorphism**, a modern design trend characterized by:
- Frosted-glass effects (Background Blur)
- Multi-layered aesthetics
- Vivid colors and sleek borders
- Responsive layouts for all devices

## 🚀 Features
- **Full-Stack Integration**: Express server now serves the entire Frontend.
- **Full Auth Lifecycle**: Secure User Registration and Login using JWT.
- **Persistent Sessions**: Stay logged in with local storage token management.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Smart Search**: Real-time filtering of your notes by title or content.
- **Pagination**: Browse through large sets of notes effortlessly.
- **Rate Limiting**: Protected against brute-force attacks (15 attempts/hour for auth).
- **User Scoping**: Every user sees ONLY their own notes.

## 🛠️ Tech Stack
| Layer | Technologies |
|---|-|
| **Backend** | Node.js, Express.js (v5+) |
| **Database** | MongoDB Atlas, Mongoose |
| **Auth** | JSON Web Tokens (JWT), BcryptJS |
| **Security** | Express-Rate-Limit, Dotenv, CORS |
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 (Glassmorphism) |

## 🏗️ What I Learned
During this project, I mastered several core software engineering principles:
1. **MVC Architecture**: Organizing code into Models, Views, and Controllers.
2. **Full-Stack Serving**: Configuring Express to serve static frontend files and handle routing fallbacks.
3. **Security First**: Implementing rate limiting, hashing passwords, and using Environment Variables (`.env`) to hide secrets.
4. **Cloud Deployment**: Deploying a live application to **Render** and configuring cloud databases.
5. **JWT Flow**: Managing secure authentication tokens between the browser and the server.

## ⚙️ Installation & Setup
1. **Clone the repo**:
   ```bash
   git clone https://github.com/ZENOX01/Note-api.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup environment variables**:
   Create a `.env` file and add:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_cluster_uri
   ```
4. **Start the server**:
   ```bash
   npm start
   ```

## ☁️ Deployment (Render)
To deploy this project successfully to the cloud:
1. **Environment Variables**: Add `MONGODB_URI`, `JWT_SECRET`, and `PORT` (set to `10000`) in the Render Dashboard.
2. **MongoDB Whitelist**: Set Network Access to `0.0.0.0/0` in MongoDB Atlas to allow Render to connect.
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`

---
*Created with ❤️ By Zeno as a learning milestone in Full-Stack Development.*
