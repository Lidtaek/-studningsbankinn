function makeInsertQuestions (db) {
  return (question) => {
    const params = [
      question.question,
      question.categoryId
    ]

    const sql = `
      INSERT INTO questions(
        question
        categoryid
      )
      VALUES (
        $1, $2
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertQuestions
