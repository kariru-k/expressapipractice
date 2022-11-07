const express = require('express')
const { addToDatabase, getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db')
const minionsRouter = express.Router({ mergeParams: true })



//Id parameter for minions
minionsRouter.param('minionid', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id)
    if (minion) {
        req.minion = minion
        next()
    } else {
        res.status(404).send('Not found')
    }
})

//Gets an array of all the minions
minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    if (minions) {
        res.send(minions)
    } else {
        res.status(404).send('No minions')
    }
})

//Create a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)
})

//Gets the minion by id
minionsRouter.get('/:minionid', (req, res, next) => {
    res.send(req.minion)
})

//Updates the minion by id
minionsRouter.put('/:minionid', (req, res, next) => {
    let updatedminion = updateInstanceInDatabase('minions', req.body)
    res.send(updatedminion)
})

//deletes minion by id
minionsRouter.delete('/:minionid', (req, res, next) => {
    let deletedMinion = deleteFromDatabasebyId('minions', req.params.minionid)
    if (deletedMinion) {
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})


module.exports = minionsRouter