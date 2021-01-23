function makeDeleteAnswers (db) {
  return (answer) => {
    const params = [
      answer.placeId
    ]

    const sql = `
      DELETE FROM
        answers
      WHERE
        placeid = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeDeleteAnswers
