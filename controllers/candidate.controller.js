const Candidate = require('../models/Candidate');
const User = require('../models/User');
const Poll = require('../models/Poll');
const { validateCandidate } = require("../validation/validations.schema");

exports.createCandidate = async (req, res) => {
  try {
    //validate req.body
    const { error } = validateCandidate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const pollToRunIn = await Poll.findById(req.body.pollId);
    if (!pollToRunIn)
      return res.status(400).send({ message: "Poll does not exist" });

    const newCandidate = new Candidate(req.body);
    await newCandidate.save();

    await Poll.findOneAndUpdate(
      { _id: req.body.pollId },
      { $push: { candidates: { $each: [newCandidate.id] } } }
    );

    pollToRunIn.candidates.push(newCandidate.id);

    return res
      .status(201)
      .send({ message: "Candidate created!", data: newCandidate });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.getCandidatesByPoll = async (req, res) => {
  try {
    const candidates = await Candidate.find({
      pollId: req.params.pollId,
    }).populate("poll");
    return res
      .status(200)
      .send({ message: "Candidates retrieved!", data: candidates });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
