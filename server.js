// server.js
const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'


// Index
app.get('/api/v1/foods', function(request, response) {
  // response.send('It\'s a secret to everyone.')
  response.json([
    {
      id: 1,
      name: 'Chocolate'
    },
    {
      id: 2,
      name: 'Chips & Salsa'
    }
  ]);
});

// Create
app.post('/api/v1/foods', function(request, response) {
  // response.status(201).end();
});

// Show
app.get('/api/v1/foods/:id', function(request, response) {
  response.json({
    id: request.params.id
  });;
});

// Edit
app.put('/api/v1/foods/:id', function(request, response) {
  // response.send('It\'s a secret to everyone.')
});

// Delete
app.delete('/api/v1/foods/:id', function(request, response) {
  // response.send('It\'s a secret to everyone.')
});

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });;
}

module.exports = app