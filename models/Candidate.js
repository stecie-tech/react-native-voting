const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    party: {
      type: String,
    },
    profileUrl: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Candidate', CandidateSchema);
