function makeDeleteStatementQuestions (db) {
  return (statementQuestion) => {
    const params = [
      statementQuestion.id
    ]

    const sql = `
      DELETE FROM
        statementquestions
      WHERE
        id = $1
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => ({ id: res.rows[0].id }))
  }
}

module.exports = makeDeleteStatementQuestions
