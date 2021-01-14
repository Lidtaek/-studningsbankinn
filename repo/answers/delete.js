function makeDeleteAnswers (db) {
  return (answer) => {
    const params = [
      answer.placeId
    ]

    const sql = `
      DELETE FROM
        answers
      WHERE
        placeid = $1`

    return db
      .query(sql, params)
      .then(res => res.rowCount)
  }
}

module.exports = makeDeleteAnswers
