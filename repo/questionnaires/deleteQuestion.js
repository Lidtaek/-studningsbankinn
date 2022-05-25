function makeDeleteQuestionFromQuestionnaire (db) {
  return (question) => {
    const params = [
      question.id
    ]

    const sql = `
      DELETE FROM
        questionnaires
      WHERE
        questionid = $1
      RETURNING
        questionid`

    return db
      .query(sql, params)
      .then(res => ({ questionId: res.rows[0].questionid }))
  }
}

module.exports = makeDeleteQuestionFromQuestionnaire
