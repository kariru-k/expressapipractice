const express = require('express');
const { getAllFromDatabase, addToDatabase, createMeeting, deleteFromDatabasebyId, deleteAllFromDatabase } = require('./db');
const meetingRouter = express.Router({ mergeParams: true });


//Get all meetings from database
meetingRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

//Post meetings to the database
meetingRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(newMeeting)
})

meetingRouter.delete('/', (req, res, next) => {
    const deletedMeeting = deleteAllFromDatabase('meetings')
    if (deletedMeeting) {
        res.status(204).send()
    }
})


module.exports = meetingRouter