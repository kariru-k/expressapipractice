const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions')
const ideasRouter = require('./ideas')
const meetingRouter = require('./meetings')

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingRouter);




module.exports = apiRouter;