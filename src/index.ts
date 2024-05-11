import express, { Request, Response } from 'express';
import mongoose, { Document, Schema, Model } from 'mongoose';
import Redis from 'ioredis';
import mqtt from 'mqtt';

const app = express();
const PORT = 3000;

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

  let todoList: string[] = [];

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
