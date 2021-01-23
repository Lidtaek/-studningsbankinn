const makeSelectVotes = require('../repo/votes/select')
const makeUpdateVotes = require('../repo/votes/update')
const makeInsertVotes = require('../repo/votes/insert')
const makeCreateVote = require('../lib/vote')
const makeVotesRouter = require('../routes/votes')

function makeVotesComposition (db) {
  const selectVotes = makeSelectVotes(db)
  const insertVotes = makeInsertVotes(db)
  const updateVotes = makeUpdateVotes(db)

  const createVote = makeCreateVote(selectVotes, insertVotes, updateVotes)

  return makeVotesRouter(selectVotes, createVote)
}

module.exports = makeVotesComposition
