function makeUpdateQuestions (db) {
  return (question) => {
    const params = [
      question.questionId,
      question.placeCategoryId,
      question.id
    ]

    const sql = `
      UPDATE questionnaires
      SET
        questionid = $1
        placecategoryid = $2    
      WHERE
        id = $3
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateQuestions
