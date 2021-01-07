function makeDeleteAnswers (db) {
  return (answer) => {
    const params = [
      answer.id
    ]

    const sql = `
      DELETE FROM
        answers
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeDeleteAnswers
