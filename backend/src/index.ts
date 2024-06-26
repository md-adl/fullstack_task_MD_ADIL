import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import mqtt from 'mqtt';
import cors from 'cors'; // Import cors package

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// MongoDB Connection
const mongoUri = 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/assignment';
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: any) => {
    console.error('MongoDB connection error:', err);
  });

// Define MongoDB schema and model
interface TodoItem extends mongoose.Document {
  task: string;
}

const todoItemSchema = new mongoose.Schema<TodoItem>({
  task: { type: String, required: true }
});

const TodoItemModel = mongoose.model<TodoItem>('assignment_Md_Adi', todoItemSchema, 'assignment_adil');

// Redis Connection
const redisClient = new Redis({
  host: 'redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  port: 12675,
  username: 'default',
  password: 'dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB'
});
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
redisClient.on('error', (err: any) => {
  console.error('Redis connection error:', err);
});

// MQTT Connection
const mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe('/add', (err: any) => {
    if (err) {
      console.error('Failed to subscribe to /add:', err);
    }
  });
});

// Subscribe to the MQTT topic for adding items to the to-do list
mqttClient.on('message', async (topic, message) => {
  if (topic === '/add') {
    try {
      const task = message.toString();
      await redisClient.rpush('FULLSTACK_TASK_MD_Adi', task);
      
      const length = await redisClient.llen('FULLSTACK_TASK_MD_Adi');
      // condition to check if length of task greater than 50 delete data from redis and send task to database
      if (length > 50) {
        const tasks = await redisClient.lrange('FULLSTACK_TASK_MD_Adi', 0, -1);
        await redisClient.del('FULLSTACK_TASK_MD_Adi');
        await TodoItemModel.create(tasks.map(task => ({ task })));
      }
    } catch (error) {
      console.error('Error processing MQTT message:', error);
    }
  }
});

app.use(express.json());

// HTTP API to add a task via POST request
app.post('/addTask', async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }

    await TodoItemModel.create({ task });

    mqttClient.publish('/add', task);
    
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// HTTP API to fetch all tasks
app.get('/fetchAllTasks', async (req: Request, res: Response) => {
  try {
    const tasks = await TodoItemModel.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
