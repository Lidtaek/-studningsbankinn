function makeUpdateQuestions (db) {
  return (question) => {
    const params = [
      question.question,
      question.id
    ]

    const sql = `
      UPDATE questions
      SET
        question = $1       
      WHERE
        id = $2
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateQuestions
