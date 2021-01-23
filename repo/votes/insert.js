function makeInsertVotes (db) {
  return (vote, ipAddress) => {
    const params = [
      vote.answerId,
      vote.vote,
      ipAddress
    ]

    const sql = `
      INSERT INTO votes(
        answerid,
        vote,
        ipaddress
      )
      VALUES (
        $1, $2, $3
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertVotes
