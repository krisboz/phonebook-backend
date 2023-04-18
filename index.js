const express = require("express");
const app = express();

app.use(express.json());

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/people", (request, response) => {
  response.json(people);
});

app.get("/info", (request, response) => {
  const time = new Date();
  response.setHeader("Content-Type", "text/html");
  response.send(`<p>The phonebook has info on ${people.length} people</p>
    <p>${time} </p>`);
});

app.get("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.filter((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);

  response.status(404).end();
});

app.post("/api/people", (request, response) => {
  const id = Math.floor(Math.random() * 100000);
  const body = request.body;

  if (!body.name) {
    response.status(400).json({
      error: "Unspecified name",
    });
  }
  if (!body.number) {
    response.status(400).json({
      error: "Unspecified number",
    });
  }
  if (!body.name && !body.number) {
    response.status(400).json({
      error: "Unspecified person",
    });
  }

  const person = {
    id,
    name: body.name,
    number: body.number,
  };

  if (people.map((person) => person.name).includes(person.name)) {
    return response.status(400).json({
      error: "Name already exists",
    });
  }

  people.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
