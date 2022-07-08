const Candidate = require('../models/Candidate');
const Poll = require('../models/Poll');
const UserPoll = require('../models/UserPoll');

exports.createPoll = async (req, res) => {
  try {
    //create a new poll
    const newPoll = new Poll(req.body);
    await newPoll.save();
    return res.status(201).send({ message: 'Poll created!', data: newPoll });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate('candidates').populate('author');
    return res.status(200).send({ message: 'Polls retrieved!', data: polls });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getPollsByStatus = async (req, res) => {
  try {
    const polls = await Poll.find({ status: req.params.status });
    return res.status(200).send({ message: 'Polls retrieved!', data: polls });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.voteCandidate = async (req, res) => {
  try {
    const userPoll = await UserPoll.findOne({
      userId: req.body.userId,
      pollId: req.body.pollId,
      status: "HAS_VOTED",
    });
    if (userPoll)
      return res.status(400).send({ message: "User has already voted" });

    const isUserinCurrentPoll = await Poll.find({
      _id: req.body.pollId,
      candidates: { $in: [req.body.candidateId] },
    });

    if (isUserinCurrentPoll.length == 0)
      return res
        .status(404)
        .send({ message: "Candidate not found in poll's candidates" });

    const isUserACandidate = await Candidate.findOne({
      userId: req.body.userId,
      pollId: req.body.pollId,
    });
    if (isUserACandidate)
      return res.status(400).send({ message: "Candidate cannot vote" });

    const votedCandidate = await Candidate.findOneAndUpdate({
      userId: req.body.userId,
      $inc: {
        votes: 1,
      },
    });

    const newUserPoll = new UserPoll({ ...req.body, status: "HAS_VOTED" });
    await newUserPoll.save();

    return res
      .status(200)
      .send({ message: 'User voted successfully', data: votedCandidate });
  } catch (error) {
    res.status(400).send(error.message);
  }
};