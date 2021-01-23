function makeCreateVote (selectVote, insertVote, updateVote) {
  return function (options, ipAddress) {
    const searchOptions = {
      answerId: options.answerId,
      ipAddress
    }
    console.log('searchOptions', searchOptions)
    return selectVote(searchOptions).then(list => {
      if (list.length === 0) {
        console.log('insert', options)
        return insertVote(options)
      }

      const updateOptions = {
        id: list[0].id,
        vote: options.vote
      }

      console.log('update', updateOptions)

      return updateVote(updateOptions)
    })
  }
}

module.exports = makeCreateVote
