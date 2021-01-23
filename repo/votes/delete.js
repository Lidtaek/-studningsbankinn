function makeDeleteVotes (db) {
  return (vote) => {
    const params = [
      vote.id
    ]

    const sql = `
      DELETE FROM
        votes
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeDeleteVotes
