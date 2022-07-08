const { Router } = require('express');
const candidatesController = require('../../controllers/candidate.controller');
const { verifyToken } = require('../../middlewares/verifytoken');

const router = Router();

router.post('/', verifyToken, candidatesController.createCandidate);
router.get("/:pollId", candidatesController.getCandidatesByPoll);

module.exports = router;
