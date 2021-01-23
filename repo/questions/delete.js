function makeDeleteQuestions (db) {
  return (question) => {
    const params = [
      question.id
    ]

    const sql = `
      DELETE FROM
        questions
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeDeleteQuestions
