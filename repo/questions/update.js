function makeUpdateQuestions (db) {
  return (question) => {
    const params = [
      question.question,
      question.categoryId,
      question.id
    ]

    const sql = `
      UPDATE questions
      SET
        question = $1,
        categoryid = $2
      WHERE
        id = $3
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateQuestions
