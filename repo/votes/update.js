function makeUpdateVotes (db) {
  return (vote) => {
    const params = [
      vote.vote,
      vote.id
    ]

    const sql = `
      UPDATE votes
      SET
        vote = $1       
      WHERE
        id = $2
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateVotes
