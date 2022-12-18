function makeInsertStatementQuestions(db) {
  return (statementQuestion) => {
    const params = [
      statementQuestion.statementId,
      statementQuestion.questionId,
      statementQuestion.weight
    ]

    console.log(statementQuestion)

    if (params.length === 0) {
      return Promise.resolve()
    }

    const sql = `
      INSERT INTO statementquestions(
        statementid,
        questionid,
        weight
      )
      VALUES (
        $1,
        $2,
        $3
      )
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeInsertStatementQuestions
