require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
app.use(express.static("build"));
morgan.token("user-type", function (req, res) {
  console.log({});
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status  :user-type - :response-time ms"));
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Custom unknonw endpoint" });
};

app.use(express.json());
app.use(cors());

//GET ALL
app.get("/api/people", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});
//GET INFO
app.get("/info", (request, response) => {
  const time = new Date();
  response.setHeader("Content-Type", "text/html");
  response.send(`<p>The phonebook has info on ${people.length} people</p>
    <p>${time} </p>`);
});

//POST PERSON
app.post("/api/people", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});
//GET PERSON
app.get("/api/people/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
//DELETE PERSON
app.delete("/api/people/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
