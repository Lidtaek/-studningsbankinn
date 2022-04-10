function makeCreateVote (selectVote, insertVote, updateVote) {
  return function (options, ipAddress) {
    const searchOptions = {
      answerId: options.answerId,
      ipAddress
    }

    return selectVote(searchOptions).then(list => {
      if (list.length === 0) {
        return insertVote(options)
      }

      const updateOptions = {
        id: list[0].id,
        vote: options.vote
      }

      return updateVote(updateOptions)
    })
  }
}

module.exports = makeCreateVote
