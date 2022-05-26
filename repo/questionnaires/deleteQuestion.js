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
      .then(res => {
        if (res.rows.length === 0) {
          return undefined
        }
        
        return  {          
          questionId: res.rows[0].questionid
        }        
      })        
  }
}

module.exports = makeDeleteQuestionFromQuestionnaire
