const candidate = {
  names: "Names",
  nationalId: "1234567890123456",
  votes: 1,
  gender: "Male",
  pollId: "Poll id",
  mission: "Mission statement",
  party: "Political party if any",
  profilePicture: "profile picture URL",
};

const getCandidatesByPoll = {
  tags: ["candidates"],
  description: "List of all candidates in a certain poll",
  parameters: [
    {
      in: "path",
      name: "pollId",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              data: {
                type: "array",
                items: "#/components/schemas/Candidate",
              },
            },
            example: {
              message: "Returned message",
              data: [candidate],
            },
          },
        },
      },
    },
  },
};

const createCandidate = {
  tags: ["candidates"],
  description: "create a new candidate",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "the user id of this candidate",
              example: "sample user id",
            },
            pollId: {
              type: "string",
              description: "the poll id this candidate is in",
              example: "sample poll id",
            },
            bio: {
              type: "string",
              description: "the full biography of this candidate",
              example: "sample biography of a candidate",
            },
            goals: {
              type: "string",
              description: "the goal, mission of this candidate",
              example: "achieving greatness with the people",
            },
            party: {
              type: "string",
              description: "the party from which this candidate comes from",
              example: "the party of this candidate",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Created poll",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              data: "#/components/schemas/Candidate",
            },
            example: {
              message: "Returned message",
              data: candidate,
            },
          },
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
  },
};

const candidateRouteDoc = {
  "/api/v1/candidates": {
    post: createCandidate,
  },
  "/api/v1/candidates/{pollId}": {
    get: getCandidatesByPoll,
  },
};

module.exports = candidateRouteDoc;
