function makeUpdateStatementQuestions (db) {
  return (statementQuestion) => {
    const params = [
      statementQuestion.statementId,
      statementQuestion.questionId,
      statementQuestion.weight,
      statementQuestion.id
    ]

    console.log(statementQuestion)
    const sql = `
      UPDATE statementquestions
      SET
        statementid = $1,
        questionid = $2,
        weight = $3
      WHERE
        id = $4
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeUpdateStatementQuestions
