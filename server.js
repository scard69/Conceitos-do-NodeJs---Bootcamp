const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  // find verifica o Elemento e Indice do elemento
  //  para comparar com o valor passado sendo:
  const project = projects.find(projeto => projeto.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not Exists' });
  }

  return next();
}

server.post('/projects', (req, res) => {
  const {id, title} = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(projeto => projeto.id == id);
  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const project = projects.find(projeto => projeto.id == id);
  projects.splice(project, 1);
  return res.send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(projeto => projeto.id == id);
  project.tasks.push(title);      
  return res.json(projects);
});


server.listen(3000);