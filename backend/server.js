/* 
 * server.js
 * 
 * Express server that connects to Supabase database to handle API endpoints.
 * 
 * Tables and Columns in Supabase:
 * - `tasks`: id, family_id, name, description, status
 * - `families`: id, surname
 * - `suggestedtasks`: id, name, description, status, estimated_cost
 * - `users`: id, family_id, name, role
 */

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Loaded Successfully' : 'Not Loaded');

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    console.log('Request Params:', req.params);
    next();
});

// Fetch tasks for a specific family
app.get('/tasks/:familyId', async (req, res) => {
    const { familyId } = req.params;
    console.log(`Fetching tasks for family ID: ${familyId}`);

    try {
        const { data, error } = await supabase
            .from('tasks') // Use lowercase 'tasks'
            .select('*')
            .eq('family_id', familyId);

        if (error) {
            console.error(`Supabase Error: Failed to fetch tasks for family ID ${familyId}. ${error.message}`);
            return res.status(500).json({ error: `Failed to fetch tasks. ${error.message}` });
        }

        console.log(`Successfully fetched tasks for family ID ${familyId}:`, data);
        res.status(200).json(data);
    } catch (err) {
        console.error(`Server Error: Failed to fetch tasks for family ID ${familyId}. ${err.message}`);
        res.status(500).json({ error: `Server error occurred while fetching tasks. ${err.message}` });
    }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    try {
        const { family_id, name, description, status } = req.body;
        console.log(`Adding new task:`, req.body);

        // Validate required fields
        if (!family_id || !name || !status) {
            console.warn(`Validation Error: Missing required fields (family_id: ${family_id}, name: ${name}, status: ${status})`);
            return res.status(400).json({ error: 'family_id, name, and status are required fields' });
        }

        const { data, error } = await supabase
            .from('tasks') 
            .insert([{ family_id, name, description, status }]);

        console.log("Supabase Insert Response:", data, error); // Log both `data` and `error` for clarity

        if (error) {
            console.error(`Supabase Error: Failed to insert task. Error details:`, error);
            return res.status(500).json({ error: `Failed to add task. ${error.message}` });
        }

        console.log(`Task added successfully:`, data);
        res.status(201).json({ message: 'Task created successfully', data });
    } catch (err) {
        console.error(`Server Error: Failed to add task. ${err.message}`);
        res.status(500).json({ error: `Server error occurred while adding task. ${err.message}` });
    }
});

// Update a task's status
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`Updating task ID ${id} with new status: ${status}`);

    try {
        if (!status) {
            console.warn(`Validation Error: Status field is required (received status: ${status})`);
            return res.status(400).json({ error: 'Status field is required' });
        }

        const { data, error } = await supabase
            .from('tasks') 
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error(`Supabase Error: Failed to update task ID ${id}. ${error.message}`);
            return res.status(500).json({ error: `Failed to update task. ${error.message}` });
        }

        console.log(`Task ID ${id} updated successfully:`, data);
        res.status(200).json({ message: `Task ID ${id} updated successfully`, data });
    } catch (err) {
        console.error(`Server Error: Failed to update task ID ${id}. ${err.message}`);
        res.status(500).json({ error: `Server error occurred while updating task. ${err.message}` });
    }
});

// Fetch all suggested tasks
app.get('/suggested-tasks', async (req, res) => {
    console.log(`Fetching suggested tasks...`);

    try {
        const { data, error } = await supabase
            .from('suggestedtasks') 
            .select('*');

        if (error) {
            console.error(`Supabase Error: Failed to fetch suggested tasks. ${error.message}`);
            return res.status(500).json({ error: `Failed to fetch suggested tasks. ${error.message}` });
        }

        console.log(`Successfully fetched suggested tasks:`, data);
        res.status(200).json(data);
    } catch (err) {
        console.error(`Server Error: Failed to fetch suggested tasks. ${err.message}`);
        res.status(500).json({ error: `Server error occurred while fetching suggested tasks. ${err.message}` });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

