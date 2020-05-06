const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function FindIndex(id){
  const repositoryIndex = repositories.findIndex( repository => repository.id === id);
  return repositoryIndex;
}

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const likes = 0;
  const { title, url, techs} = request.body;
  const repository = { id: uuid(), title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;
  
  const repositoryIndex = FindIndex(id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository no found'});
  }

  const likes = repositories[repositoryIndex].likes

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = FindIndex(id);

  repositories.splice(repositoryIndex, 1);

  return response.json(repositories);

});

app.post("/repositories/:id/like", (request, response) => {
   const { id } = request.params;
   
   const repositoryIndex = FindIndex(id);

   repositories[repositoryIndex].likes = ++repositories[repositoryIndex].likes;

   return response.json(repositories[repositoryIndex]);
});

module.exports = app;
