const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const ideasRouter = express.Router({ mergeParams: true });


//id parameter
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id)
    if (idea) {
        req.idea = idea
        next()
    } else {
        res.status(404).send()
    }
})


//Get all ideas from database
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})

//Get idea from Id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
})

//Post idea to create a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
})

//Update existing idea
ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedIdea)
})

//Delete idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
    let deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId)
    if (deletedIdea) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})


module.exports = ideasRouter