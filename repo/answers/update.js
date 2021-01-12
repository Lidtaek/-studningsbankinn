function makeUpdateAnswers (db) {
  return (answer) => {
    const params = [
      answer.placeId,
      answer.questionCategoryId,
      answer.questionId,
      answer.answer || null,
      answer.id
    ]

    const sql = `
      UPDATE answers
      SET
        placeid = $1,
        questioncategoryid = $2,
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
