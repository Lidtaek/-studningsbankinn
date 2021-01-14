function makeUpdateAnswers (db) {
  return (answer) => {
    const params = [
      answer.questionId,
      answer.placeId,
      answer.answer,
      answer.id
    ]

    const sql = `
      UPDATE answers
      SET
        questionid = $1,
        placeid = $2,
        answer = $3        
      WHERE
        id = $4
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateAnswers
