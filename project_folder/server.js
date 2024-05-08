const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sata1002',
    password: 'AdvEnt4pgSQL',
    port: 5432,
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// CRUD operations

// Render the home page
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.render('index', { items: rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal server error');
  }
});

// POST a new record
app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    await pool.query('INSERT INTO items (name, description) VALUES ($1, $2)', [name, description]);
    res.redirect('/');
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal server error');
  }
});

// PUT/update an existing record by ID
// Assuming you have a route for handling the edit page
app.get('/items/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the item data based on the provided ID from the database
    const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);

    // Check if the item with the specified ID exists
    if (result.rowCount === 1) {
      // Render the edit page with the item data
      res.render('edit', { item: result.rows[0] });
    } else {
      // If the item is not found, send a 404 error response
      res.status(404).send('Item not found');
    }
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error('Error fetching item for edit:', error);
    res.status(500).send('Internal server error');
  }
});
// Handle the form submission for editing an existing item
app.post('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
      await pool.query('UPDATE items SET name = $1, description = $2 WHERE id = $3', [name, description, id]);
      res.redirect('/');
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal server error');
  }
});


// DELETE a record by ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.redirect('/');
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
