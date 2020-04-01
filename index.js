const express = require ('express');
const server = express();
server.use(express.json());

const projects = [];

//middleware global 
i = 0;
server.use((req,res,next ) =>{
  i ++;
  console.log(`Requisições feitas: ${i}`);
  return next();
  
});

function checkProjectExists(req,res,next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project){
    return res.status(400).json({error : `Projecto nao existe`});
  }
  return next();
};


//metodo get project
server.get('/projects', (req, res) => {

  return res.json(projects);
});

//metodo post project
server.post('/projects', (req, res) =>{
  const { id,title,tasks } = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

//metodo put project
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//metodo delete project
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);
  
  return res.json(projects);
});

//metodo post que altera projeto pelo id
server.post('/projects/:id/tasks', checkProjectExists, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;
    
  const project = projects.find(p => p.id == id);
  
  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);