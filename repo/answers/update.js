function makeUpdateAnswers (db) {
  return (answer) => {
    const params = [
      answer.placeId,
      answer.categoryId,
      answer.questionId,
      answer.answer,
      answer.id
    ]

    const sql = `
      UPDATE answers
      SET
        placeid = $1,
        categoryid = $2,
        questionid = $3,
        answer = $4       
      WHERE
        id = $5
      RETURNING
        id`

    return db
      .query(sql, params)
      .then(res => res.rows[0].id)
  }
}

module.exports = makeUpdateAnswers
