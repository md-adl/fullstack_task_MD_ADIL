"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// MongoDB connection string
const mongoUri = 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/assignment';
// Connect to MongoDB
mongoose_1.default.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
// Define a simple Mongoose model
const assignmentSchema = new mongoose_1.default.Schema({
    key: { type: String, required: true },
});
const Assignment = mongoose_1.default.model('Assignment', assignmentSchema);
// POST endpoint to add data
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.body;
        if (!key) {
            return res.status(400).json({ error: 'Key is required' });
        }
        const newAssignment = new Assignment({ key });
        yield newAssignment.save();
        res.status(201).json(newAssignment);
    }
    catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// GET endpoint to fetch all assignments
app.get('/fetch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignments = yield Assignment.find();
        res.json(assignments);
    }
    catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
