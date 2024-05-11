# Fullstack Todo List Application

This project implements a basic to-do list application using Node.js, Redis, MongoDB, MQTT, and HTTP protocols. The backend is developed in TypeScript, utilizing Express.js for HTTP API endpoints, Mongoose for MongoDB integration, and ioredis for Redis integration. The project also incorporates MQTT for real-time messaging functionality.

## Backend

## Video link for project : https://drive.google.com/file/d/1VaY7nkmQZMv573I5YabtISAsMzH8f5zd/view?usp=sharing

## Project scrennshort : https://drive.google.com/file/d/1ucQc-JxhcYZ6mC2eY5VJncnwv3w5I7Z_/view?usp=sharing
### Technologies Used:

- Node.js
- TypeScript
- Express.js
- MongoDB
- Redis
- MQTT

### Setup Instructions:

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies using `npm install`.
4. Configure Redis and MongoDB with the provided credentials.
5. Start the backend server using `npm start`.

### API Endpoints:

- `POST /addTask`: Add a new task to the to-do list.
- `GET /fetchAllTasks`: Retrieve all tasks from the to-do list.

## MQTT Integration

The project utilizes MQTT for real-time communication. It subscribes to the `/add` topic, allowing users to add new tasks by sending messages to this topic.

## Redis Integration

Tasks added to the to-do list are stored in a Redis cache with the key `FULLSTACK_TASK_<YOUR_FIRST_NAME>`. If the number of tasks exceeds 50, they are moved to a MongoDB collection, and the cache is flushed.

## Frontend

The frontend is designed using React.js and styled with CSS/SCSS. It provides a user-friendly interface for managing the to-do list.

### Setup Instructions:

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the frontend server using `npm start`.

## Design

The frontend design is created using Figma and implemented with attention to detail. It is responsive and fits well on both tablet and mobile screens.

### Figma Design Link:

[Note App Figma Design](https://www.figma.com/proto/x3I0bqXvZeMQ34gAfLUogk/Note-App?node-id=0%3A3&scaling=scale-down&page-id=0%3A1)

## Contributors

- MD ADIL
Linkedin profile : https://www.linkedin.com/in/md-adl/

Feel free to reach out with any questions or suggestions!

