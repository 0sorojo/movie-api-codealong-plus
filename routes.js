"use strict";

const express = require("express");
const routes = express.Router();

const movies = [
  {
    id: 1,
    title: "thisString1",
    year: 2001,
    animated: true,
  },
  {
    id: 2,
    title: "thisString2",
    year: 2002,
    animated: true,
  },
  {
    id: 3,
    title: "thisString3",
    year: 2003,
    animated: false,
  },
  {
    id: 4,
    title: "thisString4",
    year: 2004,
    animated: true,
  },
];

let nextId = 5;

// Get/movies - respond with a JSON array of movies

routes.get("/movies", (req, res) => {
  const minYear = Number(req.query.minYear);

  if (minYear) {
    const filteredMovies = movies.filter((movie) => movie.year >= minYear);
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

// set the status return before the json
routes.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`Movie ID: ${id} is not a Movie in the Database`);
  }
});

routes.post("/movies", (req, res) => {
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

// put goes here
routes.put("/movies/:id", (req, res) => {
  const movie = req.body;
  const id = Number(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies[index] = movie;
    movie.id = id;
    res.status(200);
    res.json(movie);
  } else {
    res.status(404);
    res.send(`the movie ${id} is not in our database`);
  }
});

// always need to send something
routes.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});

// export routes for use in server.js
module.exports = routes;
